"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import { FiSend, FiUpload, FiArrowRight, FiArrowLeft, FiCheck, FiImage } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import Navbar from './components/FormNav';

interface FormData {
  business_name: string;
  category: string;
  other_category?: string;
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

const sections = [
  {
    title: "Basic Information",
    fields: ['business_name', 'category', 'email']
  },
  {
    title: "Contact Details",
    fields: ['phone_number', 'address', 'area', 'pincode']
  },
  {
    title: "Business Image",
    fields: ['imageFile']
  }
];

const categories = [
  'DJ',
  'Party Plot',
  'Catering',
  'Photography',
  'Decoration',
  'Venue',
  'Entertainment',
  'Other'
];

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
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ 
      ...prev, 
      [name]: value,
      // Clear other_category if category is not "Other"
      ...(name === 'category' && value !== 'Other' ? { other_category: '' } : {})
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, imageFile: 'Please upload an image file' });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, imageFile: 'File size should be less than 5MB' });
        return;
      }

      setForm({ ...form, imageFile: file });
      setErrors({ ...errors, imageFile: '' });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateSection = (sectionIndex: number) => {
    const newErrors: FormErrors = {};
    const currentFields = sections[sectionIndex].fields;

    currentFields.forEach(field => {
      if (field === 'business_name' && (!form.business_name || form.business_name.length > 50)) {
        newErrors.business_name = 'Business name is required and max 50 characters';
      }
      if (field === 'category') {
        if (!form.category) {
          newErrors.category = 'Category is required';
        } else if (form.category === 'Other' && !form.other_category) {
          newErrors.other_category = 'Please specify your category';
        }
      }
      if (field === 'email' && (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (field === 'phone_number' && (!form.phone_number || !/^\d{10}$/.test(form.phone_number))) {
        newErrors.phone_number = 'Please enter a valid 10-digit phone number';
      }
      if (field === 'address' && (!form.address || form.address.length < 10)) {
        newErrors.address = 'Address must be at least 10 characters';
      }
      if (field === 'area' && !form.area) {
        newErrors.area = 'Area is required';
      }
      if (field === 'pincode' && (!form.pincode || !/^\d{6}$/.test(form.pincode))) {
        newErrors.pincode = 'Pincode must be 6 digits';
      }
      if (field === 'imageFile' && !form.imageFile && !form.imageUrl) {
        newErrors.imageFile = 'Please upload an image or provide an image URL';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateSection(currentSection)) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('file', form.imageFile as File);
      formData.append('business_name', form.business_name);
      formData.append('category', form.category === 'Other' ? form.other_category || '' : form.category);
      formData.append('address', form.address);
      formData.append('phone_number', form.phone_number);
      formData.append('email', form.email);
      formData.append('area', form.area);
      formData.append('pincode', form.pincode);

  const res = await fetch(`${process.env.BACKEND_API_URL}/addvendor`, {
  method: 'POST',
  body: formData,
  credentials: 'include', // required for cookies/session
});


      if (res.ok) {
        setIsSuccess(true);
        toast.success('Vendor registered successfully!');
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
        toast.error(errorData.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="px-8 py-12 text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6"
              >
                <FiCheck className="w-10 h-10 text-white" />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl font-bold text-white mb-4"
              >
                Registration Successful!
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-300 mb-8"
              >
                Your vendor account has been created successfully.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSuccess(false)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Register Another Vendor
              </motion.button>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          <div className="px-8 py-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                <TypeAnimation
                  sequence={[
                    'Vendor Registration',
                    1000,
                    'Join Our Platform',
                    1000,
                  ]}
                  wrapper="span"
                  speed={30}
                  cursor={true}
                  style={{ 
                    display: 'inline-block',
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  repeat={Infinity}
                />
              </h2>
              <p className="text-lg text-gray-300">Complete the form below to register your business</p>
            </motion.div>

            {/* Progress Steps */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center space-x-8 mb-12"
            >
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                  className={`flex items-center ${
                    index <= currentSection ? 'text-blue-400' : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentSection 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-gray-800'
                    } transition-all duration-300`}
                  >
                    {index + 1}
                  </div>
                  <span className="ml-3 text-sm font-medium">{section.title}</span>
                  {index < sections.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      index < currentSection ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-700'
                    } transition-all duration-300`}></div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                {sections[currentSection].fields.map((field, index) => (
                  <motion.div
                    key={field}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="group"
                  >
                    <label className="block text-gray-300 font-medium mb-2 text-lg">
                      {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </label>
                    {field === 'category' ? (
                      <div className="space-y-2">
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleChange}
                          className={`w-full p-4 bg-white/5 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                            errors[field] ? 'border-red-500' : 'border-gray-700'
                          } group-hover:border-blue-400 text-white`}
                        >
                          <option value="">Select a category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat} className="bg-gray-800">
                              {cat}
                            </option>
                          ))}
                        </select>
                        {form.category === 'Other' && (
                          <input
                            type="text"
                            name="other_category"
                            value={form.other_category || ''}
                            onChange={handleChange}
                            placeholder="Please specify your category"
                            className={`w-full p-4 bg-white/5 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                              errors['other_category'] ? 'border-red-500' : 'border-gray-700'
                            } group-hover:border-blue-400 text-white placeholder-gray-400 mt-2`}
                          />
                        )}
                      </div>
                    ) : field === 'imageFile' ? (
                      <div className="flex flex-col items-center justify-center w-full">
                        <label className="relative w-full h-48 border-2 border-dashed rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all duration-300 group-hover:border-blue-400 border-gray-700 overflow-hidden">
                          {previewUrl ? (
                            <div className="w-full h-full flex flex-col">
                              <div className="flex-1 relative">
                                <img 
                                  src={previewUrl} 
                                  alt="Preview" 
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                                <p className="text-white text-sm text-center">Click to change image</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full p-6">
                              <FiImage className="w-12 h-12 mb-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                              <p className="mb-2 text-sm text-gray-300">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
                            </div>
                          )}
                          <input
                            type="file"
                            name="imageFile"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        {errors[field] && (
                          <p className="text-red-400 text-sm mt-2 flex items-center">
                            <span className="mr-1">⚠️</span> {errors[field]}
                          </p>
                        )}
                      </div>
                    ) : (
                      <input
                        type={field === 'phone_number' || field === 'pincode' ? 'number' : 'text'}
                        name={field}
                        value={form[field as keyof FormData] as string}
                        onChange={handleChange}
                        className={`w-full p-4 bg-white/5 border-2 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ${
                          errors[field] ? 'border-red-500' : 'border-gray-700'
                        } group-hover:border-blue-400 text-white placeholder-gray-400`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {previewUrl && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-6"
                >
                  <div className="relative group">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-xl"></div>
                  </div>
                </motion.div>
              )}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="flex justify-between pt-8"
              >
                {currentSection > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handlePrevious}
                    className="flex items-center px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                  >
                    <FiArrowLeft className="mr-2" /> Previous
                  </motion.button>
                )}
                
                {currentSection < sections.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleNext}
                    className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg ml-auto"
                  >
                    Next <FiArrowRight className="ml-2" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg ml-auto ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" /> Submit Registration
                      </>
                    )}
                  </motion.button>
                )}
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}