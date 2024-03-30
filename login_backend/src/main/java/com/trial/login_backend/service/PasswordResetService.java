package com.trial.login_backend.service;

import com.trial.login_backend.model.Employee;
import com.trial.login_backend.repository.PasswordResetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetService {
    @Autowired
    private PasswordResetRepository passwordResetRepository;

    public boolean isUserExists(String username, String email) {
        Employee employee = passwordResetRepository.findByUsernameAndEmail(username, email);
        return employee != null;
    }

    public boolean updatePassword(String email, String newPassword, String confirmPassword){
        if (newPassword == null || confirmPassword == null || !newPassword.equals(confirmPassword)) {
            return false; // Passwords do not match or newPassword is null
        }

        Employee employee = passwordResetRepository.findByEmail(email);
        if (employee == null) {
            return false; // User not found
        }

        employee.setPassword(newPassword); // Assuming there is a setPassword method in User class
        passwordResetRepository.save(employee);
        return true; // Password updated successfully
    }
}