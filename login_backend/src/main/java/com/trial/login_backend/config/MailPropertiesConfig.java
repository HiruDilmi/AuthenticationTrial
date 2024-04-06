package com.trial.login_backend.config;

import org.springframework.boot.autoconfigure.mail.MailProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailPropertiesConfig {
    @Bean
    public MailProperties mailProperties() {
        return new MailProperties();
    }
}
