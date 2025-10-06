package ru.coincidence.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author kay 06.10.2025
 */
public record SignUpRequest(
        @JsonProperty("username") String username,
        @JsonProperty("password") String password,
        @JsonProperty("surname") String surname,
        @JsonProperty("firstname") String firstname,
        @JsonProperty("email") String email
) {
}
