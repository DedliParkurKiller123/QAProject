package org.sec.jwtsecurityproject.auth;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/api/auth/")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest,
                                      BindingResult bindingResult) {
        Map<String, String> errors = authenticationService.hasValidationErrors(bindingResult);
        return !errors.isEmpty()
                ? ResponseEntity.badRequest().body(errors)
                : ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/authentication")
    public ResponseEntity<?> authentication(@Valid @RequestBody AuthenticationRequest authenticationRequest,
                                            BindingResult bindingResult ) {
        Map<String, String> errors = authenticationService.hasValidationErrors(bindingResult);
        return !errors.isEmpty()
                ? ResponseEntity.badRequest().body(errors)
                : ResponseEntity.ok(authenticationService.authentication(authenticationRequest));
    }
}
