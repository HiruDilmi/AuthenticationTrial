package com.trial.login_backend.controller;

//import com.trial.login_backend.DTO.PasswordReset;
import com.trial.login_backend.DTO.PasswordResetRequest;
import com.trial.login_backend.DTO.VerifyOTP;
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

//    @Autowired
//    private PasswordReset passwordReset;
//
//    @Autowired
//    private VerifyOTP verifyOTP;

    @PostMapping("/reset-password-request")
    public ResponseEntity<String> requestPasswordReset(@RequestBody PasswordResetRequest passwordResetRequest) {
        try {
            // Call a service method to initiate the password reset process using the username
            boolean success = passwordResetService.initiatePasswordReset(passwordResetRequest.getUsername());
            if (success) {
                return ResponseEntity.ok("An OTP has been sent to your email address. Please check your inbox.");
            } else {
                return ResponseEntity.badRequest().body("Username not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    // Endpoint for verifying OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOTP(@RequestBody VerifyOTP verifyOTP) {
        try {
            boolean success = passwordResetService.verifyOTP(verifyOTP.getUsername(), verifyOTP.getOtp());
            if (success) {
                return ResponseEntity.ok("OTP verified successfully.");
            } else {
                return ResponseEntity.badRequest().body("Invalid OTP.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }


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