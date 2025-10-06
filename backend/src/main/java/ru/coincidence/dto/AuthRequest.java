package ru.coincidence.dto;


import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * @author kay 29.09.2025
 */

public record AuthRequest(
        @JsonProperty("username") String username,
        @JsonProperty("password") String password
) {}
