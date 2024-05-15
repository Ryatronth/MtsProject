package com.example.backend.dining.controller;

import com.example.backend.dining.payload.dto.ChildDTO;
import com.example.backend.dining.payload.dto.GroupDTO;
import com.example.backend.dining.payload.dto.ParentDTO;
import com.example.backend.dining.service.ChildService;
import com.example.backend.dining.service.GroupService;
import com.example.backend.dining.service.ParentService;
import com.example.backend.dining.validator.groups.ValidForCreate;
import com.example.backend.dining.validator.groups.ValidForUpdate;
import com.example.backend.security.entity.RoleName;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user/admin")
public class AdminController {
    private final GroupService groupService;
    private final ChildService childService;
    private final ParentService parentService;

    // Получение -------------------------------------------------------------------------------------------------------
    @GetMapping("/get/parents")
    public ResponseEntity<?> getParents(@RequestParam(name = "id", required = false) Long id,
                                        @RequestParam(name = "name", required = false) String name,
                                        @RequestParam(name = "surname", required = false) String surname,
                                        @RequestParam(name = "patronymic", required = false) String patronymic,
                                        @RequestParam(name = "phone", required = false) String phone) {
        return ResponseEntity.ok(parentService
                .filtrate("id", id, "name", name, "surname", surname, "patronymic", patronymic, "phone", phone,
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
        return ResponseEntity.ok(childService
                .filtrate("id", id, "name", name, "surname", surname, "patronymic", patronymic,
                        "childGroup", group, "parent", parent, "unlinked", unlinked));
    }

    @GetMapping("/get/groups")
    public ResponseEntity<?> getGroups(@RequestParam(name = "id", required = false) String group) {
        return ResponseEntity.ok(groupService.filtrate("id", group));
    }

    // Создание --------------------------------------------------------------------------------------------------------
    @PostMapping("/create/group")
    public ResponseEntity<?> createGroup(@RequestBody @Validated GroupDTO data) {
        return ResponseEntity.ok(groupService.create(data));
    }

    @PostMapping("/create/child")
    public ResponseEntity<?> createChild(@RequestBody @Validated(ValidForCreate.class) ChildDTO data) {
        return ResponseEntity.ok(childService.create(data));
    }

    @PostMapping("/create/parent")
    public ResponseEntity<?> createParent(@RequestBody @Validated(ValidForCreate.class) ParentDTO data) {
        return ResponseEntity.ok(parentService.create(data));
    }

//    @PostMapping("/create/child/csv")
//    public ResponseEntity<?> createChildFromCsv(@RequestParam("file") MultipartFile file) {
//        return ResponseEntity.ok(csvUserCreationService.readFile(file, ChildDTO.class, creationService::createChild));
//    }
//
//    @PostMapping("/create/parents/csv")
//    public ResponseEntity<?> createUsersFromCsv(@RequestParam("file") MultipartFile file) {
//        return ResponseEntity.ok(csvUserCreationService.readFile(file, ParentDTO.class, creationService::createParent));
//    }

    // Изменение -------------------------------------------------------------------------------------------------------
    @PutMapping("/update/parent/{parentId}")
    public ResponseEntity<?> updateParent(@PathVariable Long parentId, @RequestBody @Validated(ValidForUpdate.class) ParentDTO data) {
        return ResponseEntity.ok(parentService.modify(parentId, data));
    }

    @PutMapping("/update/child/{childId}")
    public ResponseEntity<?> updateChild(@PathVariable Long childId, @RequestBody @Validated(ValidForUpdate.class) ChildDTO data) {
        return ResponseEntity.ok(childService.modify(childId, data));
    }

    // Удаление --------------------------------------------------------------------------------------------------------
    @DeleteMapping("/delete/parent/{parentId}")
    public ResponseEntity<?> deleteParent(@PathVariable Long parentId) {
        return ResponseEntity.ok(parentService.delete(parentId));
    }

    @DeleteMapping("/delete/child/{childId}")
    public ResponseEntity<?> deleteChild(@PathVariable Long childId) {
        return ResponseEntity.ok(childService.delete(childId));
    }

    @DeleteMapping("/delete/group/{groupId}")
    public ResponseEntity<?> deleteGroup(@PathVariable String groupId) {
        return ResponseEntity.ok(groupService.delete(groupId));
    }
}
