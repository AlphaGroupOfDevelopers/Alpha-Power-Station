'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/toast';
import { ConfirmDialog } from '@/components/confirm-dialog';

interface Partner {
  id: string;
  name: string;
  description: string | null;
  logoUrl: string | null;
  website: string | null;
  category: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

export default function PartnersPage() {
  const queryClient = useQueryClient();
  const { toasts, removeToast, success, error: showError } = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: partners, isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const response = await api.get<Partner[]>('/admin/partners');
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/admin/partners/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      success('Partner deleted successfully!');
      setDeleteId(null);
    },
    onError: () => {
      showError('Failed to delete partner');
      setDeleteId(null);
    },
  });

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
      <ConfirmDialog
        isOpen={deleteId !== null}
        title="Delete Partner"
        message="Are you sure you want to delete this partner? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
        variant="danger"
      />

      <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-600 mt-2">
            Manage partner organizations
          </p>
        </div>
        <Link
          href="/dashboard/partners/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
          Add Partner
        </Link>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {!partners || partners.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 mb-4">No partners yet</p>
            <Link
              href="/dashboard/partners/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5" />
              Add Your First Partner
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Partner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {partner.logoUrl ? (
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="h-10 w-10 rounded object-contain bg-gray-50"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium text-sm">
                              {partner.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {partner.name}
                          </div>
                          {partner.description && (
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {partner.description}
                            </div>
                          )}
                          {partner.featured && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {partner.category}
                    </td>
                    <td className="px-6 py-4">
                      {partner.website ? (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          Visit
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {partner.order}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDateTime(partner.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/partners/${partner.id}`}
                          title="Edit"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(partner.id)}
                          title="Delete"
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
