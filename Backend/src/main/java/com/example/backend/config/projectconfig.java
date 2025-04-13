package com.example.backend.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;

@Configuration
public class projectconfig {
 
    @Autowired
    private CloudinaryProperties cloudinaryProperties;

    @Bean
    public Cloudinary getcloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudinaryProperties.getCloudName());
        config.put("api_key", cloudinaryProperties.getApiKey());
        config.put("api_secret", cloudinaryProperties.getApiSecret());
        config.put("secure", String.valueOf(cloudinaryProperties.isSecure()));

        return new Cloudinary(config);
    }
}
