package com.taskManagement.taskservice.service;

import com.taskManagement.taskservice.model.Task;
import com.taskManagement.taskservice.model.TaskStatus;

import java.util.List;

public interface TaskService {
    Task createTask(Task task,String requesterRole)throws Exception;

    Task getTaskById(Long id)throws Exception;

    List<Task> getAllTask(TaskStatus status);

    Task updateTask(Long id,Task updatedTask,Long user)throws Exception;

    public void deleteTask(Long id) throws Exception ;

    Task assignToUser(Long userId, Long taskId,String requesterRole)throws Exception;

    List<Task>assignedUsersTask(Long userId,TaskStatus status);

    Task completeTask(Long taskId)throws  Exception;

}
