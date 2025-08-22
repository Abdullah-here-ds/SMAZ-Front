import { useState } from 'react';
import { Heart, Music, MapPin, Shield, Sparkles, Mail, Lock, Eye, EyeOff } from 'lucide-react';

function TailwindTest() {
  return (
    <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-8 rounded-xl shadow-lg m-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Tailwind CSS is working!</h1>
      <p className="text-lg">If you can see this styled card, Tailwind is properly configured.</p>
      <button className="mt-4 bg-white text-rose-600 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
        Test Button
      </button>
    </div>
  );
}


const SmazLanding = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in attempted with:', formData);
    // Handle sign in logic here
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign up attempted with:', formData);
    // Handle sign up logic here
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SMAZ</h1>
              <p className="text-sm text-gray-600">MATCH YOUR MELODY</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
              <span className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                SMAZ
              </span>
              <Music className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-sm text-gray-500 tracking-wider uppercase">Match Your Melody</p>
          </div>

          <h2 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to SMAZ
          </h2>

          <h3 className="text-3xl font-semibold text-rose-600 mb-8">
            Match Your Melody
          </h3>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The music dating app that connects hearts through music across Europe.
          </p>
        </div>

        {/* Features Section */}
        <div className="space-y-6 mb-12">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start space-x-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Intelligent Music Matching
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                AI analyzes your music tastes and finds people with perfect compatibility
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start space-x-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                European Connections
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Meet people in 47 European countries, with priority given to your area.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex items-start space-x-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Safe and Fun Chats
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Chat only with confirmed matches, share photos, audio and videos
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-3xl shadow-xl p-10 mb-12">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-8 h-8 text-rose-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <p className="text-lg text-gray-700">
                Create your profile and share your favorite music
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <p className="text-lg text-gray-700">
                AI analyzes your tastes and finds compatible people
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <p className="text-lg text-gray-700">
                Like, get matches, and start chatting!
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            onClick={() => setCurrentPage('login')}
            className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-6"
          >
            ⚡ Start Your Musical Journey
          </button>

          <p className="text-gray-500 text-lg">
            Join thousands of people who have already found love through music.
          </p>
        </div>
      </main>
    </div>
  );

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SMAZ</h1>
              <p className="text-sm text-gray-600">MATCH YOUR MELODY</p>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-rose-500" />
              <span className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
                SMAZ
              </span>
              <Music className="w-8 h-8 text-rose-500" />
            </div>
            <p className="text-sm text-gray-500 tracking-wider uppercase">Match Your Melody</p>
          </div>

          <h2 className="text-4xl font-bold text-rose-600 mb-6">
            Welcome to SMAZ
          </h2>

          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Match Your Melody
          </h3>

          <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5 text-rose-500" />
              <span>Music</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Love</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">EU</span>
              <span>Europe</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h3>
            <p className="text-gray-600">Sign in to find your musical match</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your-email@example.com"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500 focus:ring-2"
              />
              <label htmlFor="remember" className="ml-3 text-gray-700">
                Remember me on this device
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-2xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentPage('register')}
                className="text-rose-600 font-semibold hover:text-rose-700 transition-colors"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );

  const RegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">SMAZ</h1>
              <p className="text-sm text-gray-600">MATCH YOUR MELODY</p>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Match Your Melody
          </h2>

          <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
            <div className="flex items-center space-x-2">
              <Music className="w-5 h-5 text-rose-500" />
              <span>Music</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Love</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">EU</span>
              <span>Europe</span>
            </div>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h3>
            <p className="text-gray-600">Create your account to get started</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your-email@example.com"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-gray-700"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Your password"
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-200 transition-all text-gray-700"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-signup"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 text-rose-600 border-gray-300 rounded focus:ring-rose-500 focus:ring-2"
              />
              <label htmlFor="remember-signup" className="ml-3 text-gray-700">
                Remember me on this device
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-bold py-4 rounded-2xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentPage('login')}
                className="text-rose-600 font-semibold hover:text-rose-700 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );

  return currentPage === 'landing' ? <LandingPage /> : currentPage === 'login' ? <LoginPage /> : <RegisterPage />;
};

function App() {
  return <SmazLanding />;
}

export default App;