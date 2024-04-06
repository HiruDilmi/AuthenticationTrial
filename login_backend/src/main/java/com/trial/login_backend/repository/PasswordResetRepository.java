package com.trial.login_backend.repository;

import com.trial.login_backend.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetRepository extends JpaRepository<Employee, Integer> {
    Employee findByUsernameAndEmail(String username, String email);
    Employee findByUsername(String username);
    Employee findByEmail(String email);
}
