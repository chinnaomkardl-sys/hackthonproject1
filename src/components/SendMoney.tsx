import React, { useState } from 'react';
import { ArrowLeft, Send, QrCode, Smartphone, User, CreditCard, AlertTriangle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface SendMoneyResult {
  success: boolean;
  userFound: boolean;
  error?: string; // Add optional error message
}

interface SendMoneyProps {
  onBack: () => void;
  onSendMoney: (recipient: string, amount: number) => Promise<SendMoneyResult>;
}

const SendMoney: React.FC<SendMoneyProps> = ({ onBack, onSendMoney }) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | 'number' | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { showToast } = useToast();

  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;

    setIsProcessing(true);
    
    const result = await onSendMoney(recipient, parseFloat(amount));
    
    if (result.success) {
      showToast(`₹${amount} sent successfully to ${recipient}`, 'success');
      setRecipient('');
      setAmount('');
      setNote('');
      onBack();
    } else if (result.error) {
      showToast(`Error: ${result.error}`, 'error');
    } else if (!result.userFound) {
      showToast('Recipient not found. Please check the UPI ID or phone number.', 'error');
    }
    // If the user was found but the transaction was flagged for a low score,
    // the AlertModal is handled in App.tsx, so no action is needed here.
    
    setIsProcessing(false);
  };
  
  const paymentOptions = [
    { id: 'upi' as const, label: 'To UPI ID', icon: Send, desc: 'Send money directly using a UPI ID.', color: 'blue' },
    { id: 'number' as const, label: 'To Phone Number', icon: Smartphone, desc: 'Send to any contact using their phone number.', color: 'green' },
    { id: 'qr' as const, label: 'Scan & Pay', icon: QrCode, desc: 'Scan any UPI QR code to pay.', color: 'purple' }
  ];

  const getRecipientPlaceholder = () => {
    switch(paymentMethod) {
      case 'upi': return 'example@paytm';
      case 'number': return '+91 9876543210';
      case 'qr': return 'Scan QR to fill details';
      default: return 'Select a payment option';
    }
  }

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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Send Money</h1>
          <p className="text-gray-600">Choose how you want to send money</p>
        </div>
      </div>

      {/* Payment Options */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Options</h3>
        <div className="space-y-3">
          {paymentOptions.map(({ id, label, icon: Icon, desc, color }) => (
            <button
              key={id}
              onClick={() => {
                if (id === 'qr') {
                  showToast("Use 'Scan QR' from the dashboard.", 'info');
                  setPaymentMethod(null);
                } else {
                  setPaymentMethod(id);
                }
              }}
              className={`w-full p-4 rounded-xl border-2 flex items-center space-x-4 transition-all text-left ${
                paymentMethod === id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`p-3 rounded-lg 
                ${color === 'blue' && 'bg-blue-100'} 
                ${color === 'green' && 'bg-green-100'} 
                ${color === 'purple' && 'bg-purple-100'}`
              }>
                <Icon className={`h-6 w-6 
                  ${color === 'blue' && 'text-blue-600'} 
                  ${color === 'green' && 'text-green-600'} 
                  ${color === 'purple' && 'text-purple-600'}`
                } />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Send Money Form - shown only when a method is selected */}
      {paymentMethod && paymentMethod !== 'qr' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSend} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                {paymentMethod === 'upi' ? 'UPI ID' : 'Phone Number'}
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={getRecipientPlaceholder()}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="inline h-4 w-4 mr-1" />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  min="1"
                  max="100000"
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Amounts</label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((quickAmount) => (
                  <button
                    key={quickAmount}
                    type="button"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-2 px-4 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    ₹{quickAmount.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Note (Optional)
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note for this payment"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">Security Reminder</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Double-check recipient details. You have 24 hours to request a refund if sent to wrong person.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!recipient || !amount || isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Send ₹{amount || '0'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SendMoney;
