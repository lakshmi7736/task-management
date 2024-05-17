package com.taskManagement.userService.service;

import com.taskManagement.userService.Handler.LoginRequest;
import com.taskManagement.userService.model.User;
import com.taskManagement.userService.Handler.AuthResponse;

import java.util.List;

public interface UserService {
    public void createUser(User user) throws Exception;
    public AuthResponse setToken(User user);
    public AuthResponse signin(LoginRequest loginRequest);
    public User getUserProfile(String jwt);
    public List<User> getAllUsers();


    User getUserById(Long id)throws Exception;

    User updateUser(Long id,User updatedUser)throws Exception;

    public void deleteUser(Long id,String requesterRole) throws Exception ;
}
