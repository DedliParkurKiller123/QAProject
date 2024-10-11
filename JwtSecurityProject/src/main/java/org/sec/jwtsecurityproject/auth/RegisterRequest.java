package org.sec.jwtsecurityproject.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sec.jwtsecurityproject.config.customAnnotation.age.MinAge;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @Size(max = 500,min = 12, message = "Name should be between from 12 to 500 character")
    @NotBlank(message = "Name can't be empty")
    private String name;
    @MinAge(value = 18, message = "You must be at least 18 years old")
    private LocalDate dateOfBirth;
    @Size(min = 10,max = 10,message = "Phone number should be 10 character")
    @NotBlank(message = "Phone number can't be empty")
    private String phoneNumber;
    @Email(message = "Invalid email")
    @NotBlank(message = "Email can't be empty")
    private String email;
    @Size(min = 8,max = 100, message = "Password should be between from 8 to 100 character")
    @NotBlank(message = "Password can't be empty")
    private String password;
}
