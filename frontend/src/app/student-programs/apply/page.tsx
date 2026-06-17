'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
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

  const totalSteps = 5;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
      
      const response = await fetch(`${API_URL}/students/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      const data = await response.json();
      console.log('Application submitted:', data);
      
      alert('Application submitted successfully! You will receive a confirmation email shortly.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        university: '',
        program: '',
        yearOfStudy: '',
        expectedGraduation: '',
        division: '',
        primaryInterest: '',
        secondaryInterest: '',
        relevantCourses: '',
        projects: '',
        githubUrl: '',
        portfolioUrl: '',
        whyApply: '',
        whatContribute: '',
        availability: '',
      });
      setCurrentStep(1);
    } catch (error: any) {
      console.error('Error submitting application:', error);
      alert(error.message || 'Failed to submit application. Please try again.');
    }
  };

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

          {/* Progress Bar */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4, 5].map((step) => (
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
                    {step < 5 && (
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="">Select...</option>
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
                            <option value="testing">Testing & Certification</option>
                            <option value="ewaste">E-Waste Upcycling</option>
                          </>
                        )}
                      </select>
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
                      <p className="font-semibold mb-2">Before submitting:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Review all your information for accuracy</li>
                        <li>Ensure your contact details are correct</li>
                        <li>Check that you've answered all required fields</li>
                      </ul>
                    </div>
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
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  >
                    Submit Application
                  </button>
                )}
              </div>
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
