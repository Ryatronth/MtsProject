package com.example.backend.dining.controller;

import com.example.backend.dining.payload.dto.ChildDTO;
import com.example.backend.dining.payload.dto.GroupDTO;
import com.example.backend.dining.payload.dto.ParentDTO;
import com.example.backend.dining.service.entityProcessing.DeleteEntityService;
import com.example.backend.dining.service.entityProcessing.entityCreation.CsvUserCreationService;
import com.example.backend.dining.service.entityProcessing.entityCreation.EntityCreationService;
import com.example.backend.dining.service.entityProcessing.entityFilter.EntityFilterService;
import com.example.backend.dining.service.entityProcessing.entityModification.EntityModificationService;
import com.example.backend.dining.validator.groups.ValidForCreate;
import com.example.backend.dining.validator.groups.ValidForUpdate;
import com.example.backend.security.entity.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user/admin")
public class AdminController {

    private final CsvUserCreationService csvUserCreationService;
    private final EntityCreationService entityCreationService;
    private final EntityModificationService entityModificationService;
    private final EntityFilterService entityFilterService;
    private final DeleteEntityService deleteEntityService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/parents")
    public ResponseEntity<?> getParents(@RequestParam(name = "id", required = false) Long id,
                                        @RequestParam(name = "name", required = false) String name,
                                        @RequestParam(name = "surname", required = false) String surname,
                                        @RequestParam(name = "patronymic", required = false) String patronymic,
                                        @RequestParam(name = "phone", required = false) String phone) {
        return ResponseEntity.ok(entityFilterService
                .getParents("id", id, "name", name, "surname", surname, "patronymic", patronymic, "phone", phone,
                        "role", RoleName.PARENT));
    }

    @GetMapping("/get/children")
    public ResponseEntity<?> getChildren(@RequestParam(name = "id", required = false) Long id,
                                         @RequestParam(name = "name", required = false) String name,
                                         @RequestParam(name = "surname", required = false) String surname,
                                         @RequestParam(name = "patronymic", required = false) String patronymic,
                                         @RequestParam(name = "groupId", required = false) String group,
                                         @RequestParam(name = "parentId", required = false) Long parent,
                                         @RequestParam(name = "unlinked", required = false) String unlinked) {
        return ResponseEntity.ok(entityFilterService
                .getChildren("id", id, "name", name, "surname", surname, "patronymic", patronymic,
                        "childGroup", group, "parent", parent, "unlinked", unlinked));
    }

    @GetMapping("/get/groups")
    public ResponseEntity<?> getGroups(@RequestParam(name = "id", required = false) String group) {
        return ResponseEntity.ok(entityFilterService.getGroups("id", group));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/create/group")
    public ResponseEntity<?> createGroup(@RequestBody @Validated GroupDTO data) {
        return ResponseEntity.ok(entityCreationService.createGroup(data));
    }

    @PostMapping("/create/child")
    public ResponseEntity<?> createChild(@RequestBody @Validated(ValidForCreate.class) ChildDTO data) {
        return ResponseEntity.ok(entityCreationService.createChild(data));
    }

    @PostMapping("/create/parent")
    public ResponseEntity<?> createParent(@RequestBody @Validated(ValidForCreate.class) ParentDTO data) {
        return ResponseEntity.ok(entityCreationService.createParent(data));
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
    public ResponseEntity<?> updateParent(@PathVariable Long parentId, @RequestBody @Validated(ValidForUpdate.class) ParentDTO data) {
        return ResponseEntity.ok(entityModificationService.updateParent(parentId, data));
    }

    @PostMapping("/update/child/{childId}")
    public ResponseEntity<?> updateChild(@PathVariable Long childId, @RequestBody @Validated(ValidForUpdate.class) ChildDTO data) {
        return ResponseEntity.ok(entityModificationService.updateChild(childId, data));
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
