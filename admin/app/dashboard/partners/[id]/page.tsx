'use client';

import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

interface PartnerForm {
  name: string;
  description?: string;
  category: string;
  logoUrl?: string;
  website?: string;
  featured: boolean;
  order: number;
}

export default function EditPartnerPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { toasts, removeToast, success, error: showError } = useToast();
  const isNew = params.id === 'new';

  const { register, handleSubmit, formState: { errors }, reset } = useForm<PartnerForm>({
    defaultValues: {
      order: 0,
      featured: false,
    },
  });

  const { data: partner, isLoading } = useQuery({
    queryKey: ['partner', params.id],
    queryFn: async () => {
      if (isNew) return null;
      const response = await api.get(`/admin/partners/${params.id}`);
      return response.data;
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (partner && !isNew) {
      reset(partner);
    }
  }, [partner, isNew, reset]);

  const mutation = useMutation({
    mutationFn: async (data: PartnerForm) => {
      if (isNew) {
        return await api.post('/admin/partners', data);
      } else {
        return await api.put(`/admin/partners/${params.id}`, data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      success(isNew ? 'Partner added successfully!' : 'Partner updated successfully!');
      router.push('/dashboard/partners');
    },
    onError: (err: any) => {
      showError(err.response?.data?.message || 'Failed to save partner');
    },
  });

  const onSubmit = (data: PartnerForm) => {
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
            href="/dashboard/partners"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Partners
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {isNew ? 'Add Partner' : 'Edit Partner'}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Partner name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('category', { required: 'Category is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Technology, Education"
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of the partnership"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                {...register('logoUrl')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                {...register('website')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://partner-website.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('featured')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="text-sm font-medium text-gray-700">
                  Featured Partner
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
              href="/dashboard/partners"
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isNew ? 'Add Partner' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
