package com.example.backend.config;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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
                    "/addvendor",
                    "/login"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .successHandler((request, response, authentication) -> {
                    OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

                    String email = oauth2User.getAttribute("email");
                    String name = oauth2User.getAttribute("name");
                    String picture = oauth2User.getAttribute("picture");

                    String token = email; // Placeholder for token, use JWT in real apps

                    // Build redirect URL with encoded parameters
                    String redirectUrl = String.format("%s/auth/callback?token=%s&name=%s&email=%s&picture=%s",
                        FRONTEND_URL,
                        encode(token),
                        encode(name),
                        encode(email),
                        encode(picture)
                    );

                    response.sendRedirect(redirectUrl);
                })
            )
            .logout(logout -> logout
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.sendRedirect(FRONTEND_URL + "/login");
                })
            );

        return http.build();
    }

    // Encoding helper method to sanitize and encode URL parameters
    private String encode(String s) {
        return s != null ? URLEncoder.encode(s.replaceAll("[\r\n]", ""), StandardCharsets.UTF_8) : "";
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
