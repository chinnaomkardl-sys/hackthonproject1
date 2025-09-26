import React from 'react';
import { CheckCircle, TrendingUp, ArrowRight } from 'lucide-react';

interface PaymentSuccessModalProps {
  recipient: string;
  amount: number;
  onDone: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ recipient, amount, onDone }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <div className="bg-green-50 p-8 rounded-t-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Action Successful</h2>
          <p className="text-gray-600 mt-2">
            ₹{amount.toLocaleString('en-IN')} sent to {recipient}.
          </p>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600">Trust Score Update</p>
            <div className="flex items-center justify-center space-x-2 mt-1">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <p className="font-bold text-lg text-green-600">+1 points</p>
            </div>
          </div>
          
          <button
            onClick={onDone}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            <span>Done</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessModal;
