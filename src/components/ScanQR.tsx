import React, { useState, useRef } from 'react';
import { ArrowLeft, QrCode, Camera, Upload, Flashlight, RotateCcw } from 'lucide-react';

interface ScanQRProps {
  onBack: () => void;
  onSendMoney: (recipient: string, amount: number) => boolean;
}

const ScanQR: React.FC<ScanQRProps> = ({ onBack, onSendMoney }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate QR scan
  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate scanning delay
    setTimeout(() => {
      const mockQRData = {
        name: 'John Doe',
        upi: 'john.doe@paytm',
        amount: '500' // Pre-filled amount from QR
      };
      setScannedData(mockQRData);
      setAmount(mockQRData.amount);
      setIsScanning(false);
    }, 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate QR code reading from image
      setTimeout(() => {
        const mockQRData = {
          name: 'Alice Smith',
          upi: 'alice.smith@gpay',
          amount: ''
        };
        setScannedData(mockQRData);
      }, 1000);
    }
  };

  const handlePayment = () => {
    if (!scannedData || !amount) return;
    
    const success = onSendMoney(scannedData.upi, parseFloat(amount));
    if (success) {
      alert(`₹${amount} sent successfully to ${scannedData.name}`);
      onBack();
    }
  };

  const resetScan = () => {
    setScannedData(null);
    setAmount('');
    setIsScanning(false);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>
          <p className="text-gray-600">Scan to pay instantly</p>
        </div>
      </div>

      {!scannedData ? (
        <>
          {/* QR Scanner */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="text-center">
              <div className="relative mx-auto w-64 h-64 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                {isScanning ? (
                  <div className="relative">
                    <div className="w-48 h-48 border-4 border-blue-500 rounded-2xl relative">
                      <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-2xl animate-spin"></div>
                      <div className="absolute inset-4 border-2 border-dashed border-blue-300 rounded-xl"></div>
                    </div>
                    <p className="text-blue-600 font-medium mt-4">Scanning...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Position QR code within the frame</p>
                  </div>
                )}
              </div>

              {!isScanning && (
                <div className="space-y-4">
                  <button
                    onClick={handleStartScan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
                  >
                    <Camera className="h-5 w-5" />
                    <span>Start Camera</span>
                  </button>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                      <Flashlight className="h-4 w-4" />
                      <span>Flash</span>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Scan</h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-800 mt-0.5">1</span>
                <span>Point your camera at the QR code</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-800 mt-0.5">2</span>
                <span>Make sure the QR code is clearly visible</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-5 h-5 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold text-blue-800 mt-0.5">3</span>
                <span>Wait for automatic detection</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        /* Payment Confirmation */
        <div className="space-y-6">
          {/* Scanned Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
              <button
                onClick={resetScan}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Scan Again"
              >
                <RotateCcw className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-green-700">
                  {scannedData.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
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
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!amount}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Pay ₹{amount || '0'}
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <QrCode className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">QR Code Verified</p>
            </div>
            <p className="text-sm text-green-700 mt-1">
              This QR code has been verified and is safe to use for payment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanQR;
