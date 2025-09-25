import React, { useState } from 'react';
import { Search, Filter, Download, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock } from 'lucide-react';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sent' | 'received' | 'pending' | 'failed'>('all');

  const transactions = [
    { id: 'TXN101', name: 'Sneha Reddy', upiId: 'sneha@ybl', phone: '9011223344', amount: -1850, type: 'sent', status: 'completed', date: '2025-07-20T14:30:00Z', trustScore: 39, canRefund: true },
    { id: 'TXN102', name: 'Ramesh Kumar', upiId: 'ramesh@ybl', phone: '9876543210', amount: 3200, type: 'received', status: 'completed', date: '2025-07-19T10:15:00Z', trustScore: 92, canRefund: false },
    { id: 'TXN103', name: 'Vikram Singh', upiId: 'vikram@upi', phone: '9090909090', amount: -500, type: 'sent', status: 'failed', date: '2025-07-18T16:45:00Z', trustScore: 20, canRefund: false },
    { id: 'TXN104', name: 'Arjun Mehta', upiId: 'arjun@upi', phone: '9123456789', amount: -1200, type: 'sent', status: 'pending', date: '2025-07-18T09:20:00Z', trustScore: 58, canRefund: true },
    { id: 'TXN105', name: 'Priya Sharma', upiId: 'priya@paytm', phone: '9988776655', amount: 750, type: 'received', status: 'completed', date: '2025-07-17T13:10:00Z', trustScore: 76, canRefund: false },
    { id: 'TXN106', name: 'Omkar', upiId: 'omkar@upi', phone: '9620174461', amount: -400, type: 'sent', status: 'completed', date: '2025-07-16T11:00:00Z', trustScore: 40, canRefund: true }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = transaction.name.toLowerCase().includes(term) ||
                         transaction.upiId.toLowerCase().includes(term) ||
                         transaction.phone.includes(term);
    const matchesFilter = filterType === 'all' || transaction.status === filterType || 
                         (filterType === 'sent' && transaction.amount < 0) ||
                         (filterType === 'received' && transaction.amount > 0);
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'pending') return <Clock className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'text-green-600 bg-green-50';
    if (status === 'pending') return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600">Track all your payments and receipts</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, UPI ID, or phone number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)} className="px-4 py-2 rounded-xl border border-gray-200 bg-white">
            <option value="all">All Types</option>
            <option value="sent">Sent</option>
            <option value="received">Received</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        
        {filteredTransactions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.amount > 0 ? 'bg-green-100' : 'bg-blue-100'}`}>
                      <span className="text-sm font-semibold text-gray-700">{tx.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{tx.name}</p>
                      <p className="text-sm text-gray-600">{tx.upiId}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(tx.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString('en-IN')}
                    </p>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium mt-1 ${getStatusColor(tx.status)}`}>
                      {getStatusIcon(tx.status)}
                      <span>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-10">
            <p className="text-gray-600">No transactions found.</p>
            {searchTerm && <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
