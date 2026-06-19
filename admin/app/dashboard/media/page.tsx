'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Upload, Trash2, Copy, Image as ImageIcon, File } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface MediaAsset {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnail: string | null;
  folder: string | null;
  createdAt: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function MediaPage() {
  const { data: assets, isLoading } = useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const response = await api.get<MediaAsset[]>('/admin/media');
      return response.data;
    },
  });

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    // TODO: Add toast notification
    alert('URL copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600 mt-2">
            Upload and manage images and files
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          <Upload className="h-5 w-5" />
          Upload Media
        </button>
      </div>

      {/* Media Grid */}
      {!assets || assets.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No media files yet</p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Upload className="h-5 w-5" />
            Upload Your First File
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition"
              >
                {/* Preview */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  {asset.mimeType.startsWith('image/') ? (
                    <img
                      src={asset.thumbnail || asset.url}
                      alt={asset.originalName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <File className="h-16 w-16 text-gray-400" />
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => copyToClipboard(asset.url)}
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition"
                      title="Copy URL"
                    >
                      <Copy className="h-4 w-4 text-gray-700" />
                    </button>
                    <button
                      className="p-2 bg-white rounded-lg hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="text-sm font-medium text-gray-900 truncate mb-1">
                    {asset.originalName}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatFileSize(asset.size)}</span>
                    <span className="uppercase">{asset.mimeType.split('/')[1]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Total Files</div>
              <div className="text-2xl font-bold text-gray-900">
                {assets.length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Images</div>
              <div className="text-2xl font-bold text-blue-600">
                {assets.filter((a) => a.mimeType.startsWith('image/')).length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm text-gray-600">Total Size</div>
              <div className="text-2xl font-bold text-gray-900">
                {formatFileSize(assets.reduce((sum, a) => sum + a.size, 0))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
