import { useState } from 'react';  // Import missing useState hook

// Landing Page Component
const LandingPage = ({ setCurrentPage }) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
    <button
      onClick={() => setCurrentPage('login')}
      className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-6"
    >
      ⚡ Start Your Musical Journey
    </button>
  </div>
);

// Login Page Component
const LoginPage = ({ setCurrentPage, formData, setFormData, handleSignIn, showPassword, setShowPassword }) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Sign In</button>
    </form>
  </div>
);

// Register Page Component
const RegisterPage = ({ setCurrentPage, formData, setFormData, handleSignUp, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <input
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        required
      />
      <button type="submit">Register</button>
    </form>
  </div>
);

// Main Landing, Login, Register Page Control
const SmazLanding = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Sign in attempted with:', formData);
    // Handle sign-in logic (API call, validation, etc.)
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Sign up attempted with:', formData);
    // Handle sign-up logic (API call, validation, etc.)
  };

  return currentPage === 'landing' ? (
    <LandingPage setCurrentPage={setCurrentPage} />
  ) : currentPage === 'login' ? (
    <LoginPage
      setCurrentPage={setCurrentPage}
      formData={formData}
      setFormData={setFormData}
      handleSignIn={handleSignIn}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
    />
  ) : (
    <RegisterPage
      setCurrentPage={setCurrentPage}
      formData={formData}
      setFormData={setFormData}
      handleSignUp={handleSignUp}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
    />
  );
};

// Spotify Login Button Component
function SpotifyLoginButton() {
  const CLIENT_ID = '193e0da518ae415bb5d5268a35448e6e';
  const REDIRECT_URI = 'http://127.0.0.1:5000/auth/callback';
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const RESPONSE_TYPE = 'token';

  const scopes = [
    'user-read-email',
    'user-read-private',
    'user-top-read',
  ];

  const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${scopes.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

  return (
    <a href={loginUrl}>
      <button className="w-full bg-green-500 text-white font-bold py-3 rounded-2xl hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-2">
        <span role="img" aria-label="spotify">
          🎵
        </span>
        <span>Continue with Spotify</span>
      </button>
    </a>
  );
}

// Main App Component
function App() {
  return <SmazLanding />;
}

export default App;
