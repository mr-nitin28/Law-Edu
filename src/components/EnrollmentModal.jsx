import React, { useState, useContext, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js';
import { X, CreditCard, User, Mail, DollarSign, Clock, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

// Initialize Stripe with your test publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Stripe Elements appearance customization
const stripeAppearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#3b82f6',
    colorBackground: '#ffffff',
    colorText: '#374151',
    colorDanger: '#ef4444',
    fontFamily: '"Inter", ui-sans-serif, system-ui, sans-serif',
    borderRadius: '8px',
    spacingUnit: '4px'
  },
  rules: {
    '.Input': {
      borderColor: '#d1d5db',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
    },
    '.Input:focus': {
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
    },
    '.Label': {
      fontWeight: '500',
      fontSize: '14px'
    }
  }
};

// Payment Form Component
const PaymentForm = ({ course, user, onSuccess, onCancel, clientSecret, enrollmentId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { backendUrl, token } = useContext(AppContext);

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Payment system not loaded. Please refresh and try again.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?enrollment_id=${enrollmentId}`,
        },
        redirect: 'if_required'
      });

      if (stripeError) {
        console.error('Stripe payment error:', stripeError);
        setError(stripeError.message || 'Payment failed. Please try again.');
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful, create enrollment record
        console.log('💳 Payment succeeded:', paymentIntent.id);
        
        try {
          const enrollmentData = {
            courseId: course.id,
            paymentIntentId: paymentIntent.id,
            paymentStatus: 'completed',
            amount: course.price,
            method: 'stripe'
          };

          console.log('📝 Creating enrollment:', enrollmentData);

          const response = await axios.post(
            `${backendUrl}/api/enrollments`,
            enrollmentData,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (response.data.success) {
            console.log('✅ Enrollment created successfully');
            toast.success('Enrollment completed successfully!');
            onSuccess(response.data.enrollment);
          } else {
            throw new Error(response.data.message || 'Enrollment creation failed');
          }
        } catch (enrollmentError) {
          console.error('❌ Enrollment creation error:', enrollmentError);
          setError(
            enrollmentError.response?.data?.message || 
            enrollmentError.message || 
            'Payment succeeded but enrollment failed. Please contact support.'
          );
        }
      }
    } catch (error) {
      console.error('❌ Payment processing error:', error);
      setError(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      {/* Payment Element */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <CreditCard className="inline w-4 h-4 mr-2" />
          Payment Information
        </label>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <PaymentElement 
            options={{
              layout: 'tabs'
            }}
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
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay ${course.price}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

// Main Enrollment Modal Component
const EnrollmentModal = ({ isOpen, onClose, course, user }) => {
  const [step, setStep] = useState('confirm'); // 'confirm' | 'payment' | 'success'
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [enrollmentId, setEnrollmentId] = useState('');
  const [error, setError] = useState(null);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const { backendUrl, token } = useContext(AppContext);

  // Reset modal state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      setClientSecret('');
      setEnrollmentId('');
      setError(null);
      setEnrollmentData(null);
    }
  }, [isOpen]);

  // Handle enrollment confirmation and payment intent creation
  const handleProceedToPayment = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 Creating payment intent for course:', course._id);

      const response = await axios.post(
        `${backendUrl}/api/payments/create-intent`,
        { courseId: course._id },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        console.log('✅ Payment intent created:', response.data.paymentIntentId);
        setClientSecret(response.data.clientSecret);
        setEnrollmentId(response.data.enrollmentId);
        setStep('payment');
      } else {
        throw new Error(response.data.message || 'Failed to create payment intent');
      }
    } catch (error) {
      console.error('❌ Payment intent creation failed:', error);
      setError(
        error.response?.data?.message || 
        error.message || 
        'Failed to initialize payment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = (enrollment) => {
    setEnrollmentData(enrollment);
    setStep('success');
  };

  // Handle modal close
  const handleClose = () => {
    if (step !== 'payment' || !loading) {
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
              {step === 'payment' && 'Complete Payment'}
              {step === 'success' && 'Enrollment Successful!'}
            </h2>
            <button
              onClick={handleClose}
              disabled={step === 'payment' && loading}
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
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>Price: ${course.price}</span>
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

              {/* Terms and Conditions */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Before you proceed:</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• You will have access to the course for 1 year from enrollment</li>
                  <li>• All payments are processed securely through Stripe</li>
                  <li>• You will receive a confirmation email after successful enrollment</li>
                  <li>• Course materials will be available in your dashboard immediately</li>
                </ul>
              </div>

              {error && (
                <div className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Error</h4>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button
                onClick={handleProceedToPayment}
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Preparing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: Payment Form */}
          {step === 'payment' && clientSecret && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{course.title}</span>
                  <span className="text-xl font-bold text-gray-900">${course.price}</span>
                </div>
              </div>

              {/* Stripe Payment Form */}
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: stripeAppearance
                }}
              >
                <PaymentForm
                  course={course}
                  user={user}
                  clientSecret={clientSecret}
                  enrollmentId={enrollmentId}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setStep('confirm')}
                />
              </Elements>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 'success' && enrollmentData && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Enrollment Successful! 🎉
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
                    <span>Check your email for enrollment confirmation</span>
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

              <div className="flex gap-3">
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;