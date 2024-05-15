package com.example.backend.dining.service;

import com.example.backend.dining.controller.exception.customException.CreationException;
import com.example.backend.dining.entity.user.Child;
import com.example.backend.dining.entity.user.Parent;
import com.example.backend.dining.payload.dto.ChildDTO;
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

@Service
@RequiredArgsConstructor
public class CsvService {
    private final ParentService parentService;
    private final ChildService childService;

    private final CSVFormat csvFormat = CSVFormat.DEFAULT.builder().setHeader().setSkipHeaderRecord(true).build();

    private CSVParser readFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new CreationException("Файл пуст");
        }

        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            return csvFormat.parse(reader);
        } catch (IOException ex) {
            throw new CreationException(ex.getMessage());
        }
    }

    public List<CreationResponse<Parent>> processParentCsv(MultipartFile file) {
        CSVParser csvParser = readFile(file);

        List<CreationResponse<Parent>> responses = new ArrayList<>();

        long index = 1;
        for (CSVRecord csvRecord : csvParser) {
            try {
                ParentDTO dto = ParentDTO.builder()
                        .username(csvRecord.get("username"))
                        .password(csvRecord.get("password"))
                        .name(csvRecord.get("name"))
                        .surname(csvRecord.get("surname"))
                        .patronymic(csvRecord.get("patronymic"))
                        .phone(csvRecord.get("phone"))
                        .role(RoleName.PARENT)
                        .children(Arrays.stream(csvRecord.get("children").split(",")).map(Long::parseLong).toList())
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

    public List<CreationResponse<Child>> processChildCsv(MultipartFile file) {
        CSVParser csvParser = readFile(file);

        List<CreationResponse<Child>> responses = new ArrayList<>();

        long index = 1;
        for (CSVRecord csvRecord : csvParser) {
            try {
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
