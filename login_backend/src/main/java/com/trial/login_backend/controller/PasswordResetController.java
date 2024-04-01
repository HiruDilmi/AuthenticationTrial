package com.trial.login_backend.controller;

import com.trial.login_backend.DTO.PasswordResetRequest;
import com.trial.login_backend.model.Employee;
import com.trial.login_backend.service.PasswordResetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordResetController {
    @Autowired
    private PasswordResetService passwordResetService;


    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest passwordResetRequest) {
        try {
            boolean success = passwordResetService.resetPassword(passwordResetRequest);
            if (success) {
                return ResponseEntity.ok("Password reset successful. Please login with your new password.");
            } else {
                return ResponseEntity.badRequest().body("Passwords do not match.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}