package com.example.backend.controller;

import com.example.backend.payload.dto.userCreation.ChildDTO;
import com.example.backend.payload.dto.userCreation.CreationParentDTO;
import com.example.backend.payload.dto.userCreation.CreationWorkerDTO;
import com.example.backend.payload.dto.userCreation.GroupDTO;
import com.example.backend.service.UserCreationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/user/admin/create")
@RequiredArgsConstructor
public class TestController {
    private final UserCreationService creationService;

    @PostMapping("/group")
    public ResponseEntity<?> createGroup(@RequestBody GroupDTO groupDTO) {
        return ResponseEntity.ok(creationService.createGroup(groupDTO));
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<?> getGroup(@PathVariable String groupId) {
        return ResponseEntity.ok(creationService.getInfo("group", 1, groupId).getChildGroup());
    }

    @PostMapping("/child")
    public ResponseEntity<?> createChild(@RequestBody ChildDTO childDTO) {
        return ResponseEntity.ok(creationService.createChild(childDTO));
    }

    @GetMapping("/child/{childId}")
    public ResponseEntity<?> getChild(@PathVariable long childId) {
        return ResponseEntity.ok(creationService.getInfo("child", childId, null).getChild());
    }

    @PostMapping("/worker")
    public ResponseEntity<?> createWorker(@RequestBody CreationWorkerDTO workerDTO) {
        return ResponseEntity.ok(creationService.createWorker(workerDTO));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<?> getWorker(@PathVariable long workerId) {
        return ResponseEntity.ok(creationService.getInfo("worker", workerId, null).getWorker());
    }

    @PostMapping("/parent")
    public ResponseEntity<?> createParent(@RequestBody CreationParentDTO parentDTO) {
        return ResponseEntity.ok(creationService.createParent(parentDTO));
    }

    @GetMapping("/parent/{parentId}")
    public ResponseEntity<?> getParent(@PathVariable long parentId) {
        return ResponseEntity.ok(creationService.getInfo("parent", parentId, null).getParent());
    }
}
