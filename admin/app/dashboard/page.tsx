'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import {
  FolderKanban,
  Newspaper,
  Users,
  FileText,
  Mail,
  TrendingUp,
} from 'lucide-react';

interface DashboardStats {
  projects: number;
  news: number;
  team: number;
  applications: number;
  inquiries: number;
  partners: number;
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      try {
        // Fetch stats from multiple endpoints
        const results = await Promise.allSettled([
          api.get('/admin/projects'),
          api.get('/admin/news'),
          api.get('/admin/team'),
          api.get('/admin/applications'),
          api.get('/admin/inquiries'),
        ]);

        return {
          projects: results[0].status === 'fulfilled' ? results[0].value.data.length || 0 : 0,
          news: results[1].status === 'fulfilled' ? results[1].value.data.length || 0 : 0,
          team: results[2].status === 'fulfilled' ? results[2].value.data.length || 0 : 0,
          applications: results[3].status === 'fulfilled' ? results[3].value.data.length || 0 : 0,
          inquiries: results[4].status === 'fulfilled' ? results[4].value.data.filter((i: any) => i.status === 'new').length || 0 : 0,
          partners: 0,
        } as DashboardStats;
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        return {
          projects: 0,
          news: 0,
          team: 0,
          applications: 0,
          inquiries: 0,
          partners: 0,
        } as DashboardStats;
      }
    },
  });

  const statCards = [
    {
      title: 'Projects',
      value: stats?.projects || 0,
      icon: FolderKanban,
      color: 'bg-blue-500',
      href: '/dashboard/projects',
    },
    {
      title: 'News Posts',
      value: stats?.news || 0,
      icon: Newspaper,
      color: 'bg-purple-500',
      href: '/dashboard/news',
    },
    {
      title: 'Team Members',
      value: stats?.team || 0,
      icon: Users,
      color: 'bg-green-500',
      href: '/dashboard/team',
    },
    {
      title: 'Applications',
      value: stats?.applications || 0,
      icon: FileText,
      color: 'bg-orange-500',
      href: '/dashboard/applications',
    },
    {
      title: 'New Inquiries',
      value: stats?.inquiries || 0,
      icon: Mail,
      color: 'bg-red-500',
      href: '/dashboard/inquiries',
    },
    {
      title: 'Partners',
      value: stats?.partners || 0,
      icon: TrendingUp,
      color: 'bg-indigo-500',
      href: '/dashboard/partners',
    },
  ];

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.title}
              href={card.href}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/dashboard/projects/new"
            className="px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-center font-medium"
          >
            New Project
          </a>
          <a
            href="/dashboard/news/new"
            className="px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-center font-medium"
          >
            New Article
          </a>
          <a
            href="/dashboard/team/new"
            className="px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-center font-medium"
          >
            Add Team Member
          </a>
          <a
            href="/dashboard/media"
            className="px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition text-center font-medium"
          >
            Upload Media
          </a>
        </div>
      </div>
    </div>
  );
}
