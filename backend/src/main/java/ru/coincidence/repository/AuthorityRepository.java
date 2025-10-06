package ru.coincidence.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.coincidence.entity.Authority;

import java.util.Optional;

/**
 * @author kay 06.10.2025
 */
@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    @Query("select a from Authority a where a.name = :name")
    Optional<Authority> findByName(@Param("name") String name);
}
