import React, { useState } from 'react';
import { Search, Filter, Download, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sent' | 'received' | 'pending' | 'failed'>('all');

  const transactions = [
    {
      id: 'TXN101',
      name: 'Sneha Reddy',
      upiId: 'sneha@ybl',
      phone: '9011223344',
      amount: -1850,
      status: 'completed',
      date: '2025-07-20T14:30:00Z',
      trustScore: 39,
      canRefund: true
    },
    {
      id: 'TXN102',
      name: 'Ramesh Kumar',
      upiId: 'ramesh@ybl',
      phone: '9876543210',
      amount: 3200,
      status: 'completed',
      date: '2025-07-19T10:15:00Z',
      trustScore: 92,
      canRefund: false
    },
    {
      id: 'TXN103',
      name: 'Vikram Singh',
      upiId: 'vikram@upi',
      phone: '9090909090',
      amount: -500,
      status: 'failed',
      date: '2025-07-18T16:45:00Z',
      trustScore: 20,
      canRefund: false
    },
    {
      id: 'TXN104',
      name: 'Arjun Mehta',
      upiId: 'arjun@upi',
      phone: '9123456789',
      amount: -1200,
      status: 'pending',
      date: '2025-07-18T09:20:00Z',
      trustScore: 58,
      canRefund: true
    },
    {
      id: 'TXN105',
      name: 'Priya Sharma',
      upiId: 'priya@paytm',
      phone: '9988776655',
      amount: 750,
      status: 'completed',
      date: '2025-07-17T13:10:00Z',
      trustScore: 76,
      canRefund: false
    },
    {
      id: 'TXN106',
      name: 'Omkar',
      upiId: 'omkar@upi',
      phone: '9620174461',
      amount: -400,
      status: 'completed',
      date: '2025-07-16T11:00:00Z',
      trustScore: 40,
      canRefund: true
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const matchesSearch = searchTerm === '' ||
                         transaction.name.toLowerCase().includes(lowerSearchTerm) ||
                         transaction.upiId.toLowerCase().includes(lowerSearchTerm) ||
                         transaction.phone.includes(searchTerm);
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'sent' && transaction.amount < 0) ||
                         (filterType === 'received' && transaction.amount > 0) ||
                         transaction.status === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600">Track all your payments and receipts</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, UPI ID, or phone number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="sent">Sent</option>
              <option value="received">Received</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <span className="text-sm font-semibold text-gray-700">
                        {transaction.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-gray-900">{transaction.name}</p>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{transaction.upiId}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <p className={`text-lg font-bold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">ID: {transaction.id}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-10">
              <p className="text-gray-600">No transactions found for "{searchTerm}".</p>
              <p className="text-sm text-gray-400 mt-2">Try a different search term or adjust your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
