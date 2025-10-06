package ru.coincidence.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import ru.coincidence.entity.UserRole;

/**
 * @author kay 06.10.2025
 */
public interface UserRoleRepository  extends JpaRepository<UserRole, Integer> {
}
