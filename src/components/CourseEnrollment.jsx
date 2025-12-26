import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CourseEnrollment = ({ course, isEnrolled, onEnrollmentSuccess }) => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle enrollment initiation
  const handleEnrollClick = async () => {
    if (!token) {
      toast.warning('Please login to enroll in this course');
      navigate('/login');
      return;
    }

    if (isEnrolled) {
      toast.info('You are already enrolled in this course');
      navigate('/dashboard');
      return;
    }

    setShowPaymentModal(true);
  };

  // Process payment
  const processPayment = async () => {
    try {
      setLoading(true);
      
      console.log(' Starting payment process...');
      console.log(' Course data:', course);
      console.log(' Backend URL:', backendUrl);
      console.log(' Token exists:', !!token);
      console.log(' Course ID:', course._id);

      // Step 1: Create enrollment and get payment order
      const enrollmentUrl = `${backendUrl}/api/enrollments/initiate`;
      console.log('🌐 Making API call to:', enrollmentUrl);
      
      const { data } = await axios.post(
        enrollmentUrl,
        { courseId: course._id },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      console.log('✅ API Response:', data);

      if (!data.success) {
        throw new Error(data.message || 'Failed to initiate enrollment');
      }

      // Step 2: Load Razorpay
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Please check your connection.');
        setLoading(false);
        return;
      }

      // Step 3: Configure Razorpay options
      const options = {
        key: data.order.key || 'rzp_test_dummy',
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'LawEdu',
        description: `Enrollment for ${data.enrollment.courseTitle}`,
        order_id: data.order.id,
        handler: async function (response) {
          // Payment successful, verify on backend
          await verifyPayment(response, data.enrollment.id);
        },
        prefill: {
          name: data.user.name,
          email: data.user.email,
          contact: data.user.phone
        },
        notes: {
          courseId: course._id,
          enrollmentId: data.enrollment.id
        },
        theme: {
          color: '#D97706'
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
            setShowPaymentModal(false);
            toast.info('Payment cancelled');
          }
        }
      };

      // For test mode, simulate payment
      if (data.order.key === 'rzp_test_dummy') {
        // Test mode - simulate successful payment
        toast.info('Test Mode: Simulating payment...');
        setTimeout(async () => {
          await verifyPayment({
            razorpay_payment_id: `test_payment_${Date.now()}`,
            razorpay_order_id: data.order.id,
            razorpay_signature: 'test_signature'
          }, data.enrollment.id);
        }, 2000);
      } else {
        // Production mode - open Razorpay
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }

    } catch (error) {
      console.error('❌ Payment initiation error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error status:', error.response?.status);
      console.error('❌ Error data:', error.response?.data);
      console.error('❌ Error message:', error.message);
      
      const errorMessage = error.response?.data?.message || error.message || 'Failed to initiate payment';
      toast.error(`Payment Error: ${errorMessage}`);
      setLoading(false);
      setShowPaymentModal(false);
    }
  };

  // Verify payment on backend
  const verifyPayment = async (paymentResponse, enrollmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/enrollments/verify-payment`,
        {
          ...paymentResponse,
          enrollmentId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (data.success) {
        toast.success('Enrollment successful! Redirecting to dashboard...');
        setShowPaymentModal(false);
        
        // Call success callback if provided
        if (onEnrollmentSuccess) {
          onEnrollmentSuccess();
        }

        // Redirect to payment success page
        setTimeout(() => {
          navigate(`/payment-success?enrollment_id=${enrollmentId}&course=${course.title}&amount=${course.price}`);
        }, 1500);
      } else {
        throw new Error(data.message || 'Payment verification failed');
      }

    } catch (error) {
      console.error('Payment verification error:', error);
      toast.error('Payment verification failed. Please contact support.');
      
      // Record payment failure
      await axios.post(
        `${backendUrl}/api/enrollments/payment-failed`,
        {
          enrollmentId,
          reason: error.message
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      navigate('/payment-failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Enrollment Button */}
      <button
        onClick={handleEnrollClick}
        disabled={loading || isEnrolled}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 font-['Open_Sans',sans-serif] ${
          isEnrolled
            ? 'bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300'
            : loading
            ? 'bg-amber-400 text-white cursor-wait animate-pulse'
            : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Processing Payment...
          </span>
        ) : isEnrolled ? (
          <span className="flex items-center justify-center">
            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
            Already Enrolled
          </span>
        ) : (
          `Enroll Now - ₹${course.price}`
        )}
      </button>

      {/* Payment Modal */}
      {showPaymentModal && !loading && (
        <div className="fixed inset-0 bg-stone-900 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 font-['Georgia',serif]">Confirm Enrollment</h3>
              <p className="text-amber-100 font-['Open_Sans',sans-serif]">Complete your course registration</p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Course Details */}
              <div className="bg-stone-50 rounded-xl p-4 mb-6 border border-stone-200">
                <h4 className="font-bold text-stone-800 mb-3 text-lg font-['Georgia',serif]">{course.title}</h4>
                <div className="space-y-3 text-sm font-['Open_Sans',sans-serif]">
                  <div className="flex justify-between items-center py-2 border-b border-stone-200">
                    <span className="text-stone-600">Course Fee:</span>
                    <span className="font-bold text-stone-900 text-lg">₹{course.price}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-stone-200">
                    <span className="text-stone-600">Duration:</span>
                    <span className="font-semibold text-stone-700">{course.duration || '3 months'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-stone-600">Access Period:</span>
                    <span className="font-semibold text-stone-700">1 Year</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h5 className="font-bold text-stone-800 mb-4 font-['Georgia',serif]">Course Includes:</h5>
                <div className="space-y-3 text-sm font-['Open_Sans',sans-serif]">
                  <div className="flex items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-stone-700">Lifetime access to all course materials</span>
                  </div>
                  <div className="flex items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-stone-700">Official certificate of completion</span>
                  </div>
                  <div className="flex items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-stone-700">24/7 expert support access</span>
                  </div>
                  <div className="flex items-start p-3 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-stone-700">Instant email confirmation & invoice</span>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                <div className="text-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm text-emerald-800 font-medium font-['Open_Sans',sans-serif]">
                    Secure payment powered by Razorpay
                  </p>
                  <p className="text-xs text-emerald-600 mt-1 font-['Open_Sans',sans-serif]">
                    Your payment information is protected
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 px-4 border-2 border-stone-300 text-stone-700 rounded-xl hover:bg-stone-50 transition-all duration-300 font-semibold font-['Open_Sans',sans-serif]"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 font-['Open_Sans',sans-serif]"
                >
                  <span className="flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                    Proceed to Payment
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseEnrollment;
