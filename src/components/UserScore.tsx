import React, { useState } from 'react';
import { Star, TrendingUp, Award, Shield, CheckCircle, Clock } from 'lucide-react';

const UserScore = () => {
  const [userScore] = useState(82);
  const [scoreHistory] = useState([
    { date: '2024-01-15', score: 82, change: +3, reason: 'Timely repayment' },
    { date: '2024-01-05', score: 79, change: +5, reason: 'Trustworthy transaction' },
    { date: '2024-01-01', score: 74, change: +4, reason: 'Positive feedback' },
    { date: '2023-12-20', score: 70, change: +2, reason: 'Completed KYC' },
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    return 'Fair';
  };

  const scoreCategories = [
    { title: 'Payment History', score: 92, description: 'Timely payments and repayments', icon: Clock, color: 'green' },
    { title: 'Trust Rating', score: 85, description: 'Based on user feedback and reports', icon: Shield, color: 'green' },
    { title: 'Transaction Volume', score: 78, description: 'Frequency and amount of transactions', icon: TrendingUp, color: 'yellow' },
    { title: 'Account Verification', score: 75, description: 'KYC and document verification status', icon: CheckCircle, color: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Trust Score</h1>
        <p className="text-gray-600">Your payment reliability and trustworthiness rating</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getScoreGradient(userScore)} mb-6`}>
            <span className="text-4xl font-bold text-white">{userScore}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{getScoreLabel(userScore)}</h2>
          <p className="text-gray-600 mb-6">Your current trust score is in the "{getScoreLabel(userScore).toLowerCase()}" range</p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">32</p>
              <p className="text-sm text-gray-600">Positive Points</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-gray-600">0</p>
              <p className="text-sm text-gray-600">Negative Points</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Score Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scoreCategories.map((category, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${category.color === 'green' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <category.icon className={`h-6 w-6 ${category.color === 'green' ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-gray-900">{category.title}</h4>
                  <span className={`font-bold ${getScoreColor(category.score)}`}>{category.score}/100</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full bg-gradient-to-r ${category.color === 'green' ? 'from-green-400 to-green-600' : 'from-yellow-400 to-yellow-600'}`} style={{ width: `${category.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Score History</h3>
        <div className="space-y-4">
          {scoreHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-green-100">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{entry.reason}</p>
                  <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-600">+{entry.change}</p>
                <p className="text-sm text-gray-500">Score: {entry.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserScore;
