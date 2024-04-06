package com.trial.login_backend.repository;

import jakarta.mail.MessagingException;

public interface EmailRepository {
    void sendEmail(String to, String subject, String message) throws MessagingException;
}
