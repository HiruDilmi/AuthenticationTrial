package com.trial.login_backend.controller;

import com.trial.login_backend.DTO.PasswordResetRequest;
import com.trial.login_backend.model.Employee;
import com.trial.login_backend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordResetController {
    @Autowired
    private PasswordResetService passwordResetService;


    @PostMapping("/forgot-password")
    public boolean checkUser(@RequestBody Employee employee) {
        return passwordResetService.isUserExists(employee.getUsername(), employee.getEmail());
    }

    @PutMapping("/reset-password")
    public boolean updatePassword(@RequestBody PasswordResetRequest request) {
        return passwordResetService.updatePassword(request.getEmail(), request.getNewPassword(), request.getConfirmPassword());
    }
}