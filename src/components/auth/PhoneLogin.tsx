import React, { useState } from 'react';
import { Phone, Key, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PhoneLogin: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'enterPhone' | 'enterOtp'>('enterPhone');
  const { signInWithPhone, verifyPhoneOtp } = useAuth();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Ensure phone number has country code
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    const { error } = await signInWithPhone(formattedPhone);
    if (!error) {
      setStep('enterOtp');
    }
    setIsProcessing(false);
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    await verifyPhoneOtp(formattedPhone, otp);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6 pt-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Login with Phone</h1>
        <p className="text-gray-600">
          {step === 'enterPhone' ? 'We will send you a one-time password.' : 'Enter the OTP sent to your phone.'}
        </p>
      </div>

      {step === 'enterPhone' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., 9876543210"
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
            {isProcessing ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">One-Time Password (OTP)</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
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
            {isProcessing ? 'Verifying...' : <><LogIn className="h-5 w-5" /><span>Verify & Login</span></>}
          </button>
          <button
            type="button"
            onClick={() => setStep('enterPhone')}
            className="w-full text-center text-sm text-gray-600 hover:underline"
          >
            Use a different phone number
          </button>
        </form>
      )}
    </div>
  );
};

export default PhoneLogin;
