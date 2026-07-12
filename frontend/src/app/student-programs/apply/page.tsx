'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const DRAFT_STORAGE_KEY = 'aps-apply-draft';

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-1 text-sm border-b border-gray-100 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium text-right">{value || '— not provided —'}</span>
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Academic Info
    university: '',
    program: '',
    yearOfStudy: '',
    expectedGraduation: '',
    
    // Step 3: Division Selection
    division: '',
    primaryInterest: '',
    secondaryInterest: '',
    
    // Step 4: Experience
    relevantCourses: '',
    projects: '',
    githubUrl: '',
    portfolioUrl: '',
    
    // Step 5: Motivation
    whyApply: '',
    whatContribute: '',
    availability: '',
  });

  const totalSteps = 6;

  const YEAR_OF_STUDY_LABELS: Record<string, string> = {
    '1': 'Year 1',
    '2': 'Year 2',
    '3': 'Year 3',
    '4': 'Year 4',
    graduate: 'Recent Graduate',
  };

  const DIVISION_LABELS: Record<string, string> = {
    AGD: 'AGD - Alpha Group of Developers',
    AGEE: 'AGEE - Alpha Group of Electronics & Electricals',
  };

  const INTEREST_LABELS: Record<string, string> = {
    embedded: 'Embedded Systems',
    iot: 'IoT & Connectivity',
    web: 'Web Development',
    mobile: 'Mobile Development',
    protocols: 'Protocol Implementation',
    power: 'Power Electronics',
    pcb: 'PCB Design',
    renewable: 'Renewable Energy',
    ewaste: 'E-Waste Upcycling',
  };

  const AVAILABILITY_LABELS: Record<string, string> = {
    '20': '20 hours/week (Part-time)',
    '30': '30 hours/week',
    '40': '40 hours/week (Full-time)',
  };

  // Restore an in-progress draft (e.g. after an accidental refresh) once on mount.
  // Resume/cover-letter File objects can never survive a reload, so the restored
  // step is capped at the file-upload step (4) rather than wherever the user left
  // off — otherwise they'd land past it with no file attached and no visible way
  // to notice, since the file input only renders on step 4.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formData) setFormData(parsed.formData);
        if (parsed.currentStep) setCurrentStep(Math.min(parsed.currentStep, 4));
      }
    } catch {
      // ignore corrupt/unavailable storage
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ formData, currentStep })
      );
    } catch {
      // ignore unavailable storage (e.g. private browsing quota)
    }
  }, [formData, currentStep]);

  // Recent graduates don't have a future graduation date to give.
  useEffect(() => {
    if (formData.yearOfStudy === 'graduate' && formData.expectedGraduation) {
      setFormData((prev) => ({ ...prev, expectedGraduation: '' }));
    }
  }, [formData.yearOfStudy]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) => {
    setter(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!resumeFile) {
      setSubmitStatus('error');
      setSubmitError('Please upload your resume/CV before submitting.');
      setCurrentStep(4);
      return;
    }

    setSubmitStatus('submitting');
    setSubmitError('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

      const submission = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submission.append(key, value);
      });
      submission.append('resume', resumeFile);
      if (coverLetterFile) {
        submission.append('coverLetter', coverLetterFile);
      }

      const response = await fetch(`${API_URL}/students/apply`, {
        method: 'POST',
        body: submission,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      setSubmitStatus('success');
      try {
        sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore unavailable storage
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setSubmitError(error.message || 'Failed to submit application. Please try again.');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-3xl font-bold mb-4 text-green-700">Application Submitted!</h1>
              <p className="text-gray-600 mb-8">
                Thank you for applying to Alpha Power Station. Our team will review your
                application and reach out to you directly.
              </p>
              <Link
                href="/student-programs"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                Back to Student Programs
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <Link href="/student-programs" className="text-blue-600 hover:underline mb-4 inline-block">
              ← Back to Student Programs
            </Link>
            <h1 className="text-4xl font-bold mb-2">Application Portal</h1>
            <p className="text-gray-600">Join Alpha Power Station</p>
          </div>

          {/* Org context blurb */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold mb-2">What is Alpha Power Station?</h2>
            <p className="text-gray-700 text-sm">
              Alpha Power Station is a student innovation program built around two divisions:
              AGD (Alpha Group of Developers), focused on software and embedded systems, and
              AGEE (Alpha Group of Electronics & Electricals), focused on power systems and
              hardware engineering. Members get hands-on project experience and mentorship in
              their chosen division.
            </p>
            <Link href="/about" className="inline-block mt-3 text-sm font-semibold text-blue-600 hover:underline">
              Learn more about us →
            </Link>
          </div>

          {submitStatus === 'error' && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
              {submitError}
            </div>
          )}

          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div key={step} className="flex-1">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        step <= currentStep
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                    {step < totalSteps && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          First Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Last Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+233..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Academic Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        University/Institution <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Program/Major <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Computer Engineering, Electrical Engineering"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Year of Study <span className="text-red-600">*</span>
                        </label>
                        <select
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        >
                          <option value="">Select...</option>
                          <option value="1">Year 1</option>
                          <option value="2">Year 2</option>
                          <option value="3">Year 3</option>
                          <option value="4">Year 4</option>
                          <option value="graduate">Recent Graduate</option>
                        </select>
                      </div>
                      {formData.yearOfStudy !== 'graduate' && (
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Expected Graduation
                          </label>
                          <input
                            type="month"
                            name="expectedGraduation"
                            value={formData.expectedGraduation}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Division Selection */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Division Selection</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3">
                        Which division are you applying to? <span className="text-red-600">*</span>
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-blue-600 transition">
                          <input
                            type="radio"
                            name="division"
                            value="AGD"
                            checked={formData.division === 'AGD'}
                            onChange={handleInputChange}
                            required
                            className="mt-1 mr-3"
                          />
                          <div>
                            <div className="font-bold">AGD - Alpha Group of Developers</div>
                            <div className="text-sm text-gray-600">
                              Software Development & Embedded Systems
                            </div>
                          </div>
                        </label>
                        <label className="flex items-start p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-green-600 transition">
                          <input
                            type="radio"
                            name="division"
                            value="AGEE"
                            checked={formData.division === 'AGEE'}
                            onChange={handleInputChange}
                            required
                            className="mt-1 mr-3"
                          />
                          <div>
                            <div className="font-bold">AGEE - Alpha Group of Electronics & Electricals</div>
                            <div className="text-sm text-gray-600">
                              Hardware Engineering & Power Systems
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Primary Area of Interest <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="primaryInterest"
                        value={formData.primaryInterest}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.division}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">
                          {!formData.division ? 'Please select a division first' : 'Select...'}
                        </option>
                        {formData.division === 'AGD' && (
                          <>
                            <option value="embedded">Embedded Systems</option>
                            <option value="iot">IoT & Connectivity</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile Development</option>
                            <option value="protocols">Protocol Implementation</option>
                          </>
                        )}
                        {formData.division === 'AGEE' && (
                          <>
                            <option value="power">Power Electronics</option>
                            <option value="pcb">PCB Design</option>
                            <option value="renewable">Renewable Energy</option>
                            <option value="ewaste">E-Waste Upcycling</option>
                          </>
                        )}
                      </select>
                      {!formData.division && (
                        <p className="text-sm text-gray-500 mt-1">
                          Select a division above to see available interests
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Secondary Area of Interest
                      </label>
                      <input
                        type="text"
                        name="secondaryInterest"
                        value={formData.secondaryInterest}
                        onChange={handleInputChange}
                        placeholder="Optional"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Experience & Portfolio */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Experience & Portfolio</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Relevant Courses
                      </label>
                      <textarea
                        name="relevantCourses"
                        value={formData.relevantCourses}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="List relevant courses you've taken..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Previous Projects <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="projects"
                        value={formData.projects}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        placeholder="Describe any relevant projects you've worked on..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        GitHub Profile
                      </label>
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        placeholder="https://github.com/yourusername"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Portfolio/Website
                      </label>
                      <input
                        type="url"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        placeholder="https://yourportfolio.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Resume/CV <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, setResumeFile)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      {resumeFile && (
                        <p className="mt-1 text-sm text-gray-600">Selected: {resumeFile.name}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">PDF, DOC, or DOCX up to 10MB</p>
                      <p className="mt-1 text-sm text-gray-500">
                        If you refreshed this page, please reattach your resume — file selections
                        aren&apos;t saved automatically.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Cover Letter
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e, setCoverLetterFile)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                      {coverLetterFile && (
                        <p className="mt-1 text-sm text-gray-600">Selected: {coverLetterFile.name}</p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">Optional — PDF, DOC, or DOCX up to 10MB</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Motivation & Availability */}
              {currentStep === 5 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Motivation & Availability</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Why do you want to join Alpha Power Station? <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="whyApply"
                        value={formData.whyApply}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        placeholder="Tell us what excites you about this opportunity..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        What can you contribute to our team? <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="whatContribute"
                        value={formData.whatContribute}
                        onChange={handleInputChange}
                        rows={4}
                        required
                        placeholder="Share your unique skills and perspective..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Availability <span className="text-red-600">*</span>
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="">Select...</option>
                        <option value="20">20 hours/week (Part-time)</option>
                        <option value="30">30 hours/week</option>
                        <option value="40">40 hours/week (Full-time)</option>
                      </select>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
                      <p className="text-gray-700">
                        Almost there — clicking "Next" will show you a full review of your
                        application before it's submitted.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review & Submit */}
              {currentStep === 6 && (
                <div>
                  <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                  <p className="text-gray-600 mb-6">
                    Please check everything below before submitting. Use "Edit" to jump back to
                    any section.
                  </p>
                  <div className="space-y-4">
                    <ReviewSection title="Personal Information" onEdit={() => setCurrentStep(1)}>
                      <ReviewRow label="Name" value={`${formData.firstName} ${formData.lastName}`.trim()} />
                      <ReviewRow label="Email" value={formData.email} />
                      <ReviewRow label="Phone" value={formData.phone} />
                    </ReviewSection>

                    <ReviewSection title="Academic Information" onEdit={() => setCurrentStep(2)}>
                      <ReviewRow label="University" value={formData.university} />
                      <ReviewRow label="Program" value={formData.program} />
                      <ReviewRow
                        label="Year of Study"
                        value={YEAR_OF_STUDY_LABELS[formData.yearOfStudy] || formData.yearOfStudy}
                      />
                      {formData.yearOfStudy !== 'graduate' && (
                        <ReviewRow label="Expected Graduation" value={formData.expectedGraduation} />
                      )}
                    </ReviewSection>

                    <ReviewSection title="Division & Interests" onEdit={() => setCurrentStep(3)}>
                      <ReviewRow
                        label="Division"
                        value={DIVISION_LABELS[formData.division] || formData.division}
                      />
                      <ReviewRow
                        label="Primary Interest"
                        value={INTEREST_LABELS[formData.primaryInterest] || formData.primaryInterest}
                      />
                      <ReviewRow label="Secondary Interest" value={formData.secondaryInterest} />
                    </ReviewSection>

                    <ReviewSection title="Experience & Portfolio" onEdit={() => setCurrentStep(4)}>
                      <ReviewRow label="Relevant Courses" value={formData.relevantCourses} />
                      <ReviewRow label="Previous Projects" value={formData.projects} />
                      <ReviewRow label="GitHub Profile" value={formData.githubUrl} />
                      <ReviewRow label="Portfolio/Website" value={formData.portfolioUrl} />
                      {resumeFile ? (
                        <ReviewRow label="Resume/CV" value={resumeFile.name} />
                      ) : (
                        <div className="flex justify-between gap-4 py-1 text-sm">
                          <span className="text-red-600 font-medium">
                            No resume attached — required
                          </span>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(4)}
                            className="text-blue-600 hover:underline"
                          >
                            Attach now
                          </button>
                        </div>
                      )}
                      <ReviewRow
                        label="Cover Letter"
                        value={coverLetterFile ? coverLetterFile.name : ''}
                      />
                    </ReviewSection>

                    <ReviewSection title="Motivation & Availability" onEdit={() => setCurrentStep(5)}>
                      <ReviewRow label="Why Apply" value={formData.whyApply} />
                      <ReviewRow label="What You'll Contribute" value={formData.whatContribute} />
                      <ReviewRow
                        label="Availability"
                        value={AVAILABILITY_LABELS[formData.availability] || formData.availability}
                      />
                    </ReviewSection>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    currentStep === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  ← Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    key="next-button"
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    key="submit-button"
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                  </button>
                )}
              </div>
              {submitStatus === 'submitting' && (
                <p className="mt-4 text-center text-sm text-gray-500">
                  This can take up to a minute if the server has been idle — please don&apos;t
                  refresh or close this page.
                </p>
              )}
            </div>
          </form>

          {/* Help Text */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              Need help? Contact us at{' '}
              <a href="mailto:applications@alphapowerstation.org" className="text-blue-600 hover:underline">
                applications@alphapowerstation.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
