package com.example.backend.controller;

import com.example.backend.payload.dto.ChildDTO;
import com.example.backend.payload.dto.GroupDTO;
import com.example.backend.payload.dto.ParentDTO;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.entityProcessing.DeleteEntityService;
import com.example.backend.service.entityProcessing.entityCreation.CsvUserCreationService;
import com.example.backend.service.entityProcessing.entityCreation.EntityCreationService;
import com.example.backend.service.entityProcessing.entityGetting.GetEntityService;
import com.example.backend.service.entityProcessing.entityModification.EntityModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user/admin")
public class AdminController {

    private final CsvUserCreationService csvUserCreationService;
    private final EntityCreationService entityCreationService;
    private final EntityModificationService entityModificationService;
    private final GetEntityService getEntityService;
    private final DeleteEntityService deleteEntityService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/children")
    public ResponseEntity<?> getChild(@RequestParam(value = "name", required = false) String name,
                                      @RequestParam(value = "surname", required = false) String surname,
                                      @RequestParam(value = "patronymic", required = false) String patronymic,
                                      @RequestParam(value = "groupId", required = false) String group,
                                      @RequestParam(value = "parentId", required = false) String parentId) {
        return ResponseEntity.ok(getEntityService
                .getChild("name", name, "surname", surname, "patronymic", patronymic, "childGroup", group,
                        "parent", parentId));
    }

    @GetMapping("/get/parents")
    public ResponseEntity<?> getParents(@RequestParam(value = "name", required = false) String name,
                                        @RequestParam(value = "surname", required = false) String surname,
                                        @RequestParam(value = "patronymic", required = false) String patronymic,
                                        @RequestParam(value = "phone", required = false) String phone) {
        return ResponseEntity.ok(getEntityService
                .getParents("role", "PARENT", "name", name, "surname", surname, "patronymic", patronymic,
                        "phone", phone));
    }

    @GetMapping("/get/groups")
    public ResponseEntity<?> getGroups(@RequestParam(value = "groupId", required = false) String group) {
        return ResponseEntity.ok(getEntityService.getGroups("Id", group));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/create/group")
    public ResponseEntity<?> createGroup(@RequestBody GroupDTO data) {
        CreationResponse response = entityCreationService.createGroup(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/create/child")
    public ResponseEntity<?> createChild(@RequestBody ChildDTO data) {
        CreationResponse response = entityCreationService.createChild(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/create/parent")
    public ResponseEntity<?> createParent(@RequestBody ParentDTO data) {
        CreationResponse response = entityCreationService.createParent(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/create/child/csv")
    public ResponseEntity<?> createChildFromCsv(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(csvUserCreationService.readFile(file, ChildDTO.class, entityCreationService::createChild));
    }

    @PostMapping("/create/parents/csv")
    public ResponseEntity<?> createUsersFromCsv(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(csvUserCreationService.readFile(file, ParentDTO.class, entityCreationService::createParent));
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PostMapping("/update/parent/{parentId}")
    public ResponseEntity<?> updateParent(@PathVariable Long parentId, @RequestBody ParentDTO data) {
        ModificationResponse response = entityModificationService.updateParent(parentId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    @PostMapping("/update/child/{childId}")
    public ResponseEntity<?> updateChild(@PathVariable Long childId, @RequestBody ChildDTO data) {
        ModificationResponse response = entityModificationService.updateChild(childId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(400).body(response);
    }

    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/user/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        return ResponseEntity.ok(deleteEntityService.deleteUser(userId));
    }

    @DeleteMapping("/delete/child/{childId}")
    public ResponseEntity<?> deleteChild(@PathVariable Long childId) {
        return ResponseEntity.ok(deleteEntityService.deleteChild(childId));
    }

    @DeleteMapping("/delete/group/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable String groupId) {
        return ResponseEntity.ok(deleteEntityService.deleteGroup(groupId));
    }
}
