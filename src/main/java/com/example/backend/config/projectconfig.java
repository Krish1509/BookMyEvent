package com.example.backend.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.cloudinary.Cloudinary;


@Configuration
public class projectconfig {
 
    @Bean
    public Cloudinary getcloudinary()
    {
        Map map = new HashMap();
        map.put("cloud_name", "dbdyarkdq");
        map.put("api_key", "956427588127543");
        map.put("api_secret", "8O2O3hzxvPKM_6bgRkshPrxuEwY");
        map.put("secure", true);

        return new Cloudinary(map);
        
    }
    
}
