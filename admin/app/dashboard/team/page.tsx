'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Edit, Trash2, Mail, Globe } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  email: string | null;
  bio: string | null;
  imageUrl: string | null;
  featured: boolean;
  github: string | null;
  linkedin: string | null;
  createdAt: string;
}

export default function TeamPage() {
  const { data: members, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await api.get<TeamMember[]>('/admin/team');
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-2">
            Manage team member profiles
          </p>
        </div>
        <Link
          href="/dashboard/team/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
          Add Member
        </Link>
      </div>

      {/* Team Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {!members || members.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 mb-4">No team members yet</p>
            <Link
              href="/dashboard/team/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5" />
              Add Your First Team Member
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Division
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
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
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {member.imageUrl ? (
                          <img
                            src={member.imageUrl}
                            alt={member.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {member.name}
                          </div>
                          {member.featured && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 uppercase">
                      {member.division}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="text-gray-400 hover:text-blue-600 transition"
                            title={member.email}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition"
                            title="GitHub"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition"
                            title="LinkedIn"
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        {!member.email && !member.github && !member.linkedin && (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDateTime(member.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/team/${member.id}`}
                          title="Edit"
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
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
    </div>
  );
}
