package com.example.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.Vendor;
import com.example.backend.service.VendorService;
import com.example.backend.service.CloudinaryService;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ApiController {

    @Autowired
    private Validator validator;

    @Autowired
    private VendorService vendorService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/addvendor")
    public ResponseEntity<?> addVendor(
            @RequestParam("file") MultipartFile file,
            @RequestParam("business_name") String businessName,
            @RequestParam("category") String category,
            @RequestParam("address") String address,
            @RequestParam("phone_number") String phoneNumber,
            @RequestParam("email") String email,
            @RequestParam("area") String area,
            @RequestParam("pincode") int pincode
    ) {
        try {
            // Upload image first
            String imageUrl = cloudinaryService.uploadImage(file);

            Vendor vendor = new Vendor();
            vendor.setBusinessName(businessName);
            vendor.setCategory(category);
            vendor.setAddress(address);
            vendor.setPhoneNumber(phoneNumber);
            vendor.setEmail(email);
            vendor.setArea(area);
            vendor.setPincode(String.valueOf(pincode));
            vendor.setImageUrl(imageUrl);

            Set<ConstraintViolation<Vendor>> violations = validator.validate(vendor);
            if (!violations.isEmpty()) {
                List<String> errors = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errors);
            }

            Vendor createdVendor = vendorService.createVendor(vendor, file);
            return ResponseEntity.ok("Vendor added successfully with image!");
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error uploading image: " + e.getMessage());
        }
    }

    @GetMapping("/getvendors")
    public List<Vendor> getVendors() {
        return vendorService.getAllVendors();
    }

    @GetMapping("/getvendor/{id}")
    public Vendor getVendor(@PathVariable Long id) {
        return vendorService.getVendorById(id);
    }

    @DeleteMapping("/deletevendor/{id}")
    public String deleteVendor(@PathVariable Long id) {
        return vendorService.deleteVendor(id);
    }

    @PutMapping("/updatevendor/{id}")
    public ResponseEntity<?> updateVendor(
            @PathVariable Long id,
            @RequestParam(value = "business_name", required = false) String businessName,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "address", required = false) String address,
            @RequestParam(value = "phone_number", required = false) String phoneNumber,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "area", required = false) String area,
            @RequestParam(value = "pincode", required = false) Integer pincode,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        
        try {
            Vendor vendor = new Vendor();
            vendor.setBusinessName(businessName);
            vendor.setCategory(category);
            vendor.setAddress(address);
            vendor.setPhoneNumber(phoneNumber);
            vendor.setEmail(email);
            vendor.setArea(area);
            vendor.setPincode(pincode != null ? String.valueOf(pincode) : "0");

            Set<ConstraintViolation<Vendor>> violations = validator.validate(vendor);
            if (!violations.isEmpty()) {
                List<String> errors = violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.toList());
                return ResponseEntity.badRequest().body(errors);
            }

            String message = vendorService.updateVendor(id, vendor, file);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating vendor: " + e.getMessage());
        }
    }
}

