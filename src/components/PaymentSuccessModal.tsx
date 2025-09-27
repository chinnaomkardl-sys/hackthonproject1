import React from 'react';
import { CheckCircle, TrendingUp, Share2, ArrowRight } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface PaymentSuccessModalProps {
  recipient: string;
  amount: number;
  transactionId: string;
  transactionDate: string;
  onDone: () => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ recipient, amount, transactionId, transactionDate, onDone }) => {
  const { showToast } = useToast();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Payment Receipt',
        text: `I've sent ₹${amount.toLocaleString('en-IN')} to ${recipient} via SecurePay. Transaction ID: ${transactionId}`,
      }).then(() => {
        showToast('Receipt shared!', 'success');
      }).catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          showToast('Could not share receipt.', 'error');
        }
      });
    } else {
      showToast('Web Share API not supported on this browser.', 'info');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      dateStyle: 'long',
      timeStyle: 'short',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <div className="p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Successful!</h2>
          <p className="text-gray-600 mt-2 text-lg">
            ₹{amount.toLocaleString('en-IN')} sent to {recipient}.
          </p>
        </div>
        
        <div className="px-6 pb-6 space-y-6">
          <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 border border-gray-100">
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-mono text-gray-700">{transactionId}</span>
             </div>
             <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date & Time</span>
                <span className="text-gray-700">{formatDate(transactionDate)}</span>
             </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <p className="font-semibold text-blue-700">Your Trust Score increased by +1 point!</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleShare}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
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
    </div>
  );
};

export default PaymentSuccessModal;
