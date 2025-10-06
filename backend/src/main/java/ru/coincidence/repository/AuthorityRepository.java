package ru.coincidence.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.coincidence.entity.Authority;

import java.util.Optional;

/**
 * @author kay 06.10.2025
 */
@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Optional<Authority> findByName(String name);
}
