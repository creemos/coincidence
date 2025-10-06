package ru.coincidence.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.coincidence.entity.User;
import ru.coincidence.repository.UserRepository;

import java.util.Optional;

@Configuration
public class DataLoader {

    /*@Bean
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            Optional<User> admin = userRepository.findByLogin("admin");
            User a = admin.get();
            a.setPassword(passwordEncoder.encode("123456"));
            userRepository.save(a);
            //userRepository.save(new User("admin", passwordEncoder.encode("123456"), User.Role.ADMIN));
        };
    }*/

}
