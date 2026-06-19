# Phase 2: Complete Implementation Guide

## ✅ What's Been Completed

### Forms Created (3/3) ✅
1. **News Form** - `admin/app/dashboard/news/[id]/page.tsx`
   - All fields with validation
   - Tag handling (comma-separated)
   - Create/Edit functionality

2. **Team Form** - `admin/app/dashboard/team/[id]/page.tsx`
   - All fields with validation
   - Social links (GitHub, LinkedIn)
   - Display order

3. **Partners Form** - `admin/app/dashboard/partners/[id]/page.tsx`
   - All fields with validation
   - Logo and website URLs
   - Display order

### Delete Functionality (2/4) ✅
1. **Projects** - Delete with confirmation ✅
2. **News** - Delete with confirmation ✅
3. **Team** - Need to add
4. **Partners** - Need to add

---

## 🔄 Remaining Tasks

### 1. Add Delete to Team Page
Update `admin/app/dashboard/team/page.tsx`:

```typescript
// Add at top with imports
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/toast';
import { ConfirmDialog } from '@/components/confirm-dialog';

// Add state
const [deleteId, setDeleteId] = useState<string | null>(null);
const queryClient = useQueryClient();
const { toasts, removeToast, success, error: showError } = useToast();

// Add delete mutation
const deleteMutation = useMutation({
  mutationFn: async (id: string) => {
    await api.delete(`/admin/team/${id}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['team'] });
    success('Team member deleted successfully!');
    setDeleteId(null);
  },
  onError: () => {
    showError('Failed to delete team member');
    setDeleteId(null);
  },
});

// Add to JSX at top
<ToastContainer toasts={toasts} onRemove={removeToast} />
<ConfirmDialog
  isOpen={deleteId !== null}
  title="Delete Team Member"
  message="Are you sure? This cannot be undone."
  confirmLabel="Delete"
  onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
  onCancel={() => setDeleteId(null)}
  variant="danger"
/>

// Update delete button
<button
  onClick={() => setDeleteId(member.id)}
  title="Delete"
  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
>
  <Trash2 className="h-4 w-4" />
</button>
```

### 2. Add Delete to Partners Page
Same pattern as Team - copy from News/Projects

### 3. Create Filter Component
File: `admin/components/filter.tsx`

```typescript
'use client';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export function Filter({ label, options, value, onChange }: FilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### 4. Create Search Component
File: `admin/components/search.tsx`

```typescript
'use client';

import { Search as SearchIcon, X } from 'lucide-react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Search({ value, onChange, placeholder = 'Search...' }: SearchProps) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
```

### 5. Add Filters to Projects Page
```typescript
import { useState } from 'react';
import { Filter } from '@/components/filter';
import { Search } from '@/components/search';

// Add state
const [searchTerm, setSearchTerm] = useState('');
const [categoryFilter, setCategoryFilter] = useState('');
const [divisionFilter, setDivisionFilter] = useState('');

// Filter data
const filteredProjects = projects?.filter((project) => {
  const matchesSearch = !searchTerm || 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase());
  
  const matchesCategory = !categoryFilter || project.category === categoryFilter;
  const matchesDivision = !divisionFilter || project.division === divisionFilter;
  
  return matchesSearch && matchesCategory && matchesDivision;
});

// Add filters UI before table
<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="md:col-span-2">
      <Search
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search projects..."
      />
    </div>
    <Filter
      label="Category"
      options={[
        { label: 'Foundational', value: 'foundational' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Infrastructure', value: 'infrastructure' },
      ]}
      value={categoryFilter}
      onChange={setCategoryFilter}
    />
    <Filter
      label="Division"
      options={[
        { label: 'AGD', value: 'AGD' },
        { label: 'AGEE', value: 'AGEE' },
        { label: 'Integrated', value: 'integrated' },
      ]}
      value={divisionFilter}
      onChange={setDivisionFilter}
    />
  </div>
</div>

// Use filteredProjects in table instead of projects
```

### 6. Media Upload Interface
File: `admin/app/dashboard/media/upload/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/toast';
import { Upload, X, File, Image as ImageIcon, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function UploadMediaPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toasts, removeToast, success, error: showError } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [folder, setFolder] = useState('general');
  const [isDragging, setIsDragging] = useState(false);

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('folder', folder);

      if (files.length === 1) {
        return await api.post('/admin/media/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        return await api.post('/admin/media/upload-multiple', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      success(`${files.length} file(s) uploaded successfully!`);
      router.push('/dashboard/media');
    },
    onError: () => {
      showError('Failed to upload files');
    },
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length > 0) {
      uploadMutation.mutate();
    }
  };

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      
      <div className="p-8">
        <div className="mb-8">
          <Link
            href="/dashboard/media"
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            ← Back to Media
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Upload Media
          </h1>
        </div>

        <div className="max-w-2xl">
          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
              isDragging
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports images, PDFs, and documents
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
              accept="image/*,.pdf,.doc,.docx"
            />
            <label
              htmlFor="file-input"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              Select Files
            </label>
          </div>

          {/* Folder Selection */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Folder
            </label>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="general">General</option>
              <option value="projects">Projects</option>
              <option value="team">Team</option>
              <option value="news">News</option>
            </select>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              <h3 className="font-medium text-gray-900">
                Selected Files ({files.length})
              </h3>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  {file.type.startsWith('image/') ? (
                    <ImageIcon className="h-5 w-5 text-blue-500" />
                  ) : (
                    <File className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="flex-1 text-sm truncate">{file.name}</span>
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Button */}
          <div className="mt-6 flex items-center justify-end gap-4">
            <Link
              href="/dashboard/media"
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              onClick={handleUpload}
              disabled={files.length === 0 || uploadMutation.isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {uploadMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              Upload {files.length > 0 && `(${files.length})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
```

### 7. Update Media Page - Add Upload Button
```typescript
// Change button to Link
<Link
  href="/dashboard/media/upload"
  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
>
  <Upload className="h-5 w-5" />
  Upload Media
</Link>
```

---

## 📋 Quick Checklist

### Forms ✅
- [x] Projects form
- [x] News form
- [x] Team form
- [x] Partners form

### Delete Functionality
- [x] Projects delete
- [x] News delete
- [ ] Team delete (copy from News)
- [ ] Partners delete (copy from News)

### Advanced Features
- [ ] Filter component
- [ ] Search component
- [ ] Add filters to Projects
- [ ] Add filters to News
- [ ] Add filters to Team
- [ ] Add filters to Partners
- [ ] Media upload page
- [ ] Update media page button

---

## 🚀 Testing Guide

### Test Each Form:
1. Navigate to entity list page
2. Click "New" button
3. Fill all required fields
4. Submit form
5. Should see success toast
6. Should redirect to list
7. Should see new item in list
8. Click edit on item
9. Modify fields
10. Save
11. Should see success toast
12. Changes should be visible

### Test Delete:
1. Click delete on any item
2. Confirm dialog should appear
3. Click "Delete"
4. Should see success toast
5. Item should be removed from list

### Test Filters (after implementing):
1. Add some test data with different categories
2. Select a filter
3. Table should show only matching items
4. Clear filter
5. All items should reappear

### Test Search (after implementing):
1. Type in search box
2. Results should filter in real-time
3. Clear search
4. All items should reappear

---

## 💡 Pro Tips

1. **Reuse Components** - Toast, Confirm, Filter, Search are all reusable
2. **Copy Patterns** - Projects/News are complete examples
3. **Test Incrementally** - Test each feature as you build it
4. **Use TypeScript** - Interfaces catch errors early
5. **Handle Errors** - Always show user feedback
6. **Loading States** - Disable buttons during operations
7. **Validate Forms** - Use React Hook Form validation
8. **Auto-redirect** - Navigate after successful operations

---

## ✨ What's Working Now

### Full CRUD:
- ✅ Projects (Create, Read, Update, Delete)
- ✅ News (Create, Read, Update, Delete)
- ✅ Team (Create, Read, Update) - Need Delete
- ✅ Partners (Create, Read, Update) - Need Delete

### Components:
- ✅ Toast notifications
- ✅ Confirm dialogs
- ✅ Modal
- ✅ Form validation
- ✅ Loading states

---

## 📦 Files to Create

Still need:
- [ ] `admin/components/filter.tsx`
- [ ] `admin/components/search.tsx`
- [ ] `admin/app/dashboard/media/upload/page.tsx`

---

**Status:** ~80% Complete  
**Remaining:** Delete for Team/Partners, Filters, Search, Media Upload  
**Next Step:** Copy delete pattern to Team/Partners, then add Filter/Search components
