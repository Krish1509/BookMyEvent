package com.example.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.model.Vendor;
import com.example.backend.repository.VendorRepo;

@Service
public class VendorService {

    @Autowired
    private VendorRepo repoobj;

    @Autowired
    private cloudinaryservice cloudinaryService;

    public void addvendor(Vendor v)
    {
        repoobj.save(v);
    }

    public List<Vendor> fetchvendors()
    {
        return repoobj.findAll();
    }

    public Vendor fetchvendor(long id)
    {
        return repoobj.findById(id).orElse(null);
    }  

    public String deletevendor(long id)
    {
        if(!repoobj.existsById(id))
        {
            return "Vendor not found";
        }
        repoobj.deleteById(id);

        boolean exist = repoobj.existsById(id);

        if(!exist)
        {
            return "vendor is deleted successfully";
        }
        else
        {
           return "vendor is not deleted";
        }
    }
    
    public String updatevendor(long id, Vendor v, MultipartFile file) {
        try {
            Vendor getvendor = repoobj.findById(id).orElse(null);

            if (getvendor == null) {
                return "Vendor not found";
            }

            // Update vendor details if provided
            if (v.getBusiness_name() != null && !v.getBusiness_name().trim().isEmpty()) {
                getvendor.setBusiness_name(v.getBusiness_name());
            }
            if (v.getAddress() != null && !v.getAddress().trim().isEmpty()) {
                getvendor.setAddress(v.getAddress());
            }
            if (v.getArea() != null && !v.getArea().trim().isEmpty()) {
                getvendor.setArea(v.getArea());
            }
            if (v.getCategory() != null && !v.getCategory().trim().isEmpty()) {
                getvendor.setCategory(v.getCategory());
            }
            if (v.getEmail() != null && !v.getEmail().trim().isEmpty()) {
                getvendor.setEmail(v.getEmail());
            }
            if (v.getPhone_number() != 0) {
                getvendor.setPhone_number(v.getPhone_number());
            }
            if (v.getPincode() != 0) {
                getvendor.setPincode(v.getPincode());
            }

            // Handle image update
            if (file != null && !file.isEmpty()) {
                try {
                    String imageUrl = cloudinaryService.uploadImage(file);
                    if (imageUrl != null && !imageUrl.isEmpty()) {
                        getvendor.setImageUrl(imageUrl);
                    } else {
                        return "Failed to get image URL from Cloudinary";
                    }
                } catch (Exception e) {
                    System.err.println("Error during image upload: " + e.getMessage());
                    e.printStackTrace();
                    return "Failed to upload image: " + e.getMessage();
                }
            }

            // Save the updated vendor
            repoobj.save(getvendor);
            return "Vendor is updated successfully";
            
        } catch (Exception e) {
            System.err.println("Error updating vendor: " + e.getMessage());
            e.printStackTrace();
            return "Failed to update vendor: " + e.getMessage();
        }
    }
}