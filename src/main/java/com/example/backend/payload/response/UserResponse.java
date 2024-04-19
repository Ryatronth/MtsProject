package com.example.backend.payload.response;

import com.example.backend.entity.auth.RoleName;
import com.example.backend.entity.user.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private Long id;

    private String imageUrl;

    private String name;

    private String surname;

    private String patronymic;

    private String phone;

    private RoleName role;

    public UserResponse(User user) {
        id = user.getId();
        imageUrl = user.getImageUrl();
        name = user.getName();
        surname = user.getSurname();
        patronymic = user.getPatronymic();
        phone = user.getPhone();
        role = user.getRole();
    }
}

