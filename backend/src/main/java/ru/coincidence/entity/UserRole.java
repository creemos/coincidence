package ru.coincidence.entity;


import jakarta.persistence.*;
import lombok.Data;

/**
 * @author kay 29.09.2025
 */
@Data
@Entity
@Table(name = "user_authorities")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "authority_id")
    private Authority authority;

}
