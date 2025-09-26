import React, { useState } from 'react';
import { ArrowLeft, Banknote, ShieldCheck, Fingerprint } from 'lucide-react';

interface ConfirmPaymentProps {
  recipient: string;
  amount: number;
  onConfirm: () => void;
  onBack: () => void;
}

const paymentMethods = [
  { id: 'hdfc', name: 'HDFC Bank', details: '...1234' },
  { id: 'icici', name: 'ICICI Bank', details: '...5678' },
  { id: 'visa', name: 'Visa Credit Card', details: '...4321' },
];

const ConfirmPayment: React.FC<ConfirmPaymentProps> = ({ recipient, amount, onConfirm, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('hdfc');

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-4 p-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Confirm Payment</h1>
          <p className="text-gray-600">Select your payment method</p>
        </div>
      </div>

      <div className="flex-grow p-4 space-y-6">
        <div className="bg-rose-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Paying to</p>
              <p className="font-semibold text-lg text-gray-800">{recipient}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 text-right">Amount</p>
              <p className="font-bold text-2xl text-gray-900">₹{amount.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Method</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all text-left ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <Banknote className="h-6 w-6 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{method.name}</p>
                    <p className="text-sm text-gray-500">{method.details}</p>
                  </div>
                </div>
                {selectedMethod === method.id && <ShieldCheck className="h-6 w-6 text-blue-600" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <button
          onClick={onConfirm}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-3"
        >
          <Fingerprint className="h-6 w-6" />
          <span>Confirm & Pay ₹{amount.toLocaleString('en-IN')}</span>
        </button>
      </div>
    </div>
  );
};

export default ConfirmPayment;
