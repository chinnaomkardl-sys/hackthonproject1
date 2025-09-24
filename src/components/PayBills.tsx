import React, { useState } from 'react';
import { ArrowLeft, Zap, Wifi, Phone, Car, Home, CreditCard, Calendar, Search } from 'lucide-react';

interface PayBillsProps {
  onBack: () => void;
}

const PayBills: React.FC<PayBillsProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [billDetails, setBillDetails] = useState({
    provider: '',
    accountNumber: '',
    amount: '',
    dueDate: ''
  });

  const billCategories = [
    {
      id: 'electricity',
      name: 'Electricity',
      icon: Zap,
      color: 'bg-yellow-100 text-yellow-600',
      providers: ['BESCOM', 'KSEB', 'MSEB', 'TNEB', 'WBSEDCL']
    },
    {
      id: 'internet',
      name: 'Internet & Cable',
      icon: Wifi,
      color: 'bg-blue-100 text-blue-600',
      providers: ['Airtel', 'Jio Fiber', 'BSNL', 'Tata Sky', 'Dish TV']
    },
    {
      id: 'mobile',
      name: 'Mobile',
      icon: Phone,
      color: 'bg-green-100 text-green-600',
      providers: ['Airtel', 'Jio', 'Vi', 'BSNL']
    },
    {
      id: 'gas',
      name: 'Gas',
      icon: Home,
      color: 'bg-orange-100 text-orange-600',
      providers: ['Indane', 'HP Gas', 'Bharat Gas']
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: Car,
      color: 'bg-purple-100 text-purple-600',
      providers: ['LIC', 'HDFC Life', 'ICICI Prudential', 'SBI Life']
    },
    {
      id: 'credit-card',
      name: 'Credit Card',
      icon: CreditCard,
      color: 'bg-red-100 text-red-600',
      providers: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak']
    }
  ];

  const recentBills = [
    { provider: 'BESCOM', account: '****1234', amount: 1250, dueDate: '2024-01-20', category: 'Electricity' },
    { provider: 'Airtel', account: '****5678', amount: 599, dueDate: '2024-01-18', category: 'Mobile' },
    { provider: 'Jio Fiber', account: '****9012', amount: 999, dueDate: '2024-01-22', category: 'Internet' }
  ];

  const handlePayBill = () => {
    if (!billDetails.provider || !billDetails.accountNumber || !billDetails.amount) {
      alert('Please fill all required fields');
      return;
    }
    
    alert(`Bill payment of ₹${billDetails.amount} for ${billDetails.provider} initiated successfully!`);
    setBillDetails({ provider: '', accountNumber: '', amount: '', dueDate: '' });
    setSelectedCategory(null);
  };

  const selectedCategoryData = billCategories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={selectedCategory ? () => setSelectedCategory(null) : onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedCategory ? selectedCategoryData?.name : 'Pay Bills'}
          </h1>
          <p className="text-gray-600">
            {selectedCategory ? 'Enter your bill details' : 'Pay your utility bills instantly'}
          </p>
        </div>
      </div>

      {!selectedCategory ? (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for billers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Bill Categories */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Categories</h3>
            <div className="grid grid-cols-2 gap-4">
              {billCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{category.name}</p>
                      <p className="text-sm text-gray-500">{category.providers.length} providers</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Bills */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bills</h3>
            <div className="space-y-3">
              {recentBills.map((bill, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-blue-700">
                        {bill.provider.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{bill.provider}</p>
                      <p className="text-sm text-gray-500">{bill.account} • {bill.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{bill.amount}</p>
                    <p className="text-sm text-red-600">Due: {new Date(bill.dueDate).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Bill Payment Form */
        <div className="space-y-6">
          {/* Provider Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Provider</h3>
            <div className="grid grid-cols-1 gap-3">
              {selectedCategoryData?.providers.map((provider) => (
                <button
                  key={provider}
                  onClick={() => setBillDetails({...billDetails, provider})}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    billDetails.provider === provider
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${selectedCategoryData.color}`}>
                      <selectedCategoryData.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-900">{provider}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bill Details Form */}
          {billDetails.provider && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number / Consumer ID
                  </label>
                  <input
                    type="text"
                    value={billDetails.accountNumber}
                    onChange={(e) => setBillDetails({...billDetails, accountNumber: e.target.value})}
                    placeholder="Enter your account number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      value={billDetails.amount}
                      onChange={(e) => setBillDetails({...billDetails, amount: e.target.value})}
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date (Optional)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={billDetails.dueDate}
                      onChange={(e) => setBillDetails({...billDetails, dueDate: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePayBill}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
                >
                  Pay Bill - ₹{billDetails.amount || '0'}
                </button>
              </div>
            </div>
          )}

          {/* Bill Payment Benefits */}
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Why Pay Bills with SecurePay?</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Instant payment confirmation</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>No additional charges</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Secure and encrypted transactions</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>24/7 customer support</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayBills;
