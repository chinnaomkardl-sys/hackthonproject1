import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string, pass: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('chinnaomkardl@gmail.com');
  const [password, setPassword] = useState('omkar');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const success = onLogin(email, password);
    if (!success) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-900">Welcome Back!</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <button type="submit" disabled={isProcessing} className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-semibold disabled:bg-gray-400">
          {isProcessing ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <LogIn className="h-5 w-5" />}
          <span>{isProcessing ? 'Logging in...' : 'Login'}</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
