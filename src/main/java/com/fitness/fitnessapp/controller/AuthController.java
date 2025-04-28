package com.fitness.fitnessapp.controller;

import com.fitness.fitnessapp.domain.Member;
import com.fitness.fitnessapp.domain.Trainer;
import com.fitness.fitnessapp.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public Member signup(@RequestBody Member member) {
        return authService.signup(member);
    }

    @PostMapping("/login")
    public Object login(@RequestParam String username, @RequestParam String password) {
        return authService.login(username, password); // poate fi Member sau Trainer
    }
}
