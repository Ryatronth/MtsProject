package com.example.backend.controller;

import com.example.backend.entity.user.Child;
import com.example.backend.payload.dto.ChildDTO;
import com.example.backend.payload.dto.CreationParentDTO;
import com.example.backend.payload.dto.GroupDTO;
import com.example.backend.payload.dto.UserDTO;
import com.example.backend.service.entityProcessing.GetEntityFromDBService;
import com.example.backend.service.entityProcessing.entityCreation.CsvUserCreationService;
import com.example.backend.service.entityProcessing.entityCreation.UserCreationService;
import com.example.backend.service.entityProcessing.entityModification.UserModificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.ArrayList;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user/admin")
public class AdminController {

    private final CsvUserCreationService csvUserCreationService;
    private final UserCreationService userCreationService;
    private final UserModificationService userModificationService;
    private final GetEntityFromDBService getEntityFromDBService;

    @GetMapping("/")
    public ResponseEntity<?> getAdminInfo(Principal connectedUser) {
        return ResponseEntity.ok(connectedUser.getName());
    }

    @GetMapping("/get/workers")
    public ResponseEntity<?> getWorkers() {
        return ResponseEntity.ok(getEntityFromDBService.getWorkers());
    }

    @GetMapping("/get/children")
    public ResponseEntity<?> getChild() {
        return ResponseEntity.ok(getEntityFromDBService.getChild());
    }

    @GetMapping("/get/parents")
    public ResponseEntity<?> getParents() {
        return ResponseEntity.ok(getEntityFromDBService.getParents());
    }

    @GetMapping("/get/groups")
    public ResponseEntity<?> getGroups() {
        return ResponseEntity.ok(getEntityFromDBService.getGroups());
    }

    @PostMapping("/create/group")
    public ResponseEntity<?> createGroup(@RequestBody GroupDTO data) {
        return ResponseEntity.ok(userCreationService.createGroup(data));
    }

    @PostMapping("/create/child")
    public ResponseEntity<?> createChild(@RequestBody ChildDTO data) {
        return ResponseEntity.ok(userCreationService.createChild(data));
    }

    @PostMapping("/create/worker")
    public ResponseEntity<?> createWorker(@RequestBody UserDTO data) {
        return ResponseEntity.ok(userCreationService.createUser(data));
    }

    @PostMapping("/create/parent")
    public ResponseEntity<?> createParent(@RequestBody CreationParentDTO data) {
        return ResponseEntity.ok(userCreationService.createParent(data));
    }

    @PostMapping("/create/child/csv")
    public ResponseEntity<?> createChildFromCsv(@RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok(csvUserCreationService.readFile(file, new int[]{1}));
    }

//    @PostMapping("/update/user/{userId}")
//    public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserDTO data) {
//        return ResponseEntity.ok(userModificationService.updateUser(userId, data));
//    }
}
