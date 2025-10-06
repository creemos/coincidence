package ru.coincidence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.coincidence.entity.User;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByLogin(String login);

    @Query("SELECT u FROM User u JOIN FETCH u.userRoles ur JOIN FETCH ur.authority WHERE u.login = :login")
    Optional<User> findByLoginWithAuthorities(@Param("login") String login);
}
