package com.example.backend.controller;

import com.example.backend.payload.dto.*;
import com.example.backend.payload.response.CreationResponse;
import com.example.backend.payload.response.ModificationResponse;
import com.example.backend.payload.response.authResponse.ResponseStatus;
import com.example.backend.service.entityProcessing.DeleteEntityService;
import com.example.backend.service.entityProcessing.GetEntityFromDBService;
import com.example.backend.service.entityProcessing.entityCreation.CsvUserCreationService;
import com.example.backend.service.entityProcessing.entityCreation.UserCreationService;
import com.example.backend.service.entityProcessing.entityModification.UserModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user/admin")
public class AdminController {

    private final CsvUserCreationService csvUserCreationService;
    private final UserCreationService userCreationService;
    private final UserModificationService userModificationService;
    private final GetEntityFromDBService getEntityFromDBService;
    private final DeleteEntityService deleteEntityService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/workers")
    public ResponseEntity<?> getWorkers() {
        return ResponseEntity.ok(getEntityFromDBService.getWorkers());
    }

    @GetMapping("/get/children")
    public ResponseEntity<?> getChild() {
        return ResponseEntity.ok(getEntityFromDBService.getChild());
    }

    @GetMapping("/get/children/parent/{parentId}")
    public ResponseEntity<?> getChildWithParent(@PathVariable Long parentId) {
        return ResponseEntity.ok(getEntityFromDBService.getChildWithParent(parentId));
    }

    @GetMapping("/get/children/group/{groupId}")
    public ResponseEntity<?> getChildWithGroup(@PathVariable String groupId) {
        return ResponseEntity.ok(getEntityFromDBService.getChildWithGroup(groupId));
    }

    @GetMapping("/get/parents")
    public ResponseEntity<?> getParents() {
        return ResponseEntity.ok(getEntityFromDBService.getParents());
    }

    @GetMapping("/get/groups")
    public ResponseEntity<?> getGroups() {
        return ResponseEntity.ok(getEntityFromDBService.getGroups());
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/create/group")
    public ResponseEntity<?> createGroup(@RequestBody GroupDTO data) {
        CreationResponse response = userCreationService.createGroup(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/create/child")
    public ResponseEntity<?> createChild(@RequestBody ChildDTO data) {
        CreationResponse response = userCreationService.createChild(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/create/worker")
    public ResponseEntity<?> createWorker(@RequestBody UserDTO data) {
        CreationResponse response = userCreationService.createUser(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/create/parent")
    public ResponseEntity<?> createParent(@RequestBody ParentDTO data) {
        CreationResponse response = userCreationService.createParent(data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/create/child/csv")
    public ResponseEntity<?> createChildFromCsv(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(csvUserCreationService.readFile(file, ChildDTO.class, userCreationService::createChild));
    }

    @PostMapping("/create/users/csv")
    public ResponseEntity<?> createUsersFromCsv(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(csvUserCreationService.readFile(file, UserDTO.class, userCreationService::createUser));
    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PostMapping("/update/user/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserDTO data) {
        ModificationResponse response = userModificationService.updateUser(userId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/update/parent/{parentId}")
    public ResponseEntity<?> updateParent(@PathVariable Long parentId, @RequestBody ParentDTO data) {
        ModificationResponse response = userModificationService.updateParent(parentId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
    }

    @PostMapping("/update/child/{childId}")
    public ResponseEntity<?> updateChild(@PathVariable Long childId, @RequestBody ChildDTO data) {
        ModificationResponse response = userModificationService.updateChild(childId, data);
        if (response.getStatus() == ResponseStatus.SUCCESS) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(404).body(response);
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
