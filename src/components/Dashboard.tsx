import React from 'react';
import { Send, QrCode, CreditCard, ArrowRight, Wallet, Star } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface DashboardProps {
  onNavigate: (view: string) => void;
  onViewPersonHistory: (personName: string) => void;
  onNavigateToProfileTab: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onViewPersonHistory, onNavigateToProfileTab }) => {
  const balance = 25420.50;
  const userTrustScore = 78;
  const { showToast } = useToast();

  const handleCheckBalance = () => {
    showToast(`Your available balance is: ₹${balance.toLocaleString('en-IN')}`, 'info');
  };

  return (
    <div className="space-y-8">
      {/* Trust Score Card */}
      <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-200 text-sm">Trust Score</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star className="h-7 w-7 text-yellow-300" />
              <h2 className="text-3xl font-bold text-yellow-300">
                {userTrustScore} / 100
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onNavigateToProfileTab}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              My Profile
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <button 
          onClick={() => onNavigate('send-money')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col items-center justify-center space-y-2"
        >
          <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center">
            <Send className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm font-semibold text-gray-900">Send Money</p>
        </button>
        
        <button 
          onClick={() => onNavigate('scan-qr')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col items-center justify-center space-y-2"
        >
          <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center">
            <QrCode className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm font-semibold text-gray-900">Scan QR</p>
        </button>
        
        <button 
          onClick={() => onNavigate('pay-bills')}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col items-center justify-center space-y-2"
        >
          <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-sm font-semibold text-gray-900">Pay Bills</p>
        </button>

        <button 
          onClick={handleCheckBalance}
          className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col items-center justify-center space-y-2"
        >
          <div className="bg-indigo-100 w-14 h-14 rounded-full flex items-center justify-center">
            <Wallet className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-gray-900">Check Balance</p>
        </button>
      </div>

      {/* This section has been removed as per your request */}
      {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"> ... </div> */}
    </div>
  );
};

export default Dashboard;
