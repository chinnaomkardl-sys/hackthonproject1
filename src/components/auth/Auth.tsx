import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import PhoneLogin from './PhoneLogin';
import { Mail, Phone } from 'lucide-react';

const Auth: React.FC = () => {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [view, setView] = useState<'login' | 'register'>('login');

  const renderEmailAuth = () => {
    if (view === 'login') {
      return <Login onSwitchToRegister={() => setView('register')} />;
    }
    return <Register onSwitchToLogin={() => setView('login')} />;
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
        <div className="flex justify-center border-b border-gray-200">
          <button
            onClick={() => setAuthMethod('email')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              authMethod === 'email'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Mail className="h-5 w-5" />
            <span>Email & Password</span>
          </button>
          <button
            onClick={() => setAuthMethod('phone')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
              authMethod === 'phone'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Phone className="h-5 w-5" />
            <span>Phone OTP</span>
          </button>
        </div>

        {authMethod === 'email' ? renderEmailAuth() : <PhoneLogin />}
      </div>
    </div>
  );
};

export default Auth;
