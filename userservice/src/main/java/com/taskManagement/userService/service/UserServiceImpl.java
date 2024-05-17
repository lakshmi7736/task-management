package com.taskManagement.userService.service;

import com.taskManagement.userService.Handler.LoginRequest;
import com.taskManagement.userService.JWT.JwtProvider;
import com.taskManagement.userService.model.User;
import com.taskManagement.userService.Repository.UserRepository;
import com.taskManagement.userService.Handler.AuthResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private CustomUserServiceImplementation customUserDetails;

    @Autowired
    private UserRepository userRepository;



    @Override
    public void createUser(User user) throws Exception {
        String email = user.getEmail();
        User existingUser = userRepository.findByEmail(email);

        if(existingUser != null) {
            throw new Exception("Email already exists");
        }
        // Validate email format
        if (!isValidEmail(email)) {
            throw new Exception("Invalid email format");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("ROLE_USER");
        userRepository.save(user);
    }

    private boolean isValidEmail(String email) {
        // Regular expression for email validation
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    @Override
    public AuthResponse setToken(User user){
        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token= JwtProvider.generateToken(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("User created successfully");
        authResponse.setStatus(true);
        return authResponse;
    }


    @Override
    public AuthResponse signin(LoginRequest loginRequest) {
        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        if (userDetails == null || !passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid username or password");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        String token = JwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Login success");
        authResponse.setJwt(token);
        authResponse.setStatus(true);
        return authResponse;
    }

    @Override
    public User getUserProfile(String jwt) {
        String email=JwtProvider.getEmailFromJwtToken(jwt);
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findByRole("USER");
    }

    @Override
    public User getUserById(Long id) throws Exception {
        return userRepository.findById(id).orElseThrow(()->new Exception("User not found with id: "+id));
    }

    @Override
    public User updateUser(Long id, User updatedUser) throws Exception {
        User existingUser=getUserById(id);

        // Validate email format
        if (!isValidEmail(existingUser.getEmail())) {
            throw new Exception("Invalid email format");
        }

        if(updatedUser.getFullName()!=null){
            existingUser.setFullName(updatedUser.getFullName());
        }

        if(updatedUser.getEmail()!=null){
            existingUser.setEmail(updatedUser.getEmail());
        }
        if(updatedUser.getPassword()!=null){
            existingUser.setPassword(passwordEncoder.encode(existingUser.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id,String requesterRole) throws Exception {
        if(!requesterRole.equals(("ROLE_ADMIN"))){
            throw new Exception("Only admin can delete user.");
        }
    getUserById(id);
    userRepository.deleteById(id);
    }


}
