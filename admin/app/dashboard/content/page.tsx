'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/toast';

interface SiteContent {
  id: string;
  key: string;
  value: string;
  type: 'text' | 'textarea' | 'html' | 'json' | 'image';
  section: string;
  createdAt: string;
  updatedAt: string;
}

export default function SiteContentPage() {
  const queryClient = useQueryClient();
  const { toasts, removeToast, success, error: showError } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [newContent, setNewContent] = useState<{
    key: string;
    value: string;
    type: 'text' | 'textarea' | 'html' | 'json' | 'image';
    section: string;
  }>({
    key: '',
    value: '',
    type: 'text',
    section: 'homepage',
  });

  const { data: contents, isLoading } = useQuery({
    queryKey: ['site-content'],
    queryFn: async () => {
      const response = await api.get<SiteContent[]>('/admin/site-content');
      return response.data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      return await api.put(`/admin/site-content/${id}`, { value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      success('Content updated successfully!');
      setEditingId(null);
    },
    onError: () => {
      showError('Failed to update content');
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof newContent) => {
      return await api.post('/admin/site-content', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      success('Content created successfully!');
      setIsCreating(false);
      setNewContent({ key: '', value: '', type: 'text', section: 'homepage' });
    },
    onError: () => {
      showError('Failed to create content');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await api.delete(`/admin/site-content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      success('Content deleted successfully!');
    },
    onError: () => {
      showError('Failed to delete content');
    },
  });

  const seedTeamMutation = useMutation({
    mutationFn: async () => {
      return await api.post('/admin/seed/team');
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      success(`Seeded ${response.data.created} items! (${response.data.skipped} already existed)`);
      setIsSeeding(false);
    },
    onError: (err: any) => {
      showError(err.response?.data?.error || 'Failed to seed content');
      setIsSeeding(false);
    },
  });

  const handleEdit = (content: SiteContent) => {
    setEditingId(content.id);
    setEditValue(content.value);
  };

  const handleSave = (id: string) => {
    updateMutation.mutate({ id, value: editValue });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleCreate = () => {
    if (!newContent.key || !newContent.value) {
      showError('Key and value are required');
      return;
    }
    createMutation.mutate(newContent);
  };

  const groupedContents = contents?.reduce((acc, content) => {
    if (!acc[content.section]) {
      acc[content.section] = [];
    }
    acc[content.section].push(content);
    return acc;
  }, {} as Record<string, SiteContent[]>);

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
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Site Content</h1>
            <p className="text-gray-600 mt-2">
              Manage website content (homepage, about page, etc.)
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                if (confirm('Seed team page content? This will add 31 items (skip existing).')) {
                  setIsSeeding(true);
                  seedTeamMutation.mutate();
                }
              }}
              disabled={isSeeding}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSeeding ? '⏳ Seeding...' : '🌱 Seed Team Content'}
            </button>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5" />
              Add Content
            </button>
          </div>
        </div>

        {/* Create Form */}
        {isCreating && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Create New Content</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key (unique identifier)
                </label>
                <input
                  type="text"
                  value={newContent.key}
                  onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., hero_title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section
                </label>
                <select
                  value={newContent.section}
                  onChange={(e) => setNewContent({ ...newContent, section: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="homepage">Homepage</option>
                  <option value="about">About</option>
                  <option value="hero">Hero/Banner</option>
                  <option value="values">Values</option>
                  <option value="contact">Contact</option>
                  <option value="footer">Footer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newContent.type}
                  onChange={(e) => setNewContent({ ...newContent, type: e.target.value as 'text' | 'textarea' | 'html' | 'json' | 'image' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Long Text</option>
                  <option value="html">HTML</option>
                  <option value="json">JSON</option>
                  <option value="image">Image URL</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Value
              </label>
              {(newContent.type === 'textarea' || newContent.type === 'html') ? (
                <textarea
                  value={newContent.value}
                  onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              ) : (
                <input
                  type="text"
                  value={newContent.value}
                  onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={createMutation.isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                Create
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Content by Section */}
        {groupedContents && Object.keys(groupedContents).map((section) => (
          <div key={section} className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 capitalize">
              {section}
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Key
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {groupedContents[section].map((content) => (
                      <tr key={content.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {content.key}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {editingId === content.id ? (
                            content.type === 'textarea' || content.type === 'html' ? (
                              <textarea
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                              />
                            ) : (
                              <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded"
                              />
                            )
                          ) : (
                            <div className="max-w-md truncate">{content.value}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                            {content.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {editingId === content.id ? (
                              <>
                                <button
                                  onClick={() => handleSave(content.id)}
                                  disabled={updateMutation.isPending}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                                  title="Save"
                                >
                                  <Save className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="p-2 text-gray-600 hover:bg-gray-50 rounded transition"
                                  title="Cancel"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(content)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm('Are you sure you want to delete this content?')) {
                                      deleteMutation.mutate(content.id);
                                    }
                                  }}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

        {(!contents || contents.length === 0) && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No content yet</p>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5" />
              Add Your First Content
            </button>
          </div>
        )}
      </div>
    </>
  );
}
