package org.sec.jwtsecurityproject.auth;

import lombok.RequiredArgsConstructor;
import org.sec.jwtsecurityproject.config.JwtService;
import org.sec.jwtsecurityproject.user.model.User;
import org.sec.jwtsecurityproject.user.repository.UserRepository;
import org.sec.jwtsecurityproject.user.role.Role;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest registerRequest){
        if(userRepository.findByPhoneNumber(registerRequest.getPhoneNumber()).isPresent()){
            throw new IllegalStateException("Phone has taken");
        }
        var user = User.builder()
                .name(registerRequest.getName())
                .dateOfBirth(registerRequest.getDateOfBirth())
                .email(registerRequest.getEmail())
                .phoneNumber(registerRequest.getPhoneNumber())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        var jwt = jwtService.generatorJwt(user);
        return AuthenticationResponse
                .builder()
                .jwt(jwt)
                .build();
    }

    public AuthenticationResponse authentication(AuthenticationRequest authenticationRequest){
        UserDetails user = (UserDetails)  authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getPhoneNumber(),authenticationRequest.getPassword())
        ).getPrincipal();
        var jwt = jwtService.generatorJwt(user);
        return AuthenticationResponse
                .builder()
                .jwt(jwt)
                .build();
    }

    public Map<String, String> hasValidationErrors(BindingResult bindingResult) {
        Map<String, String> errors = new HashMap<>();
        if (bindingResult.hasErrors()) {
            bindingResult.getFieldErrors().forEach(error ->
                    errors.put(error.getField(), error.getDefaultMessage())
            );
            System.out.println(errors);
            return errors;
        }
        return errors;
    }
}
