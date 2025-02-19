package com.example.simpleProject.Controller;

import com.example.simpleProject.Model.Product;
import com.example.simpleProject.Model.User;
import com.example.simpleProject.Service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // 1. Create a new user
    @PostMapping
    public ResponseEntity<?> addNewUsers(@RequestParam("user") String dataJson,
                                        @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            // Deserialize product JSON
            User user = new ObjectMapper().readValue(dataJson, User.class);

            // Call service to add product
            User user1 = userService.addNewUsers(user, imageFile);
            return new ResponseEntity<>(user1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 2. Get user by ID
    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // 3. Get all users
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }



    // 4. Update user details
    @PutMapping("/{id}")
    public void updateUser(@PathVariable Long id, @RequestBody User user) {
        userService.updateUser(id, user);
    }

    // 5. Delete user by ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // 6. Find user by email
    @GetMapping("/email")
    public Optional<User> getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

    // 9. Reset Password (Mock Example)
    @PostMapping("/reset-password")
    public void resetPassword(@RequestParam String email) {
        userService.resetPassword(email);
    }
}
