import React, { useState } from 'react';
import { ArrowLeft, Camera, Loader2 } from 'lucide-react';
import QrScanner from 'react-qr-scanner';
import { knownUsers } from '../data/knownUsers';
import { useToast } from '../contexts/ToastContext';
import SecurePayLogo from './SecurePayLogo';

interface ScanQRProps {
  onBack: () => void;
  onInitiatePayment: (recipient: string, amount: number) => Promise<void>;
}

const ScanQR: React.FC<ScanQRProps> = ({ onBack, onInitiatePayment }) => {
  const [scannedData, setScannedData] = useState<{ name: string; upi: string } | null>(null);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleScan = (data: { text: string } | null) => {
    if (data && !scannedData) {
      const upiId = data.text;
      const knownUser = knownUsers.find(
        (user) => user.upi_ids.includes(upiId.toLowerCase()) || user.upi_number === upiId
      );

      if (knownUser) {
        setScannedData({
          name: knownUser.user_name,
          upi: upiId,
        });
        showToast('QR Code Scanned!', 'success');
      } else {
        if (upiId.includes('@')) {
          setScannedData({
            name: upiId.split('@')[0],
            upi: upiId,
          });
          showToast('QR Code Scanned!', 'success');
        } else {
          showToast('Invalid or unknown QR code.', 'error');
        }
      }
    }
  };

  const handleError = (err: any) => {
    console.error(err);
    if (err?.name === 'NotAllowedError') {
      setError('Camera access was denied. Please enable camera permissions in your browser settings to use the scanner.');
    } else {
      setError('Could not access the camera. Please ensure it is not being used by another application and try again.');
    }
  };

  const handlePayment = async () => {
    if (!scannedData || !amount) return;
    setIsProcessing(true);
    await onInitiatePayment(scannedData.upi, parseFloat(amount));
    setIsProcessing(false);
  };

  const resetScan = () => {
    setScannedData(null);
    setAmount('');
    setError(null);
  };

  if (scannedData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Confirm Payment</h1>
            <p className="text-gray-600">Enter amount to pay</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
            <button onClick={resetScan} className="p-2 hover:bg-gray-100 rounded-full" title="Scan Again">
              <Camera className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-green-700">{scannedData.name.split(' ').map((n: string) => n[0]).join('')}</span>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{scannedData.name}</h4>
              <p className="text-gray-600">{scannedData.upi}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
            </div>
            <button onClick={handlePayment} disabled={!amount || isProcessing} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center">
              {isProcessing ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                `Pay ₹${amount || '0'}`
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>
          <p className="text-gray-600">Scan to pay instantly</p>
        </div>
      </div>

      <div className="relative w-full aspect-square max-w-md mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
        {error ? (
          <div className="flex flex-col items-center justify-center h-full text-white p-4 text-center">
            <Camera className="w-16 h-16 text-red-400 mb-4" />
            <h3 className="font-semibold text-lg">Camera Error</h3>
            <p className="text-gray-300 text-sm">{error}</p>
            <button onClick={onBack} className="mt-6 bg-blue-600 px-4 py-2 rounded-lg">Go Back</button>
          </div>
        ) : (
          <>
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              constraints={{ video: { facingMode: 'environment' } }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
              <SecurePayLogo />
            </div>
            {/* Scanner Frame */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-xl"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-xl"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-xl"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-xl"></div>

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-white font-medium">
                <Loader2 className="animate-spin h-5 w-5" />
                <span>Scanning for QR Code...</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
