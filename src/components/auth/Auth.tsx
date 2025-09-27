import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import { Shield } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string, pass: string) => boolean;
  onRegister: (name: string, email: string, pass: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onRegister }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full">
        <div className="flex justify-center items-center space-x-3 mb-8">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-900">SecurePay</h1>
                <p className="text-sm text-gray-500">Secure & Trusted Payments</p>
            </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          {isLoginView ? (
            <Login onLogin={onLogin} />
          ) : (
            <Register onRegister={onRegister} />
          )}

          <div className="text-center mt-6">
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {isLoginView
                ? "Don't have an account? Register"
                : 'Already have an account? Login'}
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
            Note: This login screen is for demonstration purposes and uses mock credentials. It is not connected to Supabase authentication.
        </p>
      </div>
    </div>
  );
};

export default Auth;
