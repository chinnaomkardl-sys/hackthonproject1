import React, { useState } from 'react';
import { Send, QrCode, CreditCard, Plus, ArrowRight, Wallet, Star } from 'lucide-react';

interface DashboardProps {
  onSendMoney: (recipient: string, amount: number) => boolean;
  onNavigate: (view: string) => void;
  onViewPersonHistory: (personName: string) => void;
  onNavigateToScoreTab: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSendMoney, onNavigate, onViewPersonHistory, onNavigateToScoreTab }) => {
  const [balance] = useState(25420.50);
  const userTrustScore = 78;

  const handleAddMoney = () => {
    const reloadAmount = Math.floor(Math.random() * 5000) + 1000;
    alert(`This is a demo. A real app would initiate adding money. Mock amount: ₹${reloadAmount.toFixed(2)}`);
  };

  const handleCheckBalance = () => {
    alert(`Your available balance is: ₹${balance.toLocaleString('en-IN')}`);
  };

  const recentTransactions = [
    { name: 'Priya Sharma', amount: 1200, type: 'received', time: '1 day ago', avatar: 'PS' },
    { name: 'Arjun Mehta', amount: -850, type: 'sent', time: '2 days ago', avatar: 'AM' },
    { name: 'Sneha Reddy', amount: -390, type: 'sent', time: '3 days ago', avatar: 'SR' },
    { name: 'Ramesh Kumar', amount: 5000, type: 'received', time: '4 days ago', avatar: 'RK' },
  ];

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
              onClick={onNavigateToScoreTab}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              View Details
            </button>
            <button
              onClick={handleAddMoney}
              className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Money</span>
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

      {/* Recent Transactions Preview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <button onClick={() => alert('Navigating to all transactions...')} className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <button
              key={index}
              onClick={() => onViewPersonHistory(transaction.name)}
              className="w-full flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'sent' ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <span className="text-sm font-semibold text-gray-700">
                    {transaction.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{transaction.name}</p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
