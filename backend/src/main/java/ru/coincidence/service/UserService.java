package ru.coincidence.service;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.coincidence.dto.UserDto;
import ru.coincidence.entity.User;
import ru.coincidence.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author kay 29.09.2025
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private UserDto toDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setLogin(user.getLogin());
        dto.setFirstname(user.getFirstname());
        dto.setSurname(user.getSurname());
        dto.setRoles(user.getUserRoles().stream()
                .map(ur -> ur.getAuthority().getName())
                .collect(Collectors.toList()));
        return dto;
    }
}
