package com.trial.login_backend.service;

import com.trial.login_backend.DTO.PasswordResetRequest;
import com.trial.login_backend.model.Employee;
import com.trial.login_backend.repository.PasswordResetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PasswordResetService {
    @Autowired
    private PasswordResetRepository passwordResetRepository;

    public boolean isUserExists(String username, String email) {
        Employee employee = passwordResetRepository.findByUsernameAndEmail(username, email);
        System.out.println(employee);
        return employee != null;
    }

    @Transactional
    public boolean updatePassword(String email, String newPassword) {
        // Retrieve the employee by email
        Employee employee = passwordResetRepository.findByEmail(email);
        if (employee == null) {
            return false; // User not found
        }

        // Update the password
        employee.setPassword(newPassword);
        passwordResetRepository.save(employee);
        return true; // Password updated successfully
    }

    public boolean resetPassword(PasswordResetRequest passwordResetRequest) {
        String email = passwordResetRequest.getEmail();
        String newPassword = passwordResetRequest.getNewPassword();
        String confirmPassword = passwordResetRequest.getConfirmPassword();

        if (!newPassword.equals(confirmPassword)) {
            return false; // Passwords do not match
        }

        // Call method to update password
        return updatePassword(email, newPassword);
    }

}