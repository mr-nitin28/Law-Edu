import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { 
  Scale, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck, 
  BookOpen, 
  CheckCircle2,
  Sparkles,
  X
} from 'lucide-react';

const Register = () => {
  const { setToken, setUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    targetFocus: 'LSAT Preparation',
    password: '',
    confirmPassword: '',
    agreedToTerms: true
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Real-time password strength meter
  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: 'bg-stone-200' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-amber-400' };
    if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 3, label: 'Good', color: 'bg-amber-600' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-600' };
  };

  const strength = getPasswordStrength();
  const passwordsMatch = formData.confirmPassword && formData.password === formData.confirmPassword;

  const validateForm = () => {
    if (formData.name.trim().length < 2) {
      toast.error('Please enter your full legal name (minimum 2 characters)');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match. Please verify.');
      return false;
    }

    if (!formData.agreedToTerms) {
      toast.error('Please accept the LawEdu Terms of Service to continue');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    setTimeout(() => {
      try {
        const trimmedEmail = formData.email.trim().toLowerCase();
        const newStudentUser = {
          id: `user_${Date.now()}`,
          name: formData.name.trim(),
          email: trimmedEmail,
          focus: formData.targetFocus,
          phone: '',
          location: '',
          role: 'student',
          createdAt: new Date().toISOString()
        };

        const sessionToken = `lawedu_token_${Date.now()}`;
        
        localStorage.setItem('token', sessionToken);
        localStorage.setItem('userData', JSON.stringify(newStudentUser));
        
        setToken(sessionToken);
        setUserData(newStudentUser);
        
        toast.success(`Welcome to LawEdu, ${newStudentUser.name}!`);
        navigate('/dashboard', { replace: true });
      } catch (err) {
        console.error('Registration error:', err);
        toast.error('Failed to create account. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 200);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-stone-100 via-amber-50/25 to-stone-200 flex items-center justify-center p-3 sm:p-5 lg:p-6 font-['Georgia','Times_New_Roman',serif] overflow-y-auto lg:overflow-hidden select-none">
      
      {/* Main Single Front-View Container */}
      <div className="w-full max-w-5xl h-auto lg:h-[90vh] max-h-[660px] bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative">
        
        {/* Left Side: Real Image with Gradient Overlay & Content (5 Cols) */}
        <div className="hidden lg:relative lg:flex lg:col-span-5 overflow-hidden flex-col justify-between p-7 text-white">
          
          {/* Background Image */}
          <img
            src={assets.contact_image}
            alt="LawEdu Campus & Library"
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
              Join 5,000+ Future Lawyers
            </div>
          </div>

          {/* Middle Highlight Details */}
          <div className="relative z-10 space-y-2.5 font-['Open_Sans',sans-serif]">
            <h2 className="text-2xl font-bold leading-snug text-white font-['Georgia',serif]">
              Launch Your Legal Career with Confidence
            </h2>
            <p className="text-xs text-stone-200 leading-relaxed">
              Create your candidate profile for personalized LSAT/LNAT prep, 1-on-1 consultations, and admissions strategy.
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-stone-200">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Full Diagnostic Test &amp; Score Roadmap</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Free Initial Tutor Consultation</span>
              </div>
            </div>
          </div>

          {/* Bottom Social Proof Bar */}
          <div className="relative z-10 pt-3 border-t border-white/15">
            <div className="flex items-center justify-between text-center font-['Open_Sans',sans-serif]">
              <div>
                <p className="text-base font-bold text-amber-300">50+</p>
                <p className="text-[10px] text-stone-300">Legal Tutors</p>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div>
                <p className="text-base font-bold text-amber-300">100%</p>
                <p className="text-[10px] text-stone-300">Verified Prep</p>
              </div>
              <div className="w-px h-5 bg-white/20" />
              <div>
                <p className="text-base font-bold text-emerald-400">92%</p>
                <p className="text-[10px] text-stone-300">Target Scores</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Clean Single Front-View Form (7 Cols) */}
        <div className="col-span-12 lg:col-span-7 p-6 sm:p-8 lg:p-9 flex flex-col justify-between h-full bg-white">
          
          {/* Top Bar with Back to Home & Tab Switcher */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Link
                to="/"
                className="inline-flex items-center text-xs font-semibold text-stone-600 hover:text-amber-800 transition-colors font-['Open_Sans',sans-serif]"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1 text-amber-700" />
                Back to Home
              </Link>

              {/* Seamless Tab Switcher */}
              <div className="flex bg-stone-100 p-0.5 rounded-lg text-xs font-medium font-['Open_Sans',sans-serif]">
                <Link
                  to="/login"
                  className="px-3 py-1 text-stone-600 hover:text-amber-800 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <button
                  type="button"
                  className="px-3 py-1 bg-white text-stone-900 rounded-md shadow-sm font-semibold transition-all"
                >
                  Register
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
                Create Your{' '}
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  Student Account
                </span>
              </h1>
              <p className="text-xs text-stone-600 mt-0.5 font-['Open_Sans',sans-serif]">
                Join LawEdu to prepare for top law school admissions and book consultations.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-2.5 font-['Open_Sans',sans-serif] my-auto">
            
            {/* Full Name & Email in 2 columns on sm/lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Alexandra Bennett"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-stone-50/70 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder-stone-400"
                  />
                </div>
              </div>

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
                    placeholder="alexandra@example.com"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-stone-50/70 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder-stone-400"
                  />
                </div>
              </div>
            </div>

            {/* Primary Study Focus */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Primary Study Focus
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <select
                  name="targetFocus"
                  value={formData.targetFocus}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50/70 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
                >
                  <option value="LSAT Preparation">LSAT Preparation (US &amp; Canada)</option>
                  <option value="LNAT Preparation">LNAT Preparation (UK &amp; International)</option>
                  <option value="Law School Admissions">Law School Admissions Guidance</option>
                  <option value="Corporate & General Law">Corporate &amp; General Law</option>
                </select>
              </div>
            </div>

            {/* Password & Confirm Password in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Password */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Min. 6 chars"
                    required
                    className="w-full pl-9 pr-9 py-2 bg-stone-50/70 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all placeholder-stone-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {/* Strength bar */}
                {formData.password && (
                  <div className="mt-1 flex items-center space-x-1.5">
                    <div className="flex-1 grid grid-cols-4 gap-1 h-1">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`rounded-full transition-all ${
                            step <= strength.score ? strength.color : 'bg-stone-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold text-stone-500">
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                    Confirm Password
                  </label>
                  {formData.confirmPassword && (
                    <span className={`text-[10px] font-medium flex items-center ${passwordsMatch ? 'text-emerald-600' : 'text-amber-700'}`}>
                      {passwordsMatch ? '✓ Matches' : 'Mismatch'}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Repeat password"
                    required
                    className={`w-full pl-9 pr-9 py-2 bg-stone-50/70 hover:bg-white focus:bg-white text-stone-900 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-stone-400 ${
                      formData.confirmPassword && !passwordsMatch
                        ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500'
                        : 'border-stone-300 focus:ring-amber-500/20 focus:border-amber-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-0.5">
              <label className="flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="w-3.5 h-3.5 text-amber-600 border-stone-300 rounded focus:ring-amber-500"
                />
                <span className="ml-2 text-xs text-stone-600">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2"
                  >
                    Terms of Service
                  </button>{' '}
                  &amp;{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2"
                  >
                    Privacy Policy
                  </button>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Candidate Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switch to Sign In & Security Note */}
          <div className="pt-2 border-t border-stone-100 flex flex-col items-center gap-1 font-['Open_Sans',sans-serif]">
            <p className="text-xs text-stone-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-amber-700 hover:text-amber-800 font-semibold underline underline-offset-2 transition-colors"
              >
                Sign In to Student Portal
              </Link>
            </p>
            <div className="flex items-center space-x-1.5 text-[10px] text-stone-400">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>TLS 256-Bit Encrypted LawEdu Registration Protocol</span>
            </div>
          </div>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-md w-full p-6 relative font-['Open_Sans',sans-serif]">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900 font-['Georgia',serif]">LawEdu Academic Terms</h3>
                <p className="text-[11px] text-stone-500">Student Candidate Agreement</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-600 leading-relaxed max-h-60 overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-stone-800 mb-0.5">1. Admissions Mentorship</h4>
                <p>LawEdu delivers personalized LSAT &amp; LNAT coaching designed to maximize admissions readiness. All resources are curated by certified tutors.</p>
              </div>
              <div>
                <h4 className="font-bold text-stone-800 mb-0.5">2. Candidate Privacy</h4>
                <p>Student test scores, assessments, and profile information are encrypted using 256-bit protocols and are never shared with unauthorized parties.</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl shadow transition-all"
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
