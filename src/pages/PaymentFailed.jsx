import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, ArrowLeft, HelpCircle, CreditCard, AlertCircle } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Error Header */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Payment Failed</h1>
            <p className="text-red-100">Your transaction could not be completed</p>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Error Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Transaction Unsuccessful</h3>
                  <p className="text-red-700 text-sm">
                    We couldn't process your payment. This could be due to:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-red-600">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Insufficient funds in your account</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Card details were incorrect or expired</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Transaction was cancelled or timed out</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Network or technical issues</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* What to do next */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                <HelpCircle className="w-5 h-5 mr-2" />
                What can you do?
              </h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li className="flex items-start">
                  <CreditCard className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Check your card details and try again</span>
                </li>
                <li className="flex items-start">
                  <RefreshCw className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ensure you have sufficient balance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Try a different payment method</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Contact your bank if the issue persists</span>
                </li>
              </ul>
            </div>

            {/* Important Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> No amount has been deducted from your account. If you see any pending transactions, they will be automatically reversed within 24-48 hours.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(-1)}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="flex-1 flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Courses
              </button>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Having trouble with payment?
                </p>
                <p className="text-sm">
                  Contact our support team at{' '}
                  <a href="mailto:support@lawedu.com" className="text-blue-600 hover:underline">
                    support@lawedu.com
                  </a>
                  {' '}or call{' '}
                  <a href="tel:+911234567890" className="text-blue-600 hover:underline">
                    +91 123-456-7890
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h4 className="font-semibold text-gray-800 mb-3">Frequently Asked Questions</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Will I be charged for this failed transaction?
              </p>
              <p className="text-sm text-gray-600">
                No, failed transactions are not charged. Any held amount will be released by your bank.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Can I use a different payment method?
              </p>
              <p className="text-sm text-gray-600">
                Yes, you can try with a different card or payment method when you retry.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                Is my payment information secure?
              </p>
              <p className="text-sm text-gray-600">
                Yes, we use industry-standard encryption and never store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;