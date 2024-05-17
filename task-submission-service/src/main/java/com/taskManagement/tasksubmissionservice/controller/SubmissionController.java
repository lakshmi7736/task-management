package com.taskManagement.tasksubmissionservice.controller;

import com.taskManagement.tasksubmissionservice.DTO.UserDto;
import com.taskManagement.tasksubmissionservice.model.Submission;
import com.taskManagement.tasksubmissionservice.service.SubmissionService;
import com.taskManagement.tasksubmissionservice.service.TaskService;
import com.taskManagement.tasksubmissionservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    @Autowired
    private SubmissionService submissionService;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @PostMapping()
    public ResponseEntity<Submission>submitTask(
            @RequestParam Long task_id,
            @RequestParam String gitHub_link,
            @RequestHeader("Authorization")String jwt
    )throws Exception{

        UserDto user=userService.getUserProfile(jwt);
        Submission submission=submissionService.submitTask(task_id,gitHub_link, user.getId(), jwt);
        return new ResponseEntity<>(submission, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Submission>>getAllSubmissions(
            @RequestHeader("Authorization")String jwt
    )throws Exception{

        UserDto user=userService.getUserProfile(jwt);
        List<Submission> submission=submissionService.getAllTaskSubmissions();
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission>getSubmissionById(
            @PathVariable Long id,
            @RequestHeader("Authorization")String jwt
    )throws Exception{

        UserDto user=userService.getUserProfile(jwt);
        Submission submission=submissionService.getTaskSubmissionById(id);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<Submission>>getAllSubmissions(
            @PathVariable Long taskId,
            @RequestHeader("Authorization")String jwt
    )throws Exception{

        UserDto user=userService.getUserProfile(jwt);
        List<Submission> submissions=submissionService.getTaskSubmissionByTaskId(taskId);
        return new ResponseEntity<>(submissions, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Submission>acceptOrDeclineSubmission(
            @PathVariable Long id,
            @RequestParam("status") String status,
            @RequestHeader("Authorization")String jwt
    )throws Exception{

        Submission submission=submissionService.acceptDeclineSubmission(id,status);
        return new ResponseEntity<>(submission, HttpStatus.OK);
    }

}
