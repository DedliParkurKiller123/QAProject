package org.sec.jwtsecurityproject.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    @Size(min = 10,max = 10,message = "Phone number should be 10 character")
    @NotBlank(message = "Phone number can't be empty")
    private String phoneNumber;
    @Size(min = 8,max = 100, message = "Password should be between from 8 to 100 character")
    @NotBlank(message = "Password can't be empty")
    private String password;
}
