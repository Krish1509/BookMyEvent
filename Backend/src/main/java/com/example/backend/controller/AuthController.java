package com.example.backend.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthController {

    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        Map<String, Object> userInfo = new HashMap<>();
        
        if (principal != null) {
            userInfo.put("name", principal.getAttribute("name"));
            userInfo.put("email", principal.getAttribute("email"));
            userInfo.put("picture", principal.getAttribute("picture"));
            userInfo.put("id", principal.getAttribute("sub"));
            userInfo.put("authenticated", true);
        } else {
            userInfo.put("authenticated", false);
        }
        
        return userInfo;
    }
    
    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Welcome to BookMyEvent API");
        response.put("status", "running");
        response.put("login", "Use /oauth2/authorization/google to login with Google");
        return response;
    }
} 