import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import coursesDataJson from '../data/coursesData.json';
 
import { 
  User, 
  Mail, 
  Calendar, 
  BookOpen, 
  Clock, 
  Star, 
  LogOut,
  Edit3,
  Save,
  X,
  Camera,
  Phone,
  MapPin,
  Video,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  CreditCard,
  BarChart3
} from 'lucide-react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { token, userData, setUserData, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [loadingConsultations, setLoadingConsultations] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loadingEnrollments, setLoadingEnrollments] = useState(true);
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    location: ''
  });
 
  // Initialize edit fields once userData is available (route handles protection)
  useEffect(() => {
    if (userData) {
      setEditData({
        name: userData.name || '',
        phone: userData.phone || '',
        location: userData.location || ''
      });
    }
  }, [userData]);

  // Load demo data for showcase
  useEffect(() => {
    if (token) {
      loadDemoData();
    }
  }, [token]);

  const loadDemoData = () => {
    // Demo consultations
    setLoadingConsultations(true);
    setTimeout(() => {
      setConsultations([]);
      setLoadingConsultations(false);
    }, 500);

    // Demo enrollments - show sample courses
    setLoadingEnrollments(true);
    setTimeout(() => {
      const allCourses = coursesDataJson.courses || [];
      const demoCourses = allCourses.slice(0, 2).map((course, index) => ({
        id: course.id,
        title: course.title,
        description: course.description,
        progress: index === 0 ? 65 : 100,
        status: index === 0 ? 'In Progress' : 'Completed',
        enrollmentDate: new Date(2024, 10, 1).toISOString(),
        expiryDate: new Date(2025, 1, 1).toISOString(),
        paymentStatus: 'completed',
        amount: course.price
      }));
      setEnrolledCourses(demoCourses);
      setLoadingEnrollments(false);
    }, 800);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-amber-700 bg-amber-100 border border-amber-200';
      case 'confirmed':
        return 'text-emerald-700 bg-emerald-100 border border-emerald-200';
      case 'completed':
        return 'text-stone-700 bg-stone-100 border border-stone-200';
      case 'cancelled':
        return 'text-red-700 bg-red-100 border border-red-200';
      default:
        return 'text-stone-600 bg-stone-100 border border-stone-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const formatSubject = (subject) => {
    if (!subject) return '';
    return subject.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserData(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel edit
      setEditData({
        name: userData.name || '',
        phone: userData.phone || '',
        location: userData.location || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Demo mode - update localStorage
    const updatedUser = {
      ...userData,
      ...editData
    };
    setUserData(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-stone-200">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-stone-900 font-['Open_Sans',sans-serif]">Loading dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50/30 to-stone-100 pt-20 font-['Georgia','Times_New_Roman',serif]">
      
      {/* Header Section - Matching Other Components */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-xl text-amber-700 text-sm font-medium mb-6 border border-amber-200">
              <BarChart3 className="w-4 h-4 mr-2" />
              <span className="font-['Open_Sans',sans-serif]">Student Dashboard</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-6 leading-tight">
              Welcome Back,
              <br />
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                {userData.name}
              </span>
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans',sans-serif]">
              Track your progress, manage consultations, and continue your law school preparation journey
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-800">Profile</h2>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleEditToggle}
                        className="p-2 text-stone-600 hover:bg-stone-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEditToggle}
                      className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {userData.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-stone-600 hover:text-amber-600 transition-colors border border-stone-200">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
                      <User className="w-4 h-4 text-stone-400 mr-2" />
                      <span className="text-stone-800 font-['Open_Sans',sans-serif]">{userData.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">Email</label>
                  <div className="flex items-center px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
                    <Mail className="w-4 h-4 text-stone-400 mr-2" />
                    <span className="text-stone-800 font-['Open_Sans',sans-serif]">{userData.email}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                      placeholder="Enter phone number"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
                      <Phone className="w-4 h-4 text-stone-400 mr-2" />
                      <span className="text-stone-800 font-['Open_Sans',sans-serif]">{userData.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({...editData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent font-['Open_Sans',sans-serif]"
                      placeholder="Enter your location"
                    />
                  ) : (
                    <div className="flex items-center px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
                      <MapPin className="w-4 h-4 text-stone-400 mr-2" />
                      <span className="text-stone-800 font-['Open_Sans',sans-serif]">{userData.location || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2 font-['Open_Sans',sans-serif]">Member Since</label>
                  <div className="flex items-center px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
                    <Calendar className="w-4 h-4 text-stone-400 mr-2" />
                    <span className="text-stone-800 font-['Open_Sans',sans-serif]">
                      {new Date(userData.createdAt || Date.now()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center px-4 py-3 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-['Open_Sans',sans-serif]"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-stone-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-amber-100 rounded-2xl">
                    <BookOpen className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-stone-800">{enrolledCourses.length}</h3>
                    <p className="text-stone-600 font-['Open_Sans',sans-serif]">Enrolled Courses</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-stone-200 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center">
                  <div className="p-3 bg-emerald-100 rounded-2xl">
                    <Calendar className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-stone-800">{consultations.length}</h3>
                    <p className="text-stone-600 font-['Open_Sans',sans-serif]">Consultations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Consultations Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-800">My Consultations</h2>
                <button
                  onClick={() => navigate('/book-consultation')}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 text-sm shadow-lg font-['Open_Sans',sans-serif]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Book New
                </button>
              </div>

              {loadingConsultations ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="text-stone-600 mt-2 font-['Open_Sans',sans-serif]">Loading consultations...</p>
                </div>
              ) : consultations.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-stone-800 mb-2">No consultations yet</h3>
                  <p className="text-stone-600 mb-6 font-['Open_Sans',sans-serif]">Book your first consultation to get expert guidance</p>
                  <button
                    onClick={() => navigate('/book-consultation')}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg font-['Open_Sans',sans-serif]"
                  >
                    Book Consultation
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {consultations.slice(0, 3).map((consultation) => (
                    <div key={consultation._id} className="border border-stone-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-stone-50/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-bold text-stone-800 mr-3">
                              {formatSubject(consultation.subject)}
                            </h3>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-medium ${getStatusColor(consultation.status)}`}>
                              {getStatusIcon(consultation.status)}
                              <span className="ml-1.5 capitalize">{consultation.status}</span>
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-3 text-sm text-stone-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-stone-400" />
                              <span className="font-['Open_Sans',sans-serif]">{new Date(consultation.preferredDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-stone-400" />
                              <span className="font-['Open_Sans',sans-serif]">{consultation.preferredTime}</span>
                            </div>
                            <div className="flex items-center">
                              {consultation.consultationType === 'online' ? (
                                <Video className="w-4 h-4 mr-2 text-stone-400" />
                              ) : (
                                <Phone className="w-4 h-4 mr-2 text-stone-400" />
                              )}
                              <span className="font-['Open_Sans',sans-serif]">{consultation.consultationType === 'online' ? 'Online' : 'Phone'}</span>
                            </div>
                            {consultation.assignedInstructor && (
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-2 text-stone-400" />
                                <span className="font-['Open_Sans',sans-serif]">{consultation.assignedInstructor.name}</span>
                              </div>
                            )}
                          </div>

                          {consultation.meetingLink && consultation.status === 'confirmed' && (
                            <div className="bg-amber-50 border-l-4 border-amber-400 p-2 mb-2 rounded-r-lg">
                              <a 
                                href={consultation.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-amber-700 hover:text-amber-800 font-medium font-['Open_Sans',sans-serif]"
                              >
                                Join Meeting →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {consultations.length > 3 && (
                    <div className="text-center pt-2">
                      <button
                        onClick={() => navigate('/my-consultations')}
                        className="text-amber-700 hover:text-amber-800 font-medium font-['Open_Sans',sans-serif]"
                      >
                        View All {consultations.length} Consultations
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-stone-800">My Enrolled Courses</h2>
                <button
                  onClick={() => navigate('/courses')}
                  className="text-amber-700 hover:text-amber-800 font-medium font-['Open_Sans',sans-serif]"
                >
                  Browse More Courses
                </button>
              </div>

              {loadingEnrollments ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                  <p className="text-stone-600 mt-2 font-['Open_Sans',sans-serif]">Loading courses...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border border-stone-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 bg-stone-50/50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-stone-800 mb-2">{course.title}</h3>
                          <div className="flex flex-wrap gap-4 text-sm text-stone-600 mb-3">
                            <span className="flex items-center font-['Open_Sans',sans-serif]">
                              <Calendar className="w-4 h-4 mr-1" />
                              Enrolled: {new Date(course.enrollmentDate).toLocaleDateString()}
                            </span>
                            {course.expiryDate && (
                              <span className="flex items-center font-['Open_Sans',sans-serif]">
                                <Clock className="w-4 h-4 mr-1" />
                                Valid till: {new Date(course.expiryDate).toLocaleDateString()}
                              </span>
                            )}
                            {course.amount && (
                              <span className="flex items-center font-['Open_Sans',sans-serif]">
                                <CreditCard className="w-4 h-4 mr-1" />
                                ₹{course.amount}
                              </span>
                            )}
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-stone-200 rounded-full h-2 mb-3">
                            <div 
                              className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-stone-500 font-['Open_Sans',sans-serif]">Progress: {course.progress}%</p>
                        </div>
                        
                        <div className="ml-4">
                          <span className={`px-3 py-1 rounded-xl text-xs font-medium font-['Open_Sans',sans-serif] ${
                            course.status === 'In Progress' 
                              ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {course.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => navigate(`/course/${course.id}`)}
                          className="text-amber-700 hover:text-amber-800 font-medium flex items-center font-['Open_Sans',sans-serif]"
                        >
                          <BookOpen className="w-4 h-4 mr-1" />
                          Access Course
                        </button>
                        {course.paymentStatus === 'completed' && (
                          <span className="text-xs text-emerald-600 flex items-center font-['Open_Sans',sans-serif]">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Paid
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {enrolledCourses.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-stone-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-stone-800 mb-2">No courses enrolled yet</h3>
                      <p className="text-stone-600 mb-6 font-['Open_Sans',sans-serif]">Start your learning journey by enrolling in a course</p>
                      <button
                        onClick={() => navigate('/courses')}
                        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-lg font-['Open_Sans',sans-serif]"
                      >
                        Browse Courses
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
