package com.example.backend.service.entityProcessing.entityCreation;

import com.example.backend.entity.auth.RoleName;
import com.example.backend.payload.dto.GroupDTO;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Field;
import java.util.*;
import java.util.function.BiConsumer;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class CsvUserCreationService {

    private final EntityCreationService entityCreationService;

    private final CSVFormat csvFormat = CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).build();

    public <T> List<CreationResponse> readFile(MultipartFile file, Class<T> type,
                                               Function<T, CreationResponse> creationFunction) {
        if (file.isEmpty()) {
            return Collections.singletonList(CreationResponse.builder().status(ResponseStatus.ERROR).message("Файл пуст").build());
        }

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            CSVParser csvParser = csvFormat.parse(reader);

            return processCsv(csvParser, type, creationFunction);
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    private <T> List<CreationResponse> processCsv(CSVParser csvParser, Class<T> type, Function<T, CreationResponse> creationFunction) {
        List<CreationResponse> responses = new ArrayList<>();

        long index = 1;
        for (CSVRecord csvRecord : csvParser) {
            try {
                T newObject = createObjectFromRecord(csvRecord, type);

                CreationResponse response = creationFunction.apply(newObject);

                if (response.getStatus().equals(ResponseStatus.ERROR)) {
                    response.setMessage("Ошибка при создании сущности в строке: " + index + ". " + response.getMessage());
                }

                responses.add(response);
                index++;
            } catch (Exception ex) {
                responses.add(CreationResponse.builder()
                        .status(ResponseStatus.ERROR)
                        .message("Ошибка при создании сущности в строке: " + index + ". " + ex.getMessage())
                        .build());
            }
        }

        return responses;
    }

    private <T> T createObjectFromRecord(CSVRecord csvRecord, Class<T> type) {
        try {
            T obj = type.getConstructor().newInstance();
            Field[] fields = type.getDeclaredFields();

            Map<String, BiConsumer<T, String>> mappingFields = new HashMap<>();
            mappingFields.put("imageUrl", (o, d) -> {});
            mappingFields.put("role", this::setRoleField);
            mappingFields.put("groupId", this::setGroupField);
            mappingFields.put("children", this::setChildren);

            for (int i = 0; i <= csvRecord.size(); i++) {
                String fieldName = fields[i].getName();

                if (!csvRecord.isSet(fieldName)) {
                    continue;
                }

                mappingFields.getOrDefault(fieldName, (o, s) -> setStringField(o, fieldName, s))
                        .accept(obj, csvRecord.get(fieldName));
            }

            return obj;
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T> void setChildren(T obj, String value) {
        try {
            Field field = obj.getClass().getDeclaredField("children");
            field.setAccessible(true);

            Set<Long> id = new HashSet<>(Arrays.stream(value.split(",")).map(Long::parseLong).toList());
            field.set(obj, id);
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T> void setStringField(T obj, String fieldName, String value) {
        try {
            Field field = obj.getClass().getDeclaredField(fieldName);
            field.setAccessible(true);

            field.set(obj, value);
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T> void setRoleField(T obj, String value) {
        try {
            Field field = obj.getClass().getDeclaredField("role");
            field.setAccessible(true);

            field.set(obj, RoleName.valueOf(value));
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private <T> void setGroupField(T obj, String value) {
        try {
            createGroup(value);

            Field field = obj.getClass().getDeclaredField("groupId");
            field.setAccessible(true);

            field.set(obj, value);
        } catch (Exception ex) {
            throw new RuntimeException(ex.getMessage());
        }
    }

    private void createGroup(String group) {
        try {
            entityCreationService.createGroup(GroupDTO.builder().groupId(group).build());
        } catch (Exception ignored) {
        }
    }
}

