import React, useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, Loader2, RefreshCw, CameraOff, User, QrCode } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { knownUsers } from '../data/knownUsers';
import { useToast } from '../contexts/ToastContext';

interface ScanAndPayProps {
  onBack: () => void;
  onInitiatePayment: (recipient: string, amount: number) => Promise<void>;
  onPayToUPI: (upiId: string) => void;
}

const QR_READER_ID = 'qr-reader-full';

const ScanAndPay: React.FC<ScanAndPayProps> = ({ onBack, onInitiatePayment, onPayToUPI }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<{ name: string; upi: string } | null>(null);
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const { showToast } = useToast();
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const quickPayContacts = knownUsers.slice(0, 5);

  const handleScanSuccess = useCallback((decodedText: string) => {
    const upiId = decodedText;
    const knownUser = knownUsers.find(u => u.upi_ids.includes(upiId.toLowerCase()) || u.upi_number === upiId);

    if (knownUser || upiId.includes('@')) {
      const name = knownUser ? knownUser.user_name : upiId.split('@')[0];
      setScannedData({ name, upi: upiId });
      showToast('QR Code Scanned!', 'success');
      setIsScanning(false); // Transition to payment screen
    } else {
      showToast('Invalid or unknown QR code. Please try again.', 'error');
      // Return to the main screen to allow a clean retry
      setIsScanning(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode(QR_READER_ID, { verbose: false });
    }
    const html5QrCode = scannerRef.current;

    if (isScanning) {
      setScanError(null);
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        handleScanSuccess,
        () => {} // qrCodeErrorCallback -> ignore
      ).catch((err: any) => {
        if (err.name === 'NotAllowedError') {
          setScanError('Camera permission denied. Please enable camera access in your browser settings and try again.');
        } else {
          setScanError('Could not start the camera. Please ensure it is not being used by another app and try again.');
        }
        setIsScanning(false);
      });
    }

    return () => {
      if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().catch(() => {});
      }
    };
  }, [isScanning, handleScanSuccess]);

  const handlePayment = async () => {
    if (!scannedData || !amount) return;
    setIsProcessing(true);
    await onInitiatePayment(scannedData.upi, parseFloat(amount));
    setIsProcessing(false);
  };

  const handleTryAgain = () => {
    setScanError(null);
    setIsScanning(true);
  };

  if (scannedData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => setScannedData(null)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Confirm Payment</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-green-700">{scannedData.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900">{scannedData.name}</h4>
              <p className="text-gray-600">{scannedData.upi}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500" required />
            </div>
            <button onClick={handlePayment} disabled={!amount || isProcessing} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-xl flex items-center justify-center">
              {isProcessing ? <Loader2 className="animate-spin h-5 w-5" /> : `Pay ₹${amount || '0'}`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsScanning(false)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>
        </div>
        <div className="w-full max-w-md mx-auto aspect-square bg-black rounded-2xl overflow-hidden shadow-lg relative flex items-center justify-center">
          <div id={QR_READER_ID} className="w-full h-full"></div>
          {scanError ? (
            <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white p-6 text-center">
              <CameraOff className="h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Camera Error</h3>
              <p className="mb-6 text-gray-300">{scanError}</p>
              <button onClick={handleTryAgain} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            </div>
          ) : (
            <>
              <div className="absolute top-0 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-transparent to-blue-500/10 pointer-events-none"></div>
              <div className="absolute top-0 left-0 right-0 h-px w-full bg-blue-300 shadow-[0_0_10px_2px_#60a5fa] animate-scan-line pointer-events-none"></div>
              <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-white/80 rounded-tl-xl pointer-events-none"></div>
              <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-white/80 rounded-tr-xl pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-white/80 rounded-bl-xl pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-white/80 rounded-br-xl pointer-events-none"></div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Scan & Pay</h1>
      </div>

      <div className="relative w-full aspect-square max-w-md mx-auto bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-0 right-0 h-1/2 w-full bg-gradient-to-t from-transparent to-blue-500/30"></div>
          <div className="absolute top-0 left-0 right-0 h-px w-full bg-blue-300 shadow-[0_0_10px_2px_#60a5fa] animate-scan-line"></div>
        </div>
        <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-white/50 rounded-tl-xl"></div>
        <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-white/50 rounded-tr-xl"></div>
        <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-white/50 rounded-bl-xl"></div>
        <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-white/50 rounded-br-xl"></div>
        
        <div className="z-10 text-center">
          <QrCode className="h-16 w-16 mx-auto text-white/80 mb-4" />
          <h2 className="text-xl font-semibold">Scan any QR to pay</h2>
          <p className="text-white/60 text-sm mt-1">Supports all UPI apps</p>
          <button onClick={() => setIsScanning(true)} className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-8 rounded-full hover:bg-white/20 transition-all">
            Scan any QR code
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-800">Quick Pay</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {quickPayContacts.map(contact => (
            <button key={contact.upi_number} onClick={() => onPayToUPI(contact.upi_ids[0])} className="flex flex-col items-center space-y-2 flex-shrink-0 w-20 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-blue-700">{contact.user_name.charAt(0)}</span>
              </div>
              <p className="text-xs font-medium text-gray-700 truncate w-full">{contact.user_name.split(' ')[0]}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => onPayToUPI('')} className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-3">
          <User className="h-6 w-6 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-800">Pay to Contact</p>
            <p className="text-xs text-gray-500">From your contacts</p>
          </div>
        </button>
        <button onClick={() => onPayToUPI('')} className="bg-white p-4 rounded-xl shadow-sm border flex items-center space-x-3">
          <QrCode className="h-6 w-6 text-purple-600" />
          <div>
            <p className="font-semibold text-gray-800">Pay to UPI ID</p>
            <p className="text-xs text-gray-500">Enter any UPI ID</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ScanAndPay;
