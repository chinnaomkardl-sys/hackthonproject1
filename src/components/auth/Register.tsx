import React, { useState } from 'react';
import { Mail, Lock, User, UserPlus, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RegisterProps {
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { register } = useAuth();
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setIsProcessing(true);
    const { error } = await register(fullName, email, password);
    if (!error) {
      setRegistrationSuccess(true);
    }
    setIsProcessing(false);
  };

  if (registrationSuccess) {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="inline-block bg-green-100 p-4 rounded-full">
          <Send className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
        <p className="text-gray-600 max-w-sm mx-auto">
          We've sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
        </p>
        <button onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:underline">
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-600">Join SecurePay for safe transactions</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Omkar" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              required 
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <UserPlus className="h-5 w-5" />
              <span>Register</span>
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:underline">
          Log in here
        </button>
      </p>
    </div>
  );
};

export default Register;
