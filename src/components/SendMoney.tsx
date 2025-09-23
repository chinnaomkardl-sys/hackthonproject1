import React, { useState } from 'react';
import { ArrowLeft, Send, QrCode, Smartphone, User, CreditCard, AlertTriangle } from 'lucide-react';

interface SendMoneyProps {
  onBack: () => void;
  onSendMoney: (recipient: string, amount: number) => boolean;
}

const SendMoney: React.FC<SendMoneyProps> = ({ onBack, onSendMoney }) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'qr' | 'number'>('upi');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const quickAmounts = [100, 500, 1000, 2000, 5000, 10000];

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = onSendMoney(recipient, parseFloat(amount));
    
    if (success) {
      // Show success message
      alert(`₹${amount} sent successfully to ${recipient}`);
      setRecipient('');
      setAmount('');
      setNote('');
      onBack();
    }
    
    setIsProcessing(false);
  };

  const recentContacts = [
    { name: 'John Doe', upi: 'john.doe@paytm', avatar: 'JD' },
    { name: 'Alice Smith', upi: 'alice.smith@gpay', avatar: 'AS' },
    { name: 'Bob Wilson', upi: 'bob.wilson@phonepe', avatar: 'BW' },
    { name: 'Carol Brown', upi: 'carol.brown@paytm', avatar: 'CB' }
  ];

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
          <p className="text-gray-600">Send money securely to anyone</p>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'upi' as const, label: 'UPI ID', icon: Send, desc: 'Send via UPI ID' },
            { id: 'qr' as const, label: 'QR Code', icon: QrCode, desc: 'Scan QR code' },
            { id: 'number' as const, label: 'Phone', icon: Smartphone, desc: 'Send via number' }
          ].map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setPaymentMethod(id)}
              className={`p-4 rounded-xl border-2 flex flex-col items-center space-y-2 transition-all ${
                paymentMethod === id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-600'
              }`}
            >
              <Icon className="h-6 w-6" />
              <div className="text-center">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs opacity-75">{desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Contacts */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Contacts</h3>
        <div className="grid grid-cols-2 gap-3">
          {recentContacts.map((contact, index) => (
            <button
              key={index}
              onClick={() => setRecipient(contact.upi)}
              className="flex items-center space-x-3 p-3 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-blue-700">{contact.avatar}</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.upi}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Send Money Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSend} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              {paymentMethod === 'upi' ? 'UPI ID' : 
               paymentMethod === 'qr' ? 'Recipient Name' : 'Phone Number'}
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={
                paymentMethod === 'upi' ? 'example@paytm' :
                paymentMethod === 'qr' ? 'Enter recipient name' : '+91 9876543210'
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
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
    </div>
  );
};

export default SendMoney;