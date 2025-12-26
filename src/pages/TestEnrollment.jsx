import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import EnrollmentModal from '../components/EnrollmentModal'; // Use the Stripe-enabled modal
import { toast } from 'react-toastify';

const TestEnrollment = () => {
  const [showModal, setShowModal] = useState(false);
  const [testCourse, setTestCourse] = useState(null);
  const { user, token } = useContext(AppContext);

  // Create a test course object
  useEffect(() => {
    // Simulate a course object for testing
    setTestCourse({
      _id: '66d5c2c0e31f1cbf27e7efad', // Replace with actual course ID from your database
      title: 'Test Law Course - Contract Law Fundamentals',
      description: 'This is a comprehensive test course covering the fundamentals of contract law, including formation, terms, breach, and remedies.',
      price: 999,
      duration: '8 weeks',
      instructor: 'Prof. John Doe',
      isActive: true
    });
  }, []);

  const handleOpenModal = () => {
    if (!user || !token) {
      toast.error('Please login first to test enrollment!');
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Enrollment System Test Page
          </h1>
          <p className="text-gray-600">
            This page is for testing the enrollment modal and payment flow.
          </p>
        </div>

        {/* User Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">User Status</h2>
          {user ? (
            <div className="space-y-2">
              <p className="text-green-600">✅ User logged in</p>
              <p className="text-gray-600">Name: {user.name}</p>
              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Token: {token ? 'Present' : 'Missing'}</p>
            </div>
          ) : (
            <div>
              <p className="text-red-600">❌ Not logged in</p>
              <p className="text-gray-500 mt-2">Please login to test enrollment</p>
            </div>
          )}
        </div>

        {/* Test Course */}
        {testCourse && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">Test Course</h2>
            <div className="space-y-2">
              <p className="text-gray-700"><strong>Title:</strong> {testCourse.title}</p>
              <p className="text-gray-700"><strong>Price:</strong> ₹{testCourse.price}</p>
              <p className="text-gray-700"><strong>Duration:</strong> {testCourse.duration}</p>
              <p className="text-gray-700"><strong>Description:</strong> {testCourse.description}</p>
              <p className="text-gray-700"><strong>Course ID:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{testCourse._id}</code></p>
            </div>
          </div>
        )}

        {/* Test Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-3">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Make sure you are logged in (check User Status above)</li>
            <li>Click the "Open Enrollment Modal" button below</li>
            <li>Review course details and click "Proceed to Payment"</li>
            <li>You'll see the real Stripe payment form</li>
            <li>Use Stripe test card: 4242 4242 4242 4242</li>
            <li>Fill in any email and future expiry date (12/25)</li>
            <li>Complete the payment and see success message</li>
          </ol>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <button
            onClick={handleOpenModal}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Enrollment Modal
          </button>
        </div>

        {/* Debug Info */}
        <div className="bg-gray-100 rounded-lg p-6 mt-6">
          <h3 className="font-semibold mb-2">Debug Information</h3>
          <div className="font-mono text-sm space-y-1">
            <p>Backend URL: {process.env.VITE_BACKEND_URL || 'http://localhost:5000'}</p>
            <p>Stripe Key: {import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? 'Configured ✅' : 'Not configured ❌'}</p>
            <p>Environment: {process.env.NODE_ENV || 'development'}</p>
            <p>Modal Status: {showModal ? 'Open' : 'Closed'}</p>
            <p>User Authenticated: {user ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>

      {/* Enrollment Modal with Stripe */}
      {testCourse && user && (
        <EnrollmentModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          course={testCourse}
          user={user}
        />
      )}
    </div>
  );
};

export default TestEnrollment;