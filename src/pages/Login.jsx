import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { 
  Scale, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';

const Login = () => {
  const { token, setToken, userData, setUserData, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const executeLogin = (userEmail, userName = null) => {
    setLoading(true);

    setTimeout(() => {
      try {
        const trimmedEmail = (userEmail || '').trim().toLowerCase();
        const displayName = userName || (trimmedEmail.split('@')[0] || 'Student')
          .replace(/[._-]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        const activeUser = {
          id: `user_${Date.now()}`,
          name: displayName || 'Candidate Student',
          email: trimmedEmail,
          phone: '+1 (555) 789-0142',
          location: 'New York, USA',
          role: 'student',
          createdAt: new Date().toISOString()
        };

        const sessionToken = `lawedu_token_${Date.now()}`;
        
        localStorage.setItem('token', sessionToken);
        localStorage.setItem('userData', JSON.stringify(activeUser));
        
        setToken(sessionToken);
        setUserData(activeUser);
        
        toast.success(`Welcome back, ${activeUser.name}!`);
        
        const targetDestination = location.state?.from?.pathname || '/dashboard';
        navigate(targetDestination, { replace: true });
      } catch (err) {
        console.error('Login error:', err);
        toast.error('An error occurred during sign in. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!formData.password) {
      toast.error('Please enter your password');
      return;
    }
    executeLogin(formData.email);
  };

  const handleQuickDemoLogin = () => {
    setFormData({
      email: 'alex.vance@lawedu.edu',
      password: '••••••••••',
      rememberMe: true
    });
    executeLogin('alex.vance@lawedu.edu', 'Alex Vance');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error('Please enter your email');
      return;
    }
    setForgotSubmitted(true);
    setTimeout(() => {
      toast.info(`Password reset instructions sent to ${forgotEmail}`);
      setShowForgotModal(false);
      setForgotSubmitted(false);
      setForgotEmail('');
    }, 800);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-stone-100 via-amber-50/25 to-stone-200 flex items-center justify-center p-3 sm:p-5 lg:p-6 font-['Georgia','Times_New_Roman',serif] overflow-y-auto lg:overflow-hidden select-none">
      
      {/* Main Single Front-View Container */}
      <div className="w-full max-w-5xl h-auto lg:h-[90vh] max-h-[660px] bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* Left Side: Real Image with Gradient Overlay & Content (5 Cols) */}
        <div className="hidden lg:relative lg:flex lg:col-span-5 overflow-hidden flex-col justify-between p-7 text-white">
          
          {/* Background Image */}
          <img
            src={assets.about_image}
            alt="LawEdu Students"
            className="absolute inset-0 w-full h-full object-cover object-center transform scale-105"
          />

          {/* Warm Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/75 to-stone-900/50" />
          <div className="absolute inset-0 bg-amber-950/20 mix-blend-overlay" />

          {/* Top Brand Block */}
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-950/40">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-tight">LawEdu</span>
                <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold font-['Open_Sans',sans-serif]">
                  Professional Learning
                </span>
              </div>
            </div>

            <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-amber-500/25 text-amber-200 border border-amber-400/30 font-['Open_Sans',sans-serif]">
              <Sparkles className="w-3 h-3 mr-1.5 text-amber-300" />
              Top 1% Admissions Mentorship
            </div>
          </div>

          {/* Middle Highlight Details */}
          <div className="relative z-10 space-y-2.5 font-['Open_Sans',sans-serif]">
            <h2 className="text-2xl font-bold leading-snug text-white font-['Georgia',serif]">
              Master LSAT &amp; LNAT with Expert Guidance
            </h2>
            <p className="text-xs text-stone-200 leading-relaxed">
              Personalized study roadmaps, 1-on-1 consultations with Oxford &amp; Harvard mentors, and high-yield analytical drill banks.
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-stone-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Ivy League &amp; Russell Group Mentors</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Tailored LSAT/LNAT Logic Strategy</span>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof Bar */}
          <div className="relative z-10 pt-3 border-t border-white/15">
            <div className="flex items-center justify-between text-center font-['Open_Sans',sans-serif]">
              <div>
                <p className="text-base font-bold text-amber-300">27+</p>
                <p className="text-[10px] text-stone-300">Avg LNAT</p>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div>
                <p className="text-base font-bold text-amber-300">165+</p>
                <p className="text-[10px] text-stone-300">Avg LSAT</p>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div>
                <p className="text-base font-bold text-emerald-400">92%</p>
                <p className="text-[10px] text-stone-300">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Single Front-View Form (7 Cols) */}
        <div className="col-span-12 lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between h-full bg-white">
          
          {/* Top Bar with Back to Home & Tab Switcher */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Link
                to="/"
                className="inline-flex items-center text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors font-['Open_Sans',sans-serif]"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1 text-amber-700" />
                Back to Home
              </Link>

              {/* Seamless Tab Switcher */}
              <div className="flex bg-stone-100 p-0.5 rounded-lg text-xs font-medium font-['Open_Sans',sans-serif]">
                <button
                  type="button"
                  className="px-3 py-1 bg-white text-stone-900 rounded-md shadow-sm font-semibold transition-all"
                >
                  Sign In
                </button>
                <Link
                  to="/register"
                  className="px-3 py-1 text-stone-600 hover:text-amber-800 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                Welcome Back to{' '}
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  LawEdu
                </span>
              </h1>
              <p className="text-xs text-stone-600 mt-0.5 font-['Open_Sans',sans-serif]">
                Sign in to manage your legal consultations and test prep schedules.
              </p>
            </div>
          </div>

          {/* Active Session Notification (if logged in) */}
          {token && userData && (
            <div className="my-2 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-2 font-['Open_Sans',sans-serif]">
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                  {userData.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="truncate text-xs">
                  <span className="text-amber-800 font-medium">Logged in: </span>
                  <strong className="text-stone-900 font-bold">{userData.name}</strong>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-2.5 py-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-md text-[11px] font-semibold"
                >
                  Dashboard &rarr;
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    toast.info('Signed out');
                  }}
                  className="px-2 py-1 bg-white border border-stone-200 text-stone-700 hover:text-red-700 rounded-md text-[11px] font-semibold"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {/* Quick 1-Click Demo Bar */}
          <div className="my-2 p-2.5 bg-amber-50/80 border border-amber-200 rounded-xl flex items-center justify-between gap-2 font-['Open_Sans',sans-serif]">
            <div className="flex items-center space-x-1.5 text-xs text-amber-950 truncate">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="truncate">Need quick demo? <strong className="font-semibold">One-click student login:</strong></span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              disabled={loading}
              className="text-xs font-semibold px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-md shadow-sm transition-all whitespace-nowrap flex-shrink-0"
            >
              Demo Sign In
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 font-['Open_Sans',sans-serif]">
            
            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="student@lawedu.edu"
                  required
                  className="w-full pl-9 pr-4 py-2.5 bg-stone-50/70 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder-stone-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-medium hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-10 py-2.5 bg-stone-50/70 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-3.5 h-3.5 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-xs text-stone-600">
                  Remember this device for 30 days
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 sm:py-3 px-6 rounded-xl font-semibold text-white text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                loading
                  ? 'bg-amber-600/70 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switch to Register & Security Note */}
          <div className="pt-2 border-t border-stone-100 flex flex-col items-center gap-1 font-['Open_Sans',sans-serif]">
            <p className="text-xs text-stone-600">
              New candidate?{' '}
              <Link
                to="/register"
                className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2 transition-colors"
              >
                Create Candidate Account
              </Link>
            </p>
            <div className="flex items-center space-x-1.5 text-[10px] text-stone-400">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>TLS 256-Bit Encrypted LawEdu Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-sm w-full p-6 relative font-['Open_Sans',sans-serif]">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 mb-3">
              <Lock className="w-5 h-5" />
            </div>

            <h3 className="text-lg font-bold text-stone-900 mb-1 font-['Georgia',serif]">Reset Password</h3>
            <p className="text-xs text-stone-600 mb-4">
              Enter your student email and we will send a password reset verification link.
            </p>

            <form onSubmit={handleForgotSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@lawedu.edu"
                  required
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <div className="flex space-x-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={forgotSubmitted}
                  className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl shadow transition-all"
                >
                  {forgotSubmitted ? 'Sending...' : 'Send Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
