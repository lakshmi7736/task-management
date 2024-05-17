package com.taskManagement.tasksubmissionservice.service;

import com.taskManagement.tasksubmissionservice.model.Submission;

import java.util.List;

public interface SubmissionService {

    Submission submitTask(Long taskId,String gitHubLink,Long userId,String jwt)throws Exception;

    Submission getTaskSubmissionById(Long submissionId)throws Exception;

    public List<Submission> getAllTaskSubmissions();

    List<Submission> getTaskSubmissionByTaskId(Long taskId);

    Submission acceptDeclineSubmission(Long id,String status)throws Exception;
}
