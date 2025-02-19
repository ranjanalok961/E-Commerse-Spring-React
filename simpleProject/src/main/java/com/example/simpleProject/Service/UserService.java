package com.example.simpleProject.Service;

import com.example.simpleProject.Model.Product;
import com.example.simpleProject.Model.User;
import com.example.simpleProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User addNewUsers(User user, MultipartFile imageFile) throws IOException {
        user.setImageData(imageFile.getBytes());
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void updateUser(Long id, User updatedUser) {
        userRepository.findById(id).ifPresent(user -> {
            user.setFirstName(updatedUser.getFirstName());
            user.setLastName(updatedUser.getLastName());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            user.setAddress(updatedUser.getAddress());
            user.setCity(updatedUser.getCity());
            user.setState(updatedUser.getState());
            user.setZipCode(updatedUser.getZipCode());
            user.setCountry(updatedUser.getCountry());
            userRepository.save(user);
        });
    }
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void resetPassword(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setPassword("newRandomPassword123");
            userRepository.save(user);
        });
    }
}
