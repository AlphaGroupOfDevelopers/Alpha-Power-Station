'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Eye, Download } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Link from 'next/link';

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string | null;
  division: string;
  program: string | null;
  yearOfStudy: string | null;
  status: string;
  resume: string | null;
  coverLetter: string | null;
  createdAt: string;
}

export default function ApplicationsPage() {
  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await api.get<Application[]>('/admin/applications');
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
        <h1 className="text-3xl font-bold text-gray-900">Student Applications</h1>
        <p className="text-gray-600 mt-2">
          Review and manage student applications
        </p>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {!applications || applications.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600">No applications yet</p>
            <p className="text-sm text-gray-500 mt-2">
              Applications will appear here when students apply
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Division
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">
                          {app.firstName} {app.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{app.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.university || '—'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 uppercase">
                      {app.division}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {app.program || '—'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          app.status === 'accepted'
                            ? 'bg-green-100 text-green-800'
                            : app.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : app.status === 'reviewed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDateTime(app.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/applications/${app.id}`}
                          title="View Details"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        {app.resume && (
                          <a
                            href={app.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Download Resume"
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        )}
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
      {applications && applications.length > 0 && (
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Total</div>
            <div className="text-2xl font-bold text-gray-900">
              {applications.length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {applications.filter((a) => a.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Reviewed</div>
            <div className="text-2xl font-bold text-blue-600">
              {applications.filter((a) => a.status === 'reviewed').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600">Accepted</div>
            <div className="text-2xl font-bold text-green-600">
              {applications.filter((a) => a.status === 'accepted').length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
