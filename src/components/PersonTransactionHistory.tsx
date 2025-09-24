import React, { useState } from 'react';
import { ArrowLeft, Send, Download, MessageCircle, AlertTriangle, CheckCircle, Clock, RefreshCw } from 'lucide-react';

interface PersonTransactionHistoryProps {
  personName: string;
  onBack: () => void;
}

const PersonTransactionHistory: React.FC<PersonTransactionHistoryProps> = ({ personName, onBack }) => {
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  // Mock data for the specific person
  const personData = {
    name: personName,
    upi: `${personName.toLowerCase().replace(' ', '.')}@paytm`,
    trustScore: Math.floor(Math.random() * 100),
    totalTransactions: Math.floor(Math.random() * 50) + 10,
    totalAmount: Math.floor(Math.random() * 50000) + 10000,
    avatar: personName.split(' ').map(n => n[0]).join('')
  };

  const transactions = [
    {
      id: 'TXN001',
      amount: -2500,
      type: 'sent',
      status: 'completed',
      date: '2024-01-15T14:30:00Z',
      note: 'Dinner payment',
      canRefund: false
    },
    {
      id: 'TXN002',
      amount: 1200,
      type: 'received',
      status: 'completed',
      date: '2024-01-12T10:15:00Z',
      note: 'Movie tickets',
      canRefund: false
    },
    {
      id: 'TXN003',
      amount: -850,
      type: 'sent',
      status: 'pending',
      date: '2024-01-10T16:45:00Z',
      note: 'Grocery shopping',
      canRefund: true
    },
    {
      id: 'TXN004',
      amount: 3200,
      type: 'received',
      status: 'completed',
      date: '2024-01-08T09:20:00Z',
      note: 'Loan repayment',
      canRefund: false
    },
    {
      id: 'TXN005',
      amount: -750,
      type: 'sent',
      status: 'failed',
      date: '2024-01-05T13:10:00Z',
      note: 'Cab fare',
      canRefund: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600 bg-green-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRefund = (transactionId: string) => {
    setSelectedTransaction(transactionId);
    setShowRefundModal(true);
  };

  const processRefund = () => {
    alert(`Refund request submitted for transaction ${selectedTransaction}`);
    setShowRefundModal(false);
    setSelectedTransaction(null);
  };

  const totalSent = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalReceived = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalReceived - totalSent;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600">All transactions with {personData.name}</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Person Profile */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-blue-700">{personData.avatar}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{personData.name}</h2>
            <p className="text-gray-600">{personData.upi}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-500">Trust Score:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTrustScoreColor(personData.trustScore)}`}>
                  {personData.trustScore}%
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {personData.totalTransactions} transactions
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors">
              <Send className="h-5 w-5" />
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors">
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sent</p>
              <p className="text-2xl font-bold text-red-600">₹{totalSent.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Send className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Received</p>
              <p className="text-2xl font-bold text-green-600">₹{totalReceived.toLocaleString('en-IN')}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Download className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Balance</p>
              <p className={`text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netBalance >= 0 ? '+' : ''}₹{netBalance.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">All Transactions</h3>
        </div>
        
        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.amount > 0 ? (
                      <Download className="h-6 w-6 text-green-600" />
                    ) : (
                      <Send className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-gray-900">
                        {transaction.amount > 0 ? 'Received from' : 'Sent to'} {personData.name}
                      </p>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </div>
                      {transaction.canRefund && (
                        <button
                          onClick={() => handleRefund(transaction.id)}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full hover:bg-orange-200 transition-colors"
                        >
                          Request Refund
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{transaction.note}</p>
                    <div className="flex items-center space-x-4">
                      <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                      <p className="text-xs text-gray-500">ID: {transaction.id}</p>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Refund</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to request a refund for transaction {selectedTransaction}? 
                The recipient will be notified and has 48 hours to respond.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processRefund}
                  className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
                >
                  Request Refund
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonTransactionHistory;
