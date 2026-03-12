package com.shopscale.apigateway.controller;

import com.shopscale.apigateway.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Basic mock authentication logic - accepts any non-empty password for local testing
        if (email != null && !email.isEmpty() && password != null && !password.isEmpty()) {
            String token = jwtUtil.generateToken(email, "USER");
            
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("email", email);
            
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
