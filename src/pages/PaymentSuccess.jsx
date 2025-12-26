import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CheckCircle, Mail, ArrowRight, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { backendUrl, token } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [enrollmentDetails, setEnrollmentDetails] = useState(null);

  useEffect(() => {
    const fetchEnrollmentDetails = async () => {
      try {
        const enrollmentId = searchParams.get('enrollment_id');
        
        if (enrollmentId && token) {
          console.log('🔍 Fetching enrollment details:', enrollmentId);
          
          const response = await axios.get(
            `${backendUrl}/api/enrollments/${enrollmentId}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );
          
          if (response.data.success) {
            const enrollment = response.data.enrollment;
            setEnrollmentDetails({
              enrollmentId: enrollment.id,
              courseTitle: enrollment.course.title,
              courseDuration: enrollment.course.duration,
              studentName: enrollment.student.name,
              studentEmail: enrollment.student.email,
              amount: enrollment.payment.amount,
              paymentId: enrollment.payment.paymentId,
              paymentMethod: enrollment.payment.method,
              enrollmentDate: enrollment.enrollmentDate,
              status: enrollment.status
            });
            
            console.log('✅ Enrollment details fetched successfully');
            toast.success('Payment completed successfully!');
          } else {
            console.error('❌ Failed to fetch enrollment details');
            toast.error('Could not fetch enrollment details');
          }
        } else {
          console.log('📝 No enrollment ID provided or user not authenticated');
          // Fallback for URL params (backward compatibility)
          const courseTitle = searchParams.get('course');
          const amount = searchParams.get('amount');
          
          if (courseTitle || amount) {
            setEnrollmentDetails({
              enrollmentId: 'N/A',
              courseTitle: courseTitle || 'Course',
              amount: amount || '0'
            });
          }
        }
      } catch (error) {
        console.error('❌ Error fetching enrollment details:', error);
        toast.error('Failed to load enrollment details');
        
        // Fallback to URL params
        const courseTitle = searchParams.get('course');
        const amount = searchParams.get('amount');
        
        if (courseTitle || amount) {
          setEnrollmentDetails({
            enrollmentId: searchParams.get('enrollment_id') || 'N/A',
            courseTitle: courseTitle || 'Course',
            amount: amount || '0'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading delay for better UX
    const timer = setTimeout(fetchEnrollmentDetails, 2000);
    return () => clearTimeout(timer);
  }, [searchParams, token, backendUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <Loader className="w-16 h-16 text-green-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">Processing Payment...</h2>
          <p className="text-gray-600 mt-2">Please wait while we confirm your enrollment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-green-100">Your enrollment has been confirmed</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Transaction Details */}
              {enrollmentDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Enrollment Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Course:</span>
                    <span className="font-medium text-gray-900">{enrollmentDetails.courseTitle}</span>
                  </div>
                  {enrollmentDetails.studentName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Student:</span>
                      <span className="font-medium text-gray-900">{enrollmentDetails.studentName}</span>
                    </div>
                  )}
                  {enrollmentDetails.studentEmail && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium text-gray-900">{enrollmentDetails.studentEmail}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="font-bold text-green-600 text-lg">${enrollmentDetails.amount}</span>
                  </div>
                  {enrollmentDetails.paymentMethod && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method:</span>
                      <span className="font-medium text-gray-900 capitalize">{enrollmentDetails.paymentMethod}</span>
                    </div>
                  )}
                  {enrollmentDetails.paymentId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-mono text-sm text-gray-900">
                        {enrollmentDetails.paymentId.length > 20 
                          ? `${enrollmentDetails.paymentId.slice(0, 20)}...` 
                          : enrollmentDetails.paymentId
                        }
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enrollment ID:</span>
                    <span className="font-mono text-sm text-gray-900">
                      {enrollmentDetails.enrollmentId?.length > 15
                        ? `${enrollmentDetails.enrollmentId.slice(0, 15)}...`
                        : enrollmentDetails.enrollmentId
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Enrollment Date:</span>
                    <span className="font-medium text-gray-900">
                      {enrollmentDetails.enrollmentDate 
                        ? new Date(enrollmentDetails.enrollmentDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : new Date().toLocaleDateString()
                      }
                    </span>
                  </div>
                  {enrollmentDetails.status && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                        {enrollmentDetails.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-blue-500 mr-2" />
                <p className="text-gray-700">
                  A confirmation email has been sent to your registered email address
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                You can now access your course from your dashboard
              </p>
            </div>

            {/* What's Next */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3">What's Next?</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Access your course materials from the dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Check your email for course access instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Start learning at your own pace</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Contact support if you need any assistance</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Browse More Courses
              </button>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@lawedu.com" className="text-blue-600 hover:underline">
                  support@lawedu.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;