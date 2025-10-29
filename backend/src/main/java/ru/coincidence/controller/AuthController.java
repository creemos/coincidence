package ru.coincidence.controller;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.coincidence.dto.AuthRequest;
import ru.coincidence.dto.AuthResponse;
import ru.coincidence.dto.SignUpRequest;
import ru.coincidence.entity.Authority;
import ru.coincidence.entity.User;
import ru.coincidence.entity.UserRole;
import ru.coincidence.repository.AuthorityRepository;
import ru.coincidence.repository.UserRepository;
import ru.coincidence.repository.UserRoleRepository;
import ru.coincidence.service.JwtService;

import java.util.Map;

/**
 * @author kay 29.09.2025
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final UserRoleRepository userRoleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println(">>> Received login request: " + request);
        System.out.println(">>> Username: '" + request.username() + "'");
        System.out.println(">>> Password: '" + request.password() + "'");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        System.out.println(encoder.encode(request.password()));

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    )
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());
            String jwtToken = jwtService.generateToken(userDetails);
            long expiresIn = jwtService.getExpirationTime();

            return ResponseEntity.ok(new AuthResponse(jwtToken, expiresIn));

        } catch (BadCredentialsException e) {
            System.out.println(">>> Invalid credentials: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));

        } catch (Exception e) {
            System.out.println(">>> Login error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Authentication failed"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignUpRequest request) {
        // 1. Проверяем, существует ли пользователь
        try {
            userDetailsService.loadUserByUsername(request.username());
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "User with this username already exists"));
        } catch (UsernameNotFoundException ignored) {
            // Пользователь не найден — можно создавать
        }

        // 2. Шифруем пароль
        String encodedPassword = passwordEncoder.encode(request.password());

        User user = new User();
        user.setLogin(request.username());
        user.setPassword(encodedPassword);
        user.setSurname(request.surname());
        user.setFirstname(request.firstname());
        user.setIsBlocked(false);

        // 4. Назначаем роль USER
        Authority userAuthority = authorityRepository.findByName("USER")
                .orElseThrow(() -> new RuntimeException("Authority 'USER' not found in database"));

        // 5. Сохраняем в БД
        userRepository.save(user);

        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setAuthority(userAuthority);
        userRoleRepository.save(userRole);

        user.getUserRoles().add(userRole);

        // 6. Генерируем токен
        UserDetails userDetails = org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(user.getAuthorities())
                .build();

        String jwtToken = jwtService.generateToken(userDetails);
        long expiresIn = jwtService.getExpirationTime();
        return ResponseEntity.ok(new AuthResponse(jwtToken, expiresIn));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshByAccessToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String jwt = authHeader.substring(7);
        String username = jwtService.extractUsername(jwt);
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        if (jwtService.isTokenValid(jwt, userDetails)) {
            String newToken = jwtService.generateToken(userDetails);
            long expiresIn = jwtService.getExpirationTime();
            return ResponseEntity.ok(new AuthResponse(newToken, expiresIn));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
