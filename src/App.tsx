import React, { useState } from 'react';
import { Home, Clock, Star, AlertTriangle, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import Help from './components/Help';
import UserScore from './components/UserScore';
import ReportUser from './components/ReportUser';
import AlertModal from './components/AlertModal';
import SendMoney from './components/SendMoney';
import ScanQR from './components/ScanQR';
import PayBills from './components/PayBills';
import PersonTransactionHistory from './components/PersonTransactionHistory';
import Profile from './components/Profile';
import { supabase } from './lib/supabase';
import { knownUsers } from './data/knownUsers';
import { useToast } from './contexts/ToastContext';
import EditProfile from './components/profile/EditProfile';
import AccountSettings from './components/profile/AccountSettings';
import Notifications from './components/profile/Notifications';
import PrivacySecurity from './components/profile/PrivacySecurity';
import Auth from './components/auth/Auth';
import ConfirmPayment from './components/ConfirmPayment';
import PaymentSuccessModal from './components/PaymentSuccessModal';
import AIChatbot from './components/profile/AIChatbot';

interface CurrentUser {
  name: string;
  email: string;
  upiId: string;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  const [activeTab, setActiveTab] = useState('home');
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ recipient: '', trustScore: 0, message: '' });
  const [currentView, setCurrentView] = useState('dashboard');
  const [profileView, setProfileView] = useState('main');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const { showToast } = useToast();

  const [paymentDetails, setPaymentDetails] = useState<{ recipient: string; amount: number; recipientName: string; transactionId?: string; transactionDate?: string; } | null>(null);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [initialRecipient, setInitialRecipient] = useState<string | undefined>(undefined);

  const handleLogin = (email: string, pass: string): boolean => {
    if (email.toLowerCase() === 'chinnaomkardl@gmail.com' && pass === 'omkar') {
      const user: CurrentUser = {
        name: 'Omkar',
        email: 'chinnaomkardl@gmail.com',
        upiId: 'omkar@securepay',
      };
      setCurrentUser(user);
      setIsAuthenticated(true);
      showToast('Login successful!', 'success');
      return true;
    }
    showToast('Invalid credentials or user not registered.', 'error');
    return false;
  };

  const handleRegister = (name: string, email: string, pass: string) => {
    const newUser: CurrentUser = {
      name,
      email,
      upiId: `${name.toLowerCase().split(' ')[0]}@securepay`,
    };
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    showToast(`Welcome, ${name}! Registration successful.`, 'success');
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
    setActiveTab('home');
    setCurrentView('dashboard');
  };

  const proceedToConfirm = (recipient: string, recipientName: string, amount: number) => {
    setPaymentDetails({ recipient, amount, recipientName });
    setCurrentView('confirm-payment');
  };

  const handleInitiatePayment = async (recipient: string, amount: number): Promise<void> => {
    const knownUser = knownUsers.find(
      (user) => user.upi_ids.includes(recipient.toLowerCase()) || user.upi_number === recipient
    );

    if (knownUser) {
      if (knownUser.score < 80) {
        setAlertData({ recipient: knownUser.user_name, trustScore: knownUser.score, message: knownUser.msg });
        setPaymentDetails({ recipient, amount, recipientName: knownUser.user_name });
        setShowAlert(true);
      } else {
        proceedToConfirm(recipient, knownUser.user_name, amount);
      }
      return;
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('name, score, upi_id, upi_number')
      .or(`upi_id.eq.${recipient},upi_number.eq.${recipient}`)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
      showToast('A database error occurred. Please try again later.', 'error');
      return;
    }

    if (profile) {
      if (profile.score < 50) {
        setAlertData({
          recipient: profile.name,
          trustScore: profile.score,
          message: `This user has a low trust score of ${profile.score}. Proceed with caution.`,
        });
        setPaymentDetails({ recipient, amount, recipientName: profile.name });
        setShowAlert(true);
      } else {
        proceedToConfirm(recipient, profile.name, amount);
      }
      return;
    }
    
    showToast('Recipient not found. Please check the UPI ID or phone number.', 'error');
  };

  const handleConfirmPayment = () => {
    const transactionId = `TXN${Date.now()}`.slice(0, 12);
    const transactionDate = new Date().toISOString();
    
    setPaymentDetails(prev => prev ? { ...prev, transactionId, transactionDate } : null);
    
    setCurrentView('dashboard');
    setShowPaymentSuccessModal(true);
    // In a real app, you'd process the payment here
  };

  const handlePaymentSuccessDone = () => {
    setShowPaymentSuccessModal(false);
    setPaymentDetails(null);
    showToast('Trust score increased by +1 point!', 'success');
  };

  const handleViewPersonHistory = (personName: string) => {
    setSelectedPerson(personName);
    setCurrentView('person-history');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedPerson(null);
    setPaymentDetails(null);
    setInitialRecipient(undefined);
  };

  const handleProfileNavigation = (view: string) => {
    setProfileView(view);
  };
  
  const handleBackToProfile = () => {
    setProfileView('main');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        switch (currentView) {
          case 'send-money':
            return <SendMoney onBack={handleBackToDashboard} onInitiatePayment={handleInitiatePayment} initialRecipient={initialRecipient} />;
          case 'scan-qr':
            return <ScanQR onBack={handleBackToDashboard} onInitiatePayment={handleInitiatePayment} />;
          case 'pay-bills':
            return <PayBills onBack={handleBackToDashboard} />;
          case 'person-history':
            return <PersonTransactionHistory personName={selectedPerson!} onBack={handleBackToDashboard} onSendMoney={(upiId) => { setInitialRecipient(upiId); setCurrentView('send-money'); }} />;
          case 'confirm-payment':
            if (!paymentDetails) return <Dashboard onNavigate={setCurrentView} onViewPersonHistory={handleViewPersonHistory} onNavigateToProfileTab={() => setActiveTab('profile')} />;
            return <ConfirmPayment 
              recipient={paymentDetails.recipientName}
              amount={paymentDetails.amount}
              onConfirm={handleConfirmPayment}
              onBack={() => {
                setCurrentView('dashboard');
                setPaymentDetails(null);
              }}
            />;
          default:
            return <Dashboard 
              onNavigate={setCurrentView}
              onViewPersonHistory={handleViewPersonHistory}
              onNavigateToProfileTab={() => setActiveTab('profile')}
            />;
        }
      case 'history':
        return <TransactionHistory />;
      case 'score':
        return <UserScore />;
      case 'report':
        return <ReportUser />;
      case 'profile':
        if (!currentUser) return null;
        switch (profileView) {
          case 'edit-profile':
            return <EditProfile user={currentUser} onBack={handleBackToProfile} onSave={(updatedUser) => setCurrentUser(updatedUser)} />;
          case 'account-settings':
            return <AccountSettings onBack={handleBackToProfile} />;
          case 'notifications':
            return <Notifications onBack={handleBackToProfile} />;
          case 'privacy-security':
            return <PrivacySecurity onBack={handleBackToProfile} />;
          case 'ai-chatbot':
            return <AIChatbot onBack={handleBackToProfile} />;
          default:
            return <Profile user={currentUser} onNavigate={handleProfileNavigation} onLogout={handleLogout} />;
        }
      case 'help':
        return <Help />;
      default:
        return <Dashboard 
          onNavigate={setCurrentView}
          onViewPersonHistory={handleViewPersonHistory}
          onNavigateToProfileTab={() => setActiveTab('profile')}
        />;
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-rose-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SecurePay</h1>
                <p className="text-xs text-gray-500">Secure & Trusted Payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                ⚡ Online
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
        {renderContent()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-10">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'history', icon: Clock, label: 'History' },
            { id: 'score', icon: Star, label: 'Score' },
            { id: 'report', icon: AlertTriangle, label: 'Report', notification: true },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map(({ id, icon: Icon, label, notification }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setCurrentView('dashboard');
                setProfileView('main');
              }}
              className={`relative flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 w-16 ${
                activeTab === id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
              {notification && id === 'report' && (
                <span className="absolute top-1 right-3 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {showAlert && (
        <AlertModal
          recipient={alertData.recipient}
          trustScore={alertData.trustScore}
          message={alertData.message}
          onClose={() => {
            setShowAlert(false);
            setPaymentDetails(null);
          }}
          onProceed={() => {
            setShowAlert(false);
            setCurrentView('confirm-payment');
            showToast('Transaction proceeded despite warning.', 'info');
          }}
        />
      )}

      {showPaymentSuccessModal && paymentDetails && paymentDetails.transactionId && paymentDetails.transactionDate && (
        <PaymentSuccessModal
          recipient={paymentDetails.recipientName}
          amount={paymentDetails.amount}
          transactionId={paymentDetails.transactionId}
          transactionDate={paymentDetails.transactionDate}
          onDone={handlePaymentSuccessDone}
        />
      )}
    </div>
  );
}

export default App;
