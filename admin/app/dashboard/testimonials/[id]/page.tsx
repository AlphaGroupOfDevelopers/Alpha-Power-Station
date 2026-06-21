'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/toast';
import { ArrowLeft, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TestimonialForm {
  name: string;
  role: string;
  division: 'AGD' | 'AGEE';
  content: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
}

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { toasts, removeToast, success, error: showError } = useToast();
  const isNew = params.id === 'new';
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<TestimonialForm>({
    defaultValues: {
      order: 0,
      isActive: true,
    },
  });

  const imageUrl = watch('imageUrl');

  const { data: testimonial, isLoading } = useQuery({
    queryKey: ['testimonial', params.id],
    queryFn: async () => {
      if (isNew) return null;
      const response = await api.get(`/admin/testimonials/${params.id}`);
      return response.data;
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (testimonial && !isNew) {
      reset(testimonial);
      if (testimonial.imageUrl) {
        setImagePreview(testimonial.imageUrl);
      }
    }
  }, [testimonial, isNew, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showError('Please select a valid image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        showError('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setValue('imageUrl', '');
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'testimonials');

    const response = await api.post('/admin/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.url;
  };

  const mutation = useMutation({
    mutationFn: async (data: TestimonialForm) => {
      let finalData = { ...data };

      // Upload image if a new file was selected
      if (imageFile) {
        setIsUploading(true);
        try {
          const uploadedUrl = await uploadImage(imageFile);
          finalData.imageUrl = uploadedUrl;
        } catch (err) {
          showError('Failed to upload image');
          throw err;
        } finally {
          setIsUploading(false);
        }
      }

      if (isNew) {
        return await api.post('/admin/testimonials', finalData);
      } else {
        return await api.put(`/admin/testimonials/${params.id}`, finalData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      success(isNew ? 'Testimonial added successfully!' : 'Testimonial updated successfully!');
      router.push('/dashboard/testimonials');
    },
    onError: (err: any) => {
      showError(err.response?.data?.message || 'Failed to save testimonial');
    },
  });

  const onSubmit = (data: TestimonialForm) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      <div className="p-8">
        <div className="mb-8">
          <Link
            href="/dashboard/testimonials"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Testimonials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isNew ? 'Add Testimonial' : 'Edit Testimonial'}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo (Optional)
              </label>
              
              {imagePreview || imageUrl ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview || imageUrl}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <ImageIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('role', { required: 'Role is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Software Engineering Intern"
                />
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Division <span className="text-red-500">*</span>
              </label>
              <select
                {...register('division', { required: 'Division is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select division</option>
                <option value="AGD">AGD</option>
                <option value="AGEE">AGEE</option>
              </select>
              {errors.division && (
                <p className="mt-1 text-sm text-red-600">{errors.division.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('content', { required: 'Testimonial content is required' })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write the testimonial text here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Write in first person as if the person is speaking
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Active (Show on website)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  {...register('order', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
                <p className="mt-1 text-sm text-gray-500">Lower numbers appear first</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 mt-6">
            <Link
              href="/dashboard/testimonials"
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={mutation.isPending || isUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {(mutation.isPending || isUploading) && <Loader2 className="h-4 w-4 animate-spin" />}
              {isUploading ? 'Uploading...' : isNew ? 'Add Testimonial' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
