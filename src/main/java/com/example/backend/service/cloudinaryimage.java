package com.example.backend.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface  cloudinaryimage {

    public Map upload(MultipartFile file);

}
