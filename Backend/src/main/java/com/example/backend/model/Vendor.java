package com.example.backend.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

@Entity(name="vendor_data")
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message="business name is compulsory")
    @Size(max=50 )
    private String business_name;

    @NotBlank
    @Size(min=3 , max=30)
    private String category;

    @Size(min=30 , max =200)
    private String address;

    @NotNull
    @Positive
    private Long phone_number;


    private String imageUrl;

    @NotBlank
    @Size(min=10 , max=30)
    private String email;

    @NotBlank
    private String area;

    @NotNull(message = "Pincode is required")
@Min(value = 100000, message = "Pincode must be 6 digits")
@Max(value = 999999, message = "Pincode must be 6 digits")

    private int pincode;

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getBusiness_name() {
        return business_name;
    }
    public void setBusiness_name(String business_name) {
        this.business_name = business_name;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public long getPhone_number() {
        return phone_number;
    }
    public void setPhone_number(long phone_number) {
        this.phone_number = phone_number;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }
    public int getPincode() {
        return pincode;
    }
    public void setPincode(int pincode) {
        this.pincode = pincode;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Vendor [id=" + id + ", business_name=" + business_name + ", category=" + category + ", address="
                + address + ", phone_number=" + phone_number + ", imageUrl=" + imageUrl + ", email=" + email + ", area="
                + area + ", pincode=" + pincode + "]";
    }

}