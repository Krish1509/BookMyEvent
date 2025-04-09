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
    Vendor getvendor = repoobj.findById(id).orElse(null);

    if (getvendor == null) {
        return "Vendor not found";
    }

    getvendor.setBusiness_name(v.getBusiness_name());
    getvendor.setAddress(v.getAddress());
    getvendor.setArea(v.getArea());
    getvendor.setCategory(v.getCategory());
    getvendor.setEmail(v.getEmail());
    getvendor.setPhone_number(v.getPhone_number());
    getvendor.setPincode(v.getPincode());

    // Handle image update only if new file is provided
    if (file != null && !file.isEmpty()) {
        try {
            // Example: save to "uploads/" directory
            String uploadDir = "uploads/";
            String fileName = file.getOriginalFilename();
            String filePath = uploadDir + fileName;
            
            file.transferTo(new java.io.File(filePath)); // Save file locally

            getvendor.setImageUrl(filePath); // Save path in DB
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to upload image";
        }
    }

    repoobj.save(getvendor);
    return "Vendor is updated successfully";
}

}