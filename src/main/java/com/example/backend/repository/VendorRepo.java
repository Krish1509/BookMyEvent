package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.Vendor;

public interface VendorRepo extends JpaRepository<Vendor, Long> {

}
