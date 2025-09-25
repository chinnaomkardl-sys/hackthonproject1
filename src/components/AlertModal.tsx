import React from 'react';
import { AlertTriangle, X, Shield, TrendingDown } from 'lucide-react';

interface AlertModalProps {
  recipient: string;
  trustScore: number;
  message?: string;
  onClose: () => void;
  onProceed: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({ recipient, trustScore, message, onClose, onProceed }) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    if (score >= 30) return 'Poor';
    return 'Very Poor';
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'Low', color: 'text-green-600 bg-green-100' };
    if (score >= 50) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-100' };
    if (score >= 30) return { level: 'High', color: 'text-orange-600 bg-orange-100' };
    return { level: 'Very High', color: 'text-red-600 bg-red-100' };
  };

  const riskLevel = getRiskLevel(trustScore);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-red-50 px-6 py-4 rounded-t-2xl border-b border-red-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-red-900">Trust Score Alert</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-red-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Warning Message */}
          <div className="text-center">
            <p className="text-gray-800 font-medium">
              {message || 'The recipient has a low trust score. Please review the details before proceeding.'}
            </p>
          </div>

          {/* Recipient Info */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-gray-700">
                  {recipient.split('@')[0]?.substring(0, 2)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{recipient}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600">Trust Score:</span>
                  <span className={`font-bold ${getScoreColor(trustScore)}`}>
                    {trustScore}% ({getScoreLabel(trustScore)})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Risk Assessment</h3>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Risk Level</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevel.color}`}>
                  {riskLevel.level}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-gray-700">Below average trust score</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-700">Potential payment issues reported</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">Transaction will be monitored</span>
                </div>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Safety Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Only send money to people you know and trust</li>
              <li>• Verify the recipient's identity before proceeding</li>
              <li>• Keep transaction receipts and screenshots</li>
              <li>• You have 24 hours to request a refund</li>
            </ul>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Trust Score</span>
              <span className={`font-medium ${getScoreColor(trustScore)}`}>{trustScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  trustScore >= 70 ? 'bg-green-500' :
                  trustScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${trustScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-100">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel Transaction
            </button>
            <button
              onClick={onProceed}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-medium"
            >
              Proceed Anyway
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            By proceeding, you acknowledge the risks associated with this transaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
