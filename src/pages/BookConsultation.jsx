import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Building,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  Video,
  MessageSquare,
  Target,
  Award,
  Briefcase
} from 'lucide-react';

const BookConsultation = () => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    graduationYear: '',
    college: '',
    currentStatus: '',
    preferredDate: '',
    preferredTime: '',
    consultationType: 'online',
    specificQuestions: '',
    previousExperience: '',
    goals: ''
  });

  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      toast.warning('Please login to book a consultation');
      navigate('/login');
    }
    // Pre-fill user data if available
    if (userData) {
      setFormData(prev => ({
        ...prev,
        fullName: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || ''
      }));
    }
  }, [token, userData, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const required = [
      'fullName', 'email', 'phone', 'subject', 
      'graduationYear', 'college', 'currentStatus',
      'preferredDate', 'preferredTime', 'consultationType'
    ];
    
    for (let field of required) {
      if (!formData[field]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Validate phone
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }

    // Validate date is in future
    const selectedDate = new Date(formData.preferredDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error('Please select a future date');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/consultations/book`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success('Consultation booked successfully!');
        navigate('/dashboard');
      } else {
        toast.error(response.data.message || 'Failed to book consultation');
      }
    } catch (error) {
      console.error('Error booking consultation:', error);
      toast.error(error.response?.data?.message || 'Failed to book consultation');
    } finally {
      setLoading(false);
    }
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 font-['Georgia','Times_New_Roman',serif]">
      {/* Header Section - Matching InstructorsPage Format */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="font-['Open_Sans',sans-serif]">Professional Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
              Book Your Expert
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                Legal Consultation
              </span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
              Get personalized guidance from experienced legal professionals for your LSAT & LNAT preparation journey
            </p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-stone-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-stone-800">Personalized Attention</h3>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">
              One-on-one sessions tailored to your specific legal education needs and career goals
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-stone-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-stone-800">Goal-Oriented Approach</h3>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">
              Strategic planning to help you achieve your law school and career objectives
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center border border-stone-200 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-stone-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-stone-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-stone-800">Expert Mentorship</h3>
            <p className="text-stone-600 font-['Open_Sans',sans-serif]">
              Learn from experienced legal professionals and educators with proven track records
            </p>
          </div>
        </div>

        {/* Consultation Process */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-16 border border-stone-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-stone-800">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold shadow-lg">
                1
              </div>
              <h4 className="font-bold mb-2 text-stone-800">Fill the Form</h4>
              <p className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                Provide your details and preferences
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold shadow-lg">
                2
              </div>
              <h4 className="font-bold mb-2 text-stone-800">Confirmation</h4>
              <p className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                Receive booking confirmation via email
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold shadow-lg">
                3
              </div>
              <h4 className="font-bold mb-2 text-stone-800">Join Session</h4>
              <p className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                Connect at the scheduled time
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 font-bold shadow-lg">
                4
              </div>
              <h4 className="font-bold mb-2 text-stone-800">Get Guidance</h4>
              <p className="text-sm text-stone-600 font-['Open_Sans',sans-serif]">
                Receive personalized advice and support
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-stone-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-stone-800">Book Your Consultation</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center text-stone-800">
                <User className="w-5 h-5 mr-3 text-amber-600" />
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="10-digit phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Current Status *
                  </label>
                  <select
                    name="currentStatus"
                    value={formData.currentStatus}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    required
                  >
                    <option value="">Select your status</option>
                    <option value="student">Current Student</option>
                    <option value="graduate">Recent Graduate</option>
                    <option value="working">Working Professional</option>
                    <option value="preparing">Exam Preparation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center text-stone-800">
                <GraduationCap className="w-5 h-5 mr-3 text-amber-600" />
                Academic Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    College/University *
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="Enter your college name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Graduation Year *
                  </label>
                  <input
                    type="number"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                    min="2020"
                    max="2030"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="e.g., 2024"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Subject/Area of Interest *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="criminal-law">Criminal Law</option>
                    <option value="corporate-law">Corporate Law</option>
                    <option value="family-law">Family Law</option>
                    <option value="constitutional-law">Constitutional Law</option>
                    <option value="intellectual-property">Intellectual Property</option>
                    <option value="international-law">International Law</option>
                    <option value="civil-law">Civil Law</option>
                    <option value="tax-law">Tax Law</option>
                    <option value="labor-law">Labor Law</option>
                    <option value="exam-preparation">LSAT/LNAT Preparation</option>
                    <option value="career-guidance">Legal Career Guidance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Consultation Details */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center text-stone-800">
                <Calendar className="w-5 h-5 mr-3 text-amber-600" />
                Consultation Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    min={minDate}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Preferred Time *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Consultation Type *
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center font-['Open_Sans',sans-serif]">
                      <input
                        type="radio"
                        name="consultationType"
                        value="online"
                        checked={formData.consultationType === 'online'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <Video className="w-4 h-4 mr-2 text-amber-600" />
                      Online (Video Call)
                    </label>
                    <label className="flex items-center font-['Open_Sans',sans-serif]">
                      <input
                        type="radio"
                        name="consultationType"
                        value="phone"
                        checked={formData.consultationType === 'phone'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <Phone className="w-4 h-4 mr-2 text-amber-600" />
                      Phone Call
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center text-stone-800">
                <MessageSquare className="w-5 h-5 mr-3 text-amber-600" />
                Additional Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Specific Questions or Topics
                  </label>
                  <textarea
                    name="specificQuestions"
                    value={formData.specificQuestions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="What specific questions or topics would you like to discuss?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Previous Legal Experience
                  </label>
                  <textarea
                    name="previousExperience"
                    value={formData.previousExperience}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="Any previous legal education or experience?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">
                    Goals and Expectations
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    rows="2"
                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    placeholder="What are your goals for this consultation?"
                  />
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6">
              <div className="flex">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800 font-['Open_Sans',sans-serif]">
                  <p className="font-semibold mb-2">Important Notice:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Each user can book only one consultation at a time</li>
                    <li>Consultations are typically 30-45 minutes long</li>
                    <li>You will receive confirmation and joining details via email</li>
                    <li>Please be available at the scheduled time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:from-amber-700 hover:to-amber-800 transition-all duration-300 hover:shadow-xl flex items-center font-['Open_Sans',sans-serif] ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Booking Consultation...
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-3" />
                    Book Free Consultation
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
