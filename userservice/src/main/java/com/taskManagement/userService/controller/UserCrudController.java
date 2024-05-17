package com.taskManagement.userService.controller;

import com.taskManagement.userService.model.User;
import com.taskManagement.userService.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserCrudController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById (@PathVariable Long id, @RequestHeader("Authorization")String jwt)throws Exception{

        User task=userService.getUserById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser (
            @PathVariable Long id, @RequestBody User req, @RequestHeader("Authorization")String jwt)throws Exception{

        User user=userService.updateUser(id,req);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser (
            @PathVariable Long id,@RequestHeader("Authorization")String jwt)throws Exception{
        User user=userService.getUserProfile(jwt);
        userService.deleteUser(id, user.getRole());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
