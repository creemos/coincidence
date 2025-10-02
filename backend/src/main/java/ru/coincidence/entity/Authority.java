package ru.coincidence.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * @author kay 29.09.2025
 */
@Entity
@Table(name = "authorities")
@Data
public class Authority {

    @Id
    private Integer id;

    @Column(name = "name")
    private String name;

}
