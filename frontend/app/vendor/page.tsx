"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { FiSend, FiUpload } from 'react-icons/fi';

interface FormData {
  business_name: string;
  category: string;
  address: string;
  phone_number: string;
  imageUrl: string;
  email: string;
  area: string;
  pincode: string;
  imageFile?: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function VendorForm() {
  const [form, setForm] = useState<FormData>({
    business_name: '',
    category: '',
    address: '',
    phone_number: '',
    imageUrl: '',
    email: '',
    area: '',
    pincode: '',
    imageFile: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, imageFile: 'Please upload an image file' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, imageFile: 'File size should be less than 5MB' });
        return;
      }

      setForm({ ...form, imageFile: file });
      setErrors({ ...errors, imageFile: '' });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.business_name || form.business_name.length > 50) newErrors.business_name = 'Business name is required and max 50 characters';
    if (!form.category || form.category.length < 3 || form.category.length > 30) newErrors.category = 'Category must be between 3 and 30 characters';
    if (form.address && (form.address.length < 30 || form.address.length > 200)) newErrors.address = 'Address must be between 30 and 200 characters';
    if (!form.phone_number || isNaN(Number(form.phone_number))) newErrors.phone_number = 'Valid phone number required';
    if (!form.email || form.email.length < 10 || form.email.length > 30) newErrors.email = 'Email must be between 10 and 30 characters';
    if (!form.area) newErrors.area = 'Area is required';
    if (!form.pincode || Number(form.pincode) < 100000 || Number(form.pincode) > 999999) newErrors.pincode = 'Pincode must be 6 digits';
    if (!form.imageFile && !form.imageUrl) newErrors.imageFile = 'Please upload an image or provide an image URL';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return toast.error('Please correct the errors');

    try {
      const formData = new FormData();
      formData.append('file', form.imageFile as File);
      formData.append('business_name', form.business_name);
      formData.append('category', form.category);
      formData.append('address', form.address);
      formData.append('phone_number', form.phone_number);
      formData.append('email', form.email);
      formData.append('area', form.area);
      formData.append('pincode', form.pincode);

      const res = await fetch('http://localhost:8080/addvendor', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (res.ok) {
        toast.success('Vendor added successfully!');
        setForm({
          business_name: '',
          category: '',
          address: '',
          phone_number: '',
          imageUrl: '',
          email: '',
          area: '',
          pincode: '',
          imageFile: null,
        });
        setPreviewUrl('');
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Submission failed');
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-2xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add Vendor Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {[
          { label: 'Business Name', name: 'business_name' },
          { label: 'Category', name: 'category' },
          { label: 'Address', name: 'address', type: 'textarea' },
          { label: 'Phone Number', name: 'phone_number' },
          { label: 'Email', name: 'email' },
          { label: 'Area', name: 'area' },
          { label: 'Pincode', name: 'pincode' },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={typeof form[name as keyof FormData] === 'string' ? form[name as keyof FormData] as string : ''}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg shadow-sm ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              />
            ) : (
              <input
                type={name === 'phone_number' || name === 'pincode' ? 'number' : 'text'}
                name={name}
                value={typeof form[name as keyof FormData] === 'string' ? form[name as keyof FormData] as string : ''}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg shadow-sm ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              />
            )}
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        {/* Image Upload Section */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiUpload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
              </div>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          {previewUrl && (
            <div className="mt-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 rounded-lg object-cover"
              />
            </div>
          )}
          {errors.imageFile && <p className="text-red-500 text-sm mt-1">{errors.imageFile}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-transform transform hover:scale-105 shadow-lg"
        >
          <FiSend className="text-lg" /> Submit
        </button>
      </form>
    </div>
  );
}