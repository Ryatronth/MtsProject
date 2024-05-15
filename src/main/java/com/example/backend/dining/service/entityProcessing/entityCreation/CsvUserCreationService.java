package com.example.backend.dining.service.entityProcessing.entityCreation;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.payload.dto.GroupDTO;
import com.example.backend.dining.payload.response.CreationResponse;
import com.example.backend.security.entity.RoleName;
import com.example.backend.totalPayload.enums.ResponseStatus;
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
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class CsvUserCreationService {

//    private final CreationService creationService;
//
//    private final CSVFormat csvFormat = CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).build();
//
//    public <T> List<CreationResponse> readFile(MultipartFile file, Class<T> type,
//                                               Function<T, CreationResponse> creationFunction) {
//        if (file.isEmpty()) {
//            throw new CreationException("Файл пуст");
//        }
//
//        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
//            CSVParser csvParser = csvFormat.parse(reader);
//
//            return processCsv(csvParser, type, creationFunction);
//        } catch (IOException ex) {
//            throw new CreationException(ex.getMessage());
//        }
//    }
//
//    private <T> List<CreationResponse> processCsv(CSVParser csvParser, Class<T> type, Function<T, CreationResponse> creationFunction) {
//        List<CreationResponse> responses = new ArrayList<>();
//
//        long index = 1;
//        for (CSVRecord csvRecord : csvParser) {
//            try {
//                T newObject = createObjectFromRecord(csvRecord, type);
//
//                CreationResponse response = creationFunction.apply(newObject);
//
//                if (response.getStatus().equals(ResponseStatus.ERROR)) {
//                    response.setMessage("Ошибка при создании сущности в строке: " + index + ". " + response.getMessage());
//                }
//
//                responses.add(response);
//            } catch (Exception ex) {
//                responses.add(CreationResponse.builder()
//                        .status(ResponseStatus.ERROR)
//                        .message("Ошибка при создании сущности в строке: " + index + ". " + ex.getMessage())
//                        .build());
//            }
//            index++;
//        }
//
//        return responses;
//    }
//
//    private <T> T createObjectFromRecord(CSVRecord csvRecord, Class<T> type) throws Exception {
//        T obj = type.getConstructor().newInstance();
//        Field[] fields = type.getDeclaredFields();
//
//        for (int i = 0; i <= csvRecord.size(); i++) {
//            String fieldName = fields[i].getName();
//
//            if (!csvRecord.isSet(fieldName)) {
//                continue;
//            }
//
//            switch (fieldName) {
//                case "role" -> setRoleField(obj, csvRecord.get(fieldName));
//                case "groupId" -> setGroupField(obj, csvRecord.get(fieldName));
//                case "children" -> setChildren(obj, csvRecord.get(fieldName));
//                default -> setStringField(obj, fieldName, csvRecord.get(fieldName));
//            }
//        }
//
//        return obj;
//    }
//
//    private <T> Field getFiled(T obj, String fieldName) throws Exception {
//        Field field = obj.getClass().getDeclaredField(fieldName);
//        field.setAccessible(true);
//        return field;
//    }
//
//    private <T> void setChildren(T obj, String value) throws Exception {
//        Field field = getFiled(obj, "children");
//        Set<Long> id = new HashSet<>(Arrays.stream(value.split(",")).map(Long::parseLong).toList());
//        field.set(obj, id);
//    }
//
//    private <T> void setStringField(T obj, String fieldName, String value) throws Exception {
//        Field field = getFiled(obj, fieldName);
//        field.set(obj, value);
//    }
//
//    private <T> void setRoleField(T obj, String value) throws Exception {
//        Field field = getFiled(obj, "role");
//        field.set(obj, RoleName.valueOf(value));
//    }
//
//    private <T> void setGroupField(T obj, String value) throws Exception {
//        createGroup(value);
//        Field field = getFiled(obj, "groupId");
//        field.set(obj, value);
//    }
//
//    private void createGroup(String group) {
//        try {
//            creationService.createGroup(GroupDTO.builder().groupId(group).build());
//        } catch (Exception ignored) {
//        }
//    }
}

