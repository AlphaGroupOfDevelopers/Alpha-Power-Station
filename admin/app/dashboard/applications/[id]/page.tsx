'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { ToastContainer } from '@/components/toast';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { formatDateTime } from '@/lib/utils';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Application {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string | null;
  program: string | null;
  yearOfStudy: string | null;
  expectedGraduation: string | null;
  division: string;
  primaryInterest: string | null;
  secondaryInterest: string | null;
  relevantCourses: string | null;
  projects: string | null;
  githubUrl: string | null;
  portfolioUrl: string | null;
  whyApply: string | null;
  whatContribute: string | null;
  availability: string | null;
  resume: string | null;
  coverLetter: string | null;
  status: string;
  reviewNotes: string | null;
  reviewedAt: string | null;
  createdAt: string;
}

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-gray-900">{value || '—'}</div>
    </div>
  );
}

export default function ApplicationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { toasts, removeToast, success, error: showError } = useToast();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [status, setStatus] = useState('pending');
  const [reviewNotes, setReviewNotes] = useState('');

  const { data: application, isLoading } = useQuery({
    queryKey: ['application', params.id],
    queryFn: async () => {
      const response = await api.get<Application>(`/admin/applications/${params.id}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (application) {
      setStatus(application.status);
      setReviewNotes(application.reviewNotes || '');
    }
  }, [application]);

  const statusMutation = useMutation({
    mutationFn: async () => {
      await api.patch(`/admin/applications/${params.id}/status`, { status, reviewNotes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['application', params.id] });
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      success('Application status updated!');
    },
    onError: () => {
      showError('Failed to update application status');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/admin/applications/${params.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      success('Application deleted');
      router.push('/dashboard/applications');
    },
    onError: () => {
      showError('Failed to delete application');
      setShowDeleteConfirm(false);
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

  if (!application) {
    return (
      <div className="p-8">
        <p className="text-gray-600">Application not found.</p>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Application"
        message="Are you sure you want to delete this application? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={() => deleteMutation.mutate()}
        onCancel={() => setShowDeleteConfirm(false)}
        variant="danger"
      />

      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/dashboard/applications"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Applications
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {application.firstName} {application.lastName}
            </h1>
            <p className="text-gray-600 mt-1">
              Applied {formatDateTime(application.createdAt)}
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" value={application.email} />
                <Field label="Phone" value={application.phone} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Academic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="University" value={application.university} />
                <Field label="Program" value={application.program} />
                <Field label="Year of Study" value={application.yearOfStudy} />
                <Field label="Expected Graduation" value={application.expectedGraduation} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Division & Interests</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Division" value={application.division} />
                <Field label="Primary Interest" value={application.primaryInterest} />
                <Field label="Secondary Interest" value={application.secondaryInterest} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Experience & Portfolio</h2>
              <Field label="Relevant Courses" value={application.relevantCourses} />
              <Field label="Previous Projects" value={application.projects} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="GitHub" value={application.githubUrl} />
                <Field label="Portfolio" value={application.portfolioUrl} />
              </div>
              <div className="flex gap-4 pt-2">
                {application.resume && (
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    Download Resume
                  </a>
                )}
                {application.coverLetter && (
                  <a
                    href={application.coverLetter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                  >
                    <Download className="h-4 w-4" />
                    Download Cover Letter
                  </a>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Motivation & Availability</h2>
              <Field label="Why Apply" value={application.whyApply} />
              <Field label="What They Can Contribute" value={application.whatContribute} />
              <Field label="Availability" value={application.availability ? `${application.availability} hours/week` : null} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Review</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={5}
                  placeholder="Internal notes about this applicant..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {application.reviewedAt && (
                <p className="text-sm text-gray-500">
                  Last reviewed {formatDateTime(application.reviewedAt)}
                </p>
              )}

              <button
                onClick={() => statusMutation.mutate()}
                disabled={statusMutation.isPending}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {statusMutation.isPending ? 'Saving...' : 'Save Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
