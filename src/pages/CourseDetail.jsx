import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  Star, 
  Globe, 
  Award, 
  Play,
  Download,
  MessageCircle,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  ChevronDown,
  HelpCircle,
  Filter,
  ThumbsUp
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import EnrollmentModal from '../components/EnrollmentModal';
import coursesDataJson from '../data/coursesData.json';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token, userData, backendUrl } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('overview');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [course, setCourse] = useState(null);
  const [courseFaqs, setCourseFaqs] = useState([]);
  const [courseReviews, setCourseReviews] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] = useState(false);
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');

  // Load course data from local JSON
  useEffect(() => {
    const loadCourse = () => {
      try {
        // Load from local JSON file
        const allCourses = coursesDataJson.courses || [];
        const foundCourse = allCourses.find(c => c.id === courseId);
        
        if (foundCourse) {
          setCourse(foundCourse);
          
          // Generate FAQs based on course data
          const courseFormat = foundCourse.format ? foundCourse.format.join(', ') : 'online';
          setCourseFaqs([
            {
              question: "Do I get a certificate upon completion?",
              answer: "Yes, you'll receive a verified certificate of completion that you can add to your resume and LinkedIn profile."
            },
            {
              question: "Is this course suitable for beginners?",
              answer: `This course is designed for ${foundCourse.level || 'all skill levels'}, providing comprehensive instruction tailored to your learning needs.`
            },
            {
              question: "What format is this course delivered in?",
              answer: `This course is available in ${courseFormat} format with flexible access to all materials.`
            },
            {
              question: "What if I'm not satisfied with the course?",
              answer: "We offer a 30-day money-back guarantee if you're not completely satisfied with the course content and quality."
            }
          ]);

          // Generate sample reviews
          setCourseReviews([
            {
              id: 1,
              userName: "Sarah Chen",
              userAvatar: "/api/placeholder/40/40",
              rating: 5,
              date: "2024-01-15",
              reviewText: "Excellent course! The instructors are knowledgeable and the content is well-structured. I scored 168 on my LSAT after taking this course.",
              helpful: 24,
              verified: true
            },
            {
              id: 2,
              userName: "Michael Rodriguez",
              userAvatar: "/api/placeholder/40/40",
              rating: 4,
              date: "2024-01-10",
              reviewText: "Great preparation materials and practice tests. The logic games section was particularly helpful. Would recommend to anyone serious about LSAT prep.",
              helpful: 18,
              verified: true
            },
            {
              id: 3,
              userName: "Emily Johnson",
              userAvatar: "/api/placeholder/40/40",
              rating: 5,
              date: "2024-01-08",
              reviewText: "Outstanding course with comprehensive coverage of all LSAT sections. The personalized feedback from instructors made a huge difference in my preparation.",
              helpful: 31,
              verified: true
            },
            {
              id: 4,
              userName: "David Park",
              userAvatar: "/api/placeholder/40/40",
              rating: 4,
              date: "2024-01-05",
              reviewText: "Very thorough and well-organized course. The study schedule was realistic and the practice materials were challenging yet fair.",
              helpful: 12,
              verified: true
            }
          ]);
        } else {
          setCourse(null);
          setCourseFaqs([]);
          setCourseReviews([]);
        }
      } catch (error) {
        console.error('Error loading course:', error);
        setCourse(null);
        setCourseFaqs([]);
        setCourseReviews([]);
      }
    };

    if (courseId) {
      loadCourse();
    }
  }, [courseId]);

  // Check enrollment status
  useEffect(() => {
    const checkEnrollmentStatus = async () => {
      if (!token || !course) return;

      try {
        setCheckingEnrollment(true);
        const response = await fetch(
          `${backendUrl}/api/enrollments/check/${courseId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        
        setIsEnrolled(data.success && data.enrolled);
      } catch (error) {
        console.error('Error checking enrollment status:', error);
        setIsEnrolled(false);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollmentStatus();
  }, [token, course, courseId, backendUrl]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-stone-50">
        <div className="text-center max-w-md bg-white rounded-2xl p-8 shadow-sm border border-stone-200">
          <BookOpen className="w-16 h-16 text-stone-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Course Not Found</h2>
          <p className="text-stone-600 mb-6">The course you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Filter reviews
  const filteredReviews = courseReviews.filter(review => {
    if (reviewFilter === 'all') return true;
    if (reviewFilter === '5') return review.rating === 5;
    if (reviewFilter === '4') return review.rating === 4;
    if (reviewFilter === '3') return review.rating === 3;
    return true;
  });

  // Calculate average rating
  const averageRating = courseReviews.length > 0 
    ? (courseReviews.reduce((sum, review) => sum + review.rating, 0) / courseReviews.length).toFixed(1)
    : course.rating;

  const handleEnrollmentSuccess = () => {
    setIsEnrolled(true);
    toast.success('Successfully enrolled! Check your dashboard.');
  };

  const handlePreviewClick = () => {
    if (!token || !userData) {
      toast.error('Please sign in to preview courses');
      navigate('/login?mode=login');
      return;
    }
    toast.info('Preview feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Courses</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Hero - Minimalistic */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {/* Simple Header */}
              <div className="h-32 bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-90" />
                  <h1 className="text-xl font-bold">{course.category}</h1>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-stone-900 mb-2">{course.title}</h1>
                    <p className="text-lg text-stone-600">{course.subtitle}</p>
                  </div>

                  <div className="flex items-center bg-amber-50 px-3 py-2 rounded-full">
                    <Star className="w-4 h-4 text-amber-500 fill-current mr-1" />
                    <span className="font-semibold text-stone-900">{averageRating}</span>
                  </div>
                </div>

                {/* Course Stats - Clean */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-stone-50 rounded-xl">
                    <Globe className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                    <p className="font-medium text-stone-900">Online</p>
                    <p className="text-sm text-stone-500">Format</p>
                  </div>
                  <div className="text-center p-4 bg-stone-50 rounded-xl">
                    <Clock className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                    <p className="font-medium text-stone-900">Self-paced</p>
                    <p className="text-sm text-stone-500">Learning</p>
                  </div>
                  <div className="text-center p-4 bg-stone-50 rounded-xl">
                    <Award className="w-5 h-5 text-amber-600 mx-auto mb-2" />
                    <p className="font-medium text-stone-900">Certificate</p>
                    <p className="text-sm text-stone-500">Included</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs - Clean Design */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200">
              {/* Tab Navigation */}
              <div className="border-b border-stone-200">
                <nav className="flex space-x-8 px-8">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 border-b-2 font-medium transition-colors flex items-center space-x-2 ${
                          activeTab === tab.id
                            ? 'border-amber-500 text-amber-600'
                            : 'border-transparent text-stone-500 hover:text-stone-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-4">Course Description</h3>
                      <p className="text-stone-600 leading-relaxed">{course.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-stone-900 mb-6">What You'll Learn</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {course.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-stone-600">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Curriculum Tab */}
                {activeTab === 'curriculum' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-stone-900 mb-6">Course Curriculum</h3>
                    {course.curriculum.map((week, index) => (
                      <div key={index} className="border border-stone-200 rounded-xl p-6 bg-stone-50">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-stone-900">
                            Week {week.week}: {week.title}
                          </h4>
                          <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <ul className="space-y-3">
                          {week.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-stone-600 flex items-start">
                              <CheckCircle className="w-4 h-4 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-stone-900">Student Reviews</h3>
                      <div className="flex items-center space-x-4">
                        <select
                          value={reviewFilter}
                          onChange={(e) => setReviewFilter(e.target.value)}
                          className="border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="all">All Reviews</option>
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                        </select>
                      </div>
                    </div>

                    {/* Review Summary */}
                    <div className="bg-stone-50 rounded-xl p-6">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-stone-900">{averageRating}</div>
                          <div className="flex items-center justify-center mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= Math.floor(averageRating)
                                    ? 'text-amber-500 fill-current'
                                    : 'text-stone-300'
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-stone-500 mt-1">{courseReviews.length} reviews</div>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = courseReviews.filter(r => r.rating === rating).length;
                            const percentage = courseReviews.length > 0 ? (count / courseReviews.length) * 100 : 0;
                            return (
                              <div key={rating} className="flex items-center space-x-2 mb-2">
                                <span className="text-sm text-stone-600 w-6">{rating}</span>
                                <Star className="w-3 h-3 text-amber-500 fill-current" />
                                <div className="flex-1 bg-stone-200 rounded-full h-2">
                                  <div 
                                    className="bg-amber-500 h-2 rounded-full" 
                                    style={{width: `${percentage}%`}}
                                  />
                                </div>
                                <span className="text-sm text-stone-500 w-8">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {filteredReviews.map((review) => (
                        <div key={review.id} className="border border-stone-200 rounded-xl p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.userAvatar}
                              alt={review.userName}
                              className="w-10 h-10 rounded-full bg-stone-200"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-medium text-stone-900 flex items-center">
                                    {review.userName}
                                    {review.verified && (
                                      <CheckCircle className="w-4 h-4 text-emerald-500 ml-2" />
                                    )}
                                  </h4>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <div className="flex">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                          key={star}
                                          className={`w-4 h-4 ${
                                            star <= review.rating
                                              ? 'text-amber-500 fill-current'
                                              : 'text-stone-300'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-stone-500">
                                      {new Date(review.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-stone-600 mb-3">{review.reviewText}</p>
                              <button className="flex items-center space-x-2 text-sm text-stone-500 hover:text-stone-700">
                                <ThumbsUp className="w-4 h-4" />
                                <span>Helpful ({review.helpful})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs Tab */}
                {activeTab === 'faqs' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-stone-900 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {courseFaqs.map((faq, index) => (
                        <div key={index} className="border border-stone-200 rounded-xl overflow-hidden">
                          <button
                            className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-stone-50 transition-colors"
                            onClick={() => toggleFaq(index)}
                          >
                            <span className="font-medium text-stone-900">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-stone-400 transition-transform ${
                                openFaqIndex === index ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {openFaqIndex === index && (
                            <div className="px-6 pb-4 text-stone-600 border-t border-stone-200">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Clean and Minimal */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-bold text-stone-900">₹{course.price}</span>
                  {course.originalPrice && (
                    <span className="text-xl text-stone-400 line-through">₹{course.originalPrice}</span>
                  )}
                </div>
                {course.originalPrice && (
                  <p className="text-emerald-600 font-medium">
                    Save ₹{course.originalPrice - course.price}!
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <button
                  onClick={() => {
                    if (!token || !userData) {
                      toast.warning('Please login to enroll in this course');
                      navigate('/login');
                      return;
                    }
                    if (isEnrolled) {
                      toast.info('You are already enrolled in this course');
                      navigate('/dashboard');
                      return;
                    }
                    setShowEnrollmentModal(true);
                  }}
                  disabled={checkingEnrollment}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all ${
                    isEnrolled
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      : checkingEnrollment
                      ? 'bg-amber-400 text-white cursor-wait'
                      : 'bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {checkingEnrollment ? 'Checking...' : isEnrolled ? 'Already Enrolled' : `Enroll Now - ₹${course.price}`}
                </button>

                <button 
                  onClick={handlePreviewClick}
                  className="w-full bg-stone-100 text-stone-700 py-3 rounded-xl font-medium hover:bg-stone-200 transition-colors flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Preview Course
                </button>
              </div>

              {/* Course Features */}
              <div className="border-t border-stone-200 pt-6 space-y-4">
                <div className="flex items-center text-stone-600">
                  <Download className="w-4 h-4 mr-3 text-amber-600" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center text-stone-600">
                  <Globe className="w-4 h-4 mr-3 text-amber-600" />
                  <span>Online & offline access</span>
                </div>
                <div className="flex items-center text-stone-600">
                  <Award className="w-4 h-4 mr-3 text-amber-600" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center text-stone-600">
                  <MessageCircle className="w-4 h-4 mr-3 text-amber-600" />
                  <span>Discussion forum access</span>
                </div>
                <div className="flex items-center text-stone-600">
                  <Users className="w-4 h-4 mr-3 text-amber-600" />
                  <span>Expert instructor support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {course && userData && (
        <EnrollmentModal
          isOpen={showEnrollmentModal}
          onClose={() => setShowEnrollmentModal(false)}
          course={{
            ...course,
            _id: courseId,
          }}
          user={userData}
        />
      )}
    </div>
  );
};

export default CourseDetail;
