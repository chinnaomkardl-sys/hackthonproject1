import React, { useState, useRef } from 'react';
import { ArrowLeft, QrCode, Camera, Upload, Flashlight, RotateCcw } from 'lucide-react';
import { knownUsers } from '../data/knownUsers';

interface ScanQRProps {
  onBack: () => void;
  onSendMoney: (recipient: string, amount: number) => boolean;
}

const ScanQR: React.FC<ScanQRProps> = ({ onBack, onSendMoney }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate QR scan with valid data
  const handleStartScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      // Pick a random user from the known users list to ensure data consistency
      const randomUser = knownUsers[Math.floor(Math.random() * knownUsers.length)];
      const mockQRData = {
        name: randomUser.user_name,
        upi: randomUser.upi_ids[0], // Use the first UPI ID
        amount: '' // Let the user enter the amount
      };
      setScannedData(mockQRData);
      setAmount(mockQRData.amount);
      setIsScanning(false);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulate QR code reading from image
      setIsScanning(true);
      setTimeout(() => {
        const randomUser = knownUsers[Math.floor(Math.random() * knownUsers.length)];
        const mockQRData = {
          name: randomUser.user_name,
          upi: randomUser.upi_ids[0],
          amount: ''
        };
        setScannedData(mockQRData);
        setIsScanning(false);
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
        </>
      ) : (
        /* Payment Confirmation */
        <div className="space-y-6">
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
                    autoFocus
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
        </div>
      )}
    </div>
  );
};

export default ScanQR;
