package com.example.backend.controller;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.Vendor;
import com.example.backend.service.VendorService;
import com.example.backend.service.cloudinaryservice;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;

@RestController
public class apicontroller {

    @Autowired
    private Validator validator;

    @Autowired
    private VendorService vendorService;

    @Autowired
    private cloudinaryservice cloudinaryService;

    @GetMapping("/")
    public String home() {
        return "Welcome to BookMyEvent";
    }

    // ✅ Add Vendor with Image
   @PostMapping("/addvendor")
public ResponseEntity<?> addVendor(
        @RequestParam("file") MultipartFile file,
        @RequestParam("business_name") String businessName,
        @RequestParam("category") String category,
        @RequestParam("address") String address,
        @RequestParam("phone_number") long phoneNumber,
        @RequestParam("email") String email,
        @RequestParam("area") String area,
        @RequestParam("pincode") int pincode
) {
    String imageUrl = cloudinaryService.uploadImage(file);

    Vendor vendor = new Vendor();
    vendor.setBusiness_name(businessName);
    vendor.setCategory(category);
    vendor.setAddress(address);
    vendor.setPhone_number(phoneNumber);
    vendor.setEmail(email);
    vendor.setArea(area);
    vendor.setPincode(pincode);
    vendor.setImageUrl(imageUrl);

    Set<ConstraintViolation<Vendor>> violations = validator.validate(vendor);
    if (!violations.isEmpty()) {
        List<String> errors = violations.stream()
            .map(ConstraintViolation::getMessage)
            .collect(Collectors.toList());
        return ResponseEntity.badRequest().body(errors);
    }

    vendorService.addvendor(vendor);
    return ResponseEntity.ok("Vendor added successfully with image!");
}


    @GetMapping("/getvendors")
    public List<Vendor> getvendors() {
        return vendorService.fetchvendors();
    }

    @GetMapping("/getvendor/{id}")
    public Vendor getvendor(@PathVariable long id) {
        return vendorService.fetchvendor(id);
    }

    @DeleteMapping("/deletevendor/{id}")
    public String deletevendor(@PathVariable Long id) {
        return vendorService.deletevendor(id);
    }

    @PutMapping("/updatevendor/{id}")
public ResponseEntity<String> updateVendor(
        @PathVariable Long id,
        @ModelAttribute Vendor vendor,
        @RequestParam(value = "file", required = false) MultipartFile file) {
    
    String message = vendorService.updatevendor(id, vendor, file);
    return ResponseEntity.ok(message);
}
}
