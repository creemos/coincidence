package ru.coincidence.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.experimental.FieldDefaults;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * @author kay 25.03.2025
 */
@Entity
@Table(name = "users")
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
@ToString
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    Integer id;

    @Column(name = "login")
    String login;

    @Column(name = "password")
    String password;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "surname")
    String surname;

    @Column(name = "firstname")
    String firstname;

    @Column(name = "patrname")
    String patrname;

    @Column(name = "is_blocked")
    Boolean isBlocked;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return "";
    }

    @Override
    public String getUsername() {
        return login;
    }

    public enum Role {
        ADMIN,
        USER
    }

    public User(String login, String password, Role role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }

}
