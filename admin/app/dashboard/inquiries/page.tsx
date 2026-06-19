'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Eye, Mail, Trash2 } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
  status: string;
  createdAt: string;
  respondedAt: string | null;
}

export default function InquiriesPage() {
  const { data: inquiries, isLoading } = useQuery({
    queryKey: ['inquiries'],
    queryFn: async () => {
      const response = await api.get<Inquiry[]>('/admin/inquiries');
      return response.data;
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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>
        <p className="text-gray-600 mt-2">
          View and respond to contact form submissions
        </p>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {!inquiries || inquiries.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">No inquiries yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Contact form submissions will appear here
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Received
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className={`hover:bg-gray-50 ${
                      inquiry.status === 'new' ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {inquiry.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {inquiry.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {inquiry.subject}
                      </div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {inquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                      {inquiry.type}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          inquiry.status === 'responded'
                            ? 'bg-green-100 text-green-800'
                            : inquiry.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {inquiry.status === 'new' ? 'New' : inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDateTime(inquiry.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          title="View Details"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <a
                          href={`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`}
                          title="Reply via Email"
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition"
                        >
                          <Mail className="h-4 w-4" />
                        </a>
                        <button
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

      {/* Stats Summary */}
      {inquiries && inquiries.length > 0 && (
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">
              {inquiries.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">New</div>
            <div className="text-2xl font-bold text-yellow-600">
              {inquiries.filter((i) => i.status === 'new').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">In Progress</div>
            <div className="text-2xl font-bold text-blue-600">
              {inquiries.filter((i) => i.status === 'in-progress').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Responded</div>
            <div className="text-2xl font-bold text-green-600">
              {inquiries.filter((i) => i.status === 'responded').length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
