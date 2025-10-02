package ru.coincidence.dto;


import lombok.Data;

import java.util.List;

/**
 * @author kay 29.09.2025
 */
@Data
public class UserDto {
    private Long id;
    private String login;
    private String firstname;
    private String surname;
    private List<String> roles;
}
