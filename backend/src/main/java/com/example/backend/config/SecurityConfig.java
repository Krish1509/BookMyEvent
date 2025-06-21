package com.example.backend.config;

import java.net.URLEncoder;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${frontend.url}")
    private String FRONTEND_URL;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
           .authorizeHttpRequests(auth -> auth
    .requestMatchers(
        "/error",
        "/oauth2/**",
        "/addvendor", // allow unauthenticated POSTs to this
        "/login"
    ).permitAll()
    .anyRequest().authenticated()
)

            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .successHandler((request, response, authentication) -> {
                    OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                    // Get user information from OAuth2User
                    String email = oauth2User.getAttribute("email");
                    String name = oauth2User.getAttribute("name");
                    String picture = oauth2User.getAttribute("picture");
                    
                    
                    // Generate a token (you might want to use JWT here)
                    String token = email; // Using email as token for now
                    
                    // Build the redirect URL with all user information
                    String redirectUrl = String.format("%s/auth/callback?token=%s&name=%s&email=%s&picture=%s",
                        FRONTEND_URL,
                        token,
                        name != null ? URLEncoder.encode(name, "UTF-8") : "",
                        email != null ? URLEncoder.encode(email, "UTF-8") : "",
                        picture != null ? URLEncoder.encode(picture, "UTF-8") : ""
                    );
                    
                    // Redirect to frontend with all user data
                    response.sendRedirect(redirectUrl);
                })
            )
            .logout(logout -> logout
                .logoutSuccessUrl(FRONTEND_URL + "/login")
            );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(FRONTEND_URL));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}