import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginProps {
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await login(email, password);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600">Log in to your SecurePay account</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
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
        <button 
          type="submit" 
          disabled={isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <LogIn className="h-5 w-5" />
              <span>Login</span>
            </>
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button onClick={onSwitchToRegister} className="font-medium text-blue-600 hover:underline">
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
