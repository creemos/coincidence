package ru.coincidence.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import ru.coincidence.repository.UserRepository;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserRepository userRepository;

    public SecurityConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/home", "/css/**", "/js/**", "/images/**").permitAll() // Доступ без аутентификации
                        .requestMatchers("/api/users/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated() // Все остальные запросы требуют аутентификации
                )
                .formLogin((form) -> form // Форма входа
                        .loginPage("/login")
                        .defaultSuccessUrl("/home", true)
                        .permitAll()

                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // URL для выхода
                        .logoutSuccessUrl("/home")// Перенаправление после выхода
                        .invalidateHttpSession(true) // Удаление сессии
                        .deleteCookies("JSESSIONID") // Удаление cookies
                        .permitAll()
                ); // Разрешить выход
        return http.build();
    }

    // Настройка UserDetailsService
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByLogin(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    // Настройка AuthenticationProvider
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    // Настройка AuthenticationManager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Настройка кодировщика паролей
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
