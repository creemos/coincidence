package ru.coincidence.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.coincidence.entity.User;
import ru.coincidence.repository.UserRepository;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            userRepository.save(new User("admin", passwordEncoder.encode("123456"), User.Role.ADMIN));
        };
    }

}
