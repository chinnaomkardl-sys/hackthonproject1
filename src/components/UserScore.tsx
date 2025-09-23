import React, { useState } from 'react';
import { Star, TrendingUp, Award, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const UserScore = () => {
  const [userScore] = useState(78);
  const [scoreHistory] = useState([
    { date: '2024-01-15', score: 78, change: +3, reason: 'Timely repayment' },
    { date: '2024-01-10', score: 75, change: -2, reason: 'Late payment reported' },
    { date: '2024-01-05', score: 77, change: +5, reason: 'Trustworthy transaction' },
    { date: '2024-01-01', score: 72, change: +4, reason: 'Positive feedback' }
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
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Very Poor';
  };

  const scoreCategories = [
    {
      title: 'Payment History',
      score: 85,
      description: 'Timely payments and repayments',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Trust Rating',
      score: 72,
      description: 'Based on user feedback and reports',
      icon: Shield,
      color: 'yellow'
    },
    {
      title: 'Transaction Volume',
      score: 90,
      description: 'Frequency and amount of transactions',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Account Verification',
      score: 65,
      description: 'KYC and document verification status',
      icon: CheckCircle,
      color: 'yellow'
    }
  ];

  const achievements = [
    { title: 'First Transaction', icon: Star, earned: true, date: '2023-12-01' },
    { title: 'Trusted User', icon: Shield, earned: true, date: '2024-01-15' },
    { title: '100 Transactions', icon: Award, earned: false, progress: 67 },
    { title: 'Perfect Month', icon: CheckCircle, earned: false, progress: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Trust Score</h1>
        <p className="text-gray-600">Your payment reliability and trustworthiness rating</p>
      </div>

      {/* Main Score Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br ${getScoreGradient(userScore)} mb-6`}>
            <span className="text-4xl font-bold text-white">{userScore}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{getScoreLabel(userScore)}</h2>
          <p className="text-gray-600 mb-6">Your current trust score is in the "{getScoreLabel(userScore).toLowerCase()}" range</p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">23</p>
              <p className="text-sm text-gray-600">Positive Points</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-red-600">5</p>
              <p className="text-sm text-gray-600">Negative Points</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-2xl font-bold text-blue-600">156</p>
              <p className="text-sm text-gray-600">Total Transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Score Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scoreCategories.map((category, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${
                category.color === 'green' ? 'bg-green-100' :
                category.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <category.icon className={`h-6 w-6 ${
                  category.color === 'green' ? 'text-green-600' :
                  category.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-gray-900">{category.title}</h4>
                  <span className={`font-bold ${getScoreColor(category.score)}`}>
                    {category.score}/100
                  </span>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      category.color === 'green' ? 'from-green-400 to-green-600' :
                      category.color === 'yellow' ? 'from-yellow-400 to-yellow-600' : 'from-red-400 to-red-600'
                    }`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Score History</h3>
        <div className="space-y-4">
          {scoreHistory.map((entry, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  entry.change > 0 ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {entry.change > 0 ? 
                    <TrendingUp className="h-4 w-4 text-green-600" /> :
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  }
                </div>
                <div>
                  <p className="font-medium text-gray-900">{entry.reason}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${entry.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {entry.change > 0 ? '+' : ''}{entry.change}
                </p>
                <p className="text-sm text-gray-500">Score: {entry.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className={`p-4 rounded-lg border-2 ${
              achievement.earned 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <achievement.icon className={`h-5 w-5 ${
                    achievement.earned ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${
                    achievement.earned ? 'text-green-900' : 'text-gray-700'
                  }`}>
                    {achievement.title}
                  </h4>
                  {achievement.earned ? (
                    <p className="text-sm text-green-600">
                      Earned on {new Date(achievement.date!).toLocaleDateString('en-IN')}
                    </p>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600">
                        Progress: {achievement.progress}%
                      </p>
                      <div className="mt-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips to Improve Score */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Tips to Improve Your Score</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <span>Make timely repayments and honor your commitments</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <span>Maintain regular transaction activity</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <span>Complete your KYC verification</span>
          </li>
          <li className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <span>Build positive relationships with other users</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserScore;