import React, { useState, useContext } from 'react';
import { X, CreditCard, User, Mail, DollarSign, Clock, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Simplified Enrollment Modal Component (Works without Stripe)
const EnrollmentModalSimple = ({ isOpen, onClose, course, user }) => {
  const [step, setStep] = useState('confirm'); // 'confirm' | 'payment' | 'processing' | 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '4242 4242 4242 4242', // Test card number
    expiry: '12/25',
    cvv: '123',
    name: user?.name || ''
  });
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();

  // Handle enrollment confirmation
  const handleProceedToPayment = () => {
    setError(null);
    setStep('payment');
  };

  // Simulate payment processing
  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    setStep('processing');

    try {
      // Step 1: Create payment intent
      console.log('📝 Creating payment intent...');
      const intentResponse = await axios.post(
        `${backendUrl}/api/payments/create-intent`,
        { courseId: course._id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!intentResponse.data.success) {
        throw new Error(intentResponse.data.message || 'Failed to create payment intent');
      }

      const { paymentIntentId, enrollmentId } = intentResponse.data;
      console.log('✅ Payment intent created:', paymentIntentId);

      // Step 2: Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 3: Create enrollment (simulating successful payment)
      console.log('💳 Processing payment and creating enrollment...');
      const enrollmentResponse = await axios.post(
        `${backendUrl}/api/enrollments`,
        {
          courseId: course._id,
          paymentIntentId: paymentIntentId,
          paymentStatus: 'completed',
          amount: course.price,
          method: 'card'
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (enrollmentResponse.data.success) {
        console.log('✅ Enrollment created successfully');
        setEnrollmentData(enrollmentResponse.data.enrollment);
        setStep('success');
        toast.success('Payment successful! You are now enrolled.');
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate(`/payment-success?enrollment_id=${enrollmentResponse.data.enrollment.id}`);
        }, 3000);
      } else {
        throw new Error(enrollmentResponse.data.message || 'Enrollment creation failed');
      }

    } catch (error) {
      console.error('❌ Payment error:', error);
      setError(
        error.response?.data?.message || 
        error.message || 
        'Payment processing failed. Please try again.'
      );
      setStep('payment');
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!loading) {
      setStep('confirm');
      setError(null);
      setEnrollmentData(null);
      onClose();
    }
  };

  if (!isOpen || !course || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {step === 'confirm' && 'Enroll in Course'}
              {step === 'payment' && 'Payment Details'}
              {step === 'processing' && 'Processing Payment...'}
              {step === 'success' && 'Enrollment Successful!'}
            </h2>
            <button
              onClick={handleClose}
              disabled={loading}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors disabled:opacity-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
          {/* Step 1: Enrollment Confirmation */}
          {step === 'confirm' && (
            <div className="space-y-6">
              {/* Course Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {course.title}
                </h3>
                {course.description && (
                  <p className="text-gray-600 mb-4">
                    {course.description}
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>Price: ₹{course.price}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Duration: {course.duration || 'Self-paced'}</span>
                  </div>
                </div>
              </div>

              {/* Student Information */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Student Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Test Mode Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Test Mode Active</h4>
                <p className="text-yellow-700 text-sm">
                  This is a test environment. No real payment will be processed.
                  Use the test card details provided on the next screen.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceedToPayment}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </button>
            </div>
          )}

          {/* Step 2: Payment Form */}
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{course.title}</span>
                  <span className="text-xl font-bold text-gray-900">₹{course.price}</span>
                </div>
              </div>

              {/* Test Card Info */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">Test Card Details</h4>
                <p className="text-green-700 text-sm">
                  Use these test card details for demo payment:
                </p>
                <ul className="text-green-700 text-sm mt-2 space-y-1">
                  <li>• Card Number: 4242 4242 4242 4242</li>
                  <li>• Expiry: Any future date (e.g., 12/25)</li>
                  <li>• CVV: Any 3 digits (e.g., 123)</li>
                </ul>
              </div>

              {/* Simulated Payment Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.expiry}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={paymentDetails.cvv}
                      readOnly
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.name}
                    onChange={(e) => setPaymentDetails({...paymentDetails, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Payment Error</h4>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep('confirm')}
                  disabled={loading}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handlePayment}
                  disabled={loading || !paymentDetails.name}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay ₹{course.price}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Processing */}
          {step === 'processing' && (
            <div className="text-center py-12">
              <Loader className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Processing Payment...
              </h3>
              <p className="text-gray-600">
                Please wait while we process your payment and create your enrollment.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                This may take a few seconds...
              </p>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && enrollmentData && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Payment Successful! 🎉
                </h3>
                <p className="text-gray-600">
                  You have successfully enrolled in <strong>{course.title}</strong>
                </p>
              </div>

              <div className="bg-green-50 rounded-xl p-6 text-left">
                <h4 className="font-semibold text-green-900 mb-3">What's next?</h4>
                <ul className="text-green-800 space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>You'll be redirected to the success page shortly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Access your course from the dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Start learning immediately</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-500">
                Redirecting to success page in a moment...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModalSimple;