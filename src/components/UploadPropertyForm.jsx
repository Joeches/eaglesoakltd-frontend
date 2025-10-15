import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { postWithFiles } from '../api/api';
import { UploadCloud, Loader2, ArrowLeft, ArrowRight, CheckCircle, Building, MapPin, DollarSign, User, Phone, Youtube, Image as ImageIcon, FileText, Type } from 'lucide-react';

// ARCHITECTURAL FIX 1: A single, unified schema for the entire form.
const fullPropertySchema = z.object({
  propertyTitle: z.string().min(5, "Title is required"),
  location: z.string().min(3, "Location is required"),
  propertyAddress: z.string().min(10, "A full address is required"),
  price: z.preprocess((val) => parseFloat(String(val).replace(/,/g, '')), z.number({ invalid_type_error: "Price must be a number" }).positive("Price must be positive")),
  description: z.string().min(20, "Description must be at least 20 characters"),
  realtorName: z.string().min(2, "Realtor name is required"),
  realtorContact: z.string().min(10, "A valid contact is required"),
  youtubeLink: z.string().url("Must be a valid YouTube URL").optional().or(z.literal('')),
  propertyImages: z.instanceof(FileList).refine(files => files.length > 0, "At least one image is required.").refine(files => files.length <= 5, "You can upload a maximum of 5 images."),
  propertyPDF: z.instanceof(FileList).optional(),
});

const steps = [
  { name: "Core Details", fields: ["propertyTitle", "location", "propertyAddress", "price", "description"] },
  { name: "Realtor Info", fields: ["realtorName", "realtorContact"] },
  { name: "Media Uploads", fields: ["youtubeLink", "propertyImages", "propertyPDF"] },
];

const FormField = ({ id, register, error, icon: Icon, type = "text", ...rest }) => (
  <div className="relative">
    <Icon size={20} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
    {type === 'textarea' ? (
      <textarea id={id} {...register(id)} {...rest} className={`w-full p-3 pl-11 bg-neutral-700/50 text-white rounded-md border ${error ? 'border-red-500' : 'border-neutral-600'} focus:ring-2 focus:ring-primary-500 focus:outline-none transition resize-none`} />
    ) : (
      <input id={id} {...register(id)} type={type} {...rest} className={`w-full p-3 pl-11 bg-neutral-700/50 text-white rounded-md border ${error ? 'border-red-500' : 'border-neutral-600'} focus:ring-2 focus:ring-primary-500 focus:outline-none transition`} />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

// ARCHITECTURAL FIX 2: A re-architected, robust, and foolproof FileUploadZone using Controller.
const FileUploadZone = ({ name, control, error, label, accept, multiple }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value } }) => {
      const files = value ? Array.from(value) : [];
      const imagePreviews = files.filter(file => file.type.startsWith('image/')).map(file => URL.createObjectURL(file));
      const otherFiles = files.filter(file => !file.type.startsWith('image/'));

      return (
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-neutral-600 px-6 py-10 hover:border-primary-500 transition">
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4 flex text-sm leading-6 text-gray-400">
                <label htmlFor={name} className="relative cursor-pointer rounded-md font-semibold text-primary-400 focus-within:outline-none hover:text-primary-300">
                  <span>Upload files</span>
                  <input id={name} name={name} type="file" className="sr-only" onChange={(e) => onChange(e.target.files)} onBlur={onBlur} accept={accept} multiple={multiple} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
            </div>
          </div>
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {imagePreviews.length > 0 && ( <div className="grid grid-cols-3 sm:grid-cols-5 gap-4"> {imagePreviews.map((src, index) => <img key={index} src={src} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-md" />)} </div> )}
              {otherFiles.length > 0 && ( otherFiles.map((file, index) => ( <div key={index} className="text-xs text-gray-300 bg-neutral-700/50 p-2 rounded-md flex items-center justify-between"> <div className="flex items-center gap-2"><FileText size={14} /><span>{file.name}</span></div> <span>{(file.size / 1024).toFixed(2)} KB</span> </div> )) )}
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      );
    }}
  />
);

const UploadPropertyForm = ({ onUploadSuccess }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const { control, register, handleSubmit, formState: { errors, isSubmitting }, trigger, reset } = useForm({
    resolver: zodResolver(fullPropertySchema),
    mode: 'onTouched'
  });

  const handleNext = async () => {
    const fieldsToValidate = steps[currentStep].fields;
    const isStepValid = await trigger(fieldsToValidate, { shouldFocus: true });
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handleBack = () => setCurrentStep(prev => prev - 1);

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // ARCHITECTURAL FIX 3: A definitive onSubmit handler with perfect backend field mapping.
    const propertyDataPayload = {
        title: data.propertyTitle,
        location: data.location,
        address: data.propertyAddress,
        price: data.price,
        description: data.description,
        realtor_name: data.realtorName,
        realtor_contact: data.realtorContact,
        youtube_url: data.youtubeLink || '',
    };
    
    formData.append('property_data_json', JSON.stringify(propertyDataPayload));

    if (data.propertyImages) Array.from(data.propertyImages).forEach(file => formData.append('images', file));
    if (data.propertyPDF && data.propertyPDF.length > 0) formData.append('pdf', data.propertyPDF[0]);

    try {
      await postWithFiles('/properties', formData);
      toast.success('Property uploaded successfully!');
      reset();
      setCurrentStep(0);
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      toast.error(error.message || 'Upload failed. Please try again.');
    }
  };

  return (
    <div className="bg-neutral-800/40 backdrop-blur-xl p-8 rounded-2xl border border-neutral-700/80">
      <div className="text-center mb-8">
        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-2 text-2xl font-bold text-white">Upload New Property</h2>
        <p className="mt-1 text-sm text-gray-400">Follow the steps to add a new listing.</p>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center w-1/3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 border-2 ${index <= currentStep ? 'bg-primary-500 border-primary-500' : 'bg-neutral-700 border-neutral-600'}`}>
                  {index < currentStep ? <CheckCircle size={20} /> : <span className="font-bold">{index + 1}</span>}
                </div>
                <div className={`mt-2 text-xs font-semibold ${index <= currentStep ? 'text-white' : 'text-gray-500'}`}>{step.name}</div>
              </div>
              {index < steps.length - 1 && <div className={`flex-grow h-0.5 transition-colors duration-500 mx-2 ${index < currentStep ? 'bg-primary-500' : 'bg-neutral-700'}`}></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="min-h-[350px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2"><FormField id="propertyTitle" register={register} error={errors.propertyTitle} icon={Building} placeholder="Property Title" /></div>
                  <FormField id="location" register={register} error={errors.location} icon={MapPin} placeholder="City & State" />
                  <FormField id="price" register={register} error={errors.price} icon={DollarSign} type="number" placeholder="Price (USD)" />
                  <div className="md:col-span-2"><FormField id="propertyAddress" register={register} error={errors.propertyAddress} icon={MapPin} placeholder="Full Property Address" /></div>
                  <div className="md:col-span-2"><FormField id="description" register={register} error={errors.description} icon={Type} type="textarea" placeholder="Property Description (at least 20 characters)" rows={4} /></div>
                </div>
              )}
              {currentStep === 1 && ( <div className="space-y-6"> <FormField id="realtorName" register={register} error={errors.realtorName} icon={User} placeholder="Realtor Full Name" /> <FormField id="realtorContact" register={register} error={errors.realtorContact} icon={Phone} placeholder="Realtor Contact" /> </div> )}
              {currentStep === 2 && ( <div className="space-y-6"> <FormField id="youtubeLink" register={register} error={errors.youtubeLink} icon={Youtube} placeholder="YouTube Video Link (Optional)" /> <FileUploadZone name="propertyImages" control={control} error={errors.propertyImages} label="Property Images (up to 5)" accept="image/*" multiple /> <FileUploadZone name="propertyPDF" control={control} error={errors.propertyPDF} label="Property Information PDF (Optional)" accept=".pdf" /> </div> )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-700 flex justify-between">
          <button type="button" onClick={handleBack} disabled={currentStep === 0} className="flex items-center bg-neutral-700 py-2 px-4 rounded-md hover:bg-neutral-600 disabled:opacity-50 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back
          </button>
          {currentStep < steps.length - 1 ? (
            <button type="button" onClick={handleNext} className="flex items-center bg-primary-500 py-2 px-4 rounded-md hover:bg-primary-600">
              Next <ArrowRight size={16} className="ml-2" />
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting} className="flex items-center bg-secondary-500 py-2 px-4 rounded-md hover:bg-secondary-600 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin" /> : <CheckCircle size={16} className="mr-2" />}
              {isSubmitting ? 'Uploading...' : 'Finish & Upload'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadPropertyForm;

