package com.example.backend.dining.service.entityProcessing;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.entity.user.Child;
import com.example.backend.dining.entity.user.Parent;
import com.example.backend.dining.payload.dto.ChildDTO;
import com.example.backend.dining.payload.dto.GroupDTO;
import com.example.backend.dining.payload.dto.ParentDTO;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class CsvService {
    private final ParentService parentService;
    private final ChildService childService;
    private final GroupService groupService;

    private final CSVFormat csvFormat = CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).build();

    public List<CreationResponse<Parent>> createParents(MultipartFile file) {
        return processFile(file, this::processParentCsv);
    }

    public List<CreationResponse<Child>> createChildren(MultipartFile file) {
        return processFile(file, this::processChildCsv);
    }

    private <T> List<CreationResponse<T>> processFile(MultipartFile file, Function<CSVParser, List<CreationResponse<T>>> processFunction) {
        if (file.isEmpty()) {
            throw new CreationException("Файл пуст");
        }

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            return processFunction.apply(csvFormat.parse(reader));
        } catch (IOException ex) {
            throw new CreationException(ex.getMessage());
        }
    }

    private List<CreationResponse<Parent>> processParentCsv(CSVParser csvParser) {
        List<CreationResponse<Parent>> responses = new ArrayList<>();

        long index = 1;
        for (CSVRecord csvRecord : csvParser) {
            try {
                List<Long> childIds = csvRecord.get("children").isEmpty() ? new ArrayList<>() :
                        Arrays.stream(csvRecord.get("children").split(",")).map(o -> Long.parseLong(o.trim())).toList();

                ParentDTO dto = ParentDTO.builder()
                        .username(csvRecord.get("username"))
                        .password(csvRecord.get("password"))
                        .name(csvRecord.get("name"))
                        .surname(csvRecord.get("surname"))
                        .patronymic(csvRecord.get("patronymic"))
                        .phone(csvRecord.get("phone"))
                        .role(RoleName.PARENT)
                        .children(childIds)
                        .build();

                responses.add(parentService.create(dto));
            } catch (Exception ex) {
                responses.add(CreationResponse
                        .<Parent>builder()
                        .status(ResponseStatus.ERROR)
                        .message("Ошибка при создании сущности в строке: " + index + ". " + ex.getMessage())
                        .build());
            }
            index++;
        }

        return responses;
    }

    private List<CreationResponse<Child>> processChildCsv(CSVParser csvParser) {
        List<CreationResponse<Child>> responses = new ArrayList<>();

        long index = 1;
        for (CSVRecord csvRecord : csvParser) {
            try {
                try {
                    groupService.create(GroupDTO.builder().groupId(csvRecord.get("group")).build());
                } catch (Exception ignored) {}

                ChildDTO dto = ChildDTO.builder()
                        .name(csvRecord.get("name"))
                        .surname(csvRecord.get("surname"))
                        .patronymic(csvRecord.get("patronymic"))
                        .groupId(csvRecord.get("group"))
                        .build();

                responses.add(childService.create(dto));
            } catch (Exception ex) {
                responses.add(CreationResponse
                        .<Child>builder()
                        .status(ResponseStatus.ERROR)
                        .message("Ошибка при создании сущности в строке: " + index + ". " + ex.getMessage())
                        .build());
            }
            index++;
        }

        return responses;
    }
}
