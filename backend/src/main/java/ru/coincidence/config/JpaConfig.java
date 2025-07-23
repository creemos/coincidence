package ru.coincidence.config;


import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EntityScan(basePackages = "ru.coincidence.entity")
@ComponentScan(basePackages = "ru.coincidence.service")
@EnableTransactionManagement
public class JpaConfig {
}
