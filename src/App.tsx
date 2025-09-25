import React, { useState } from 'react';
import { Home, Clock, Star, AlertTriangle, Shield, User as UserIcon } from 'lucide-react';
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
import { useAuth } from './contexts/AuthContext';
import Auth from './components/auth/Auth';

interface SendMoneyResult {
  success: boolean;
  userFound: boolean;
  error?: string;
}

function App() {
  const { session, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ recipient: '', trustScore: 0, message: '' });
  const [currentView, setCurrentView] = useState('dashboard');
  const [profileView, setProfileView] = useState('main');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleSendMoney = async (recipient: string, amount: number): Promise<SendMoneyResult> => {
    const knownUser = knownUsers.find(
      (user) => user.upi_ids.includes(recipient.toLowerCase()) || user.upi_number === recipient
    );

    if (knownUser) {
      if (knownUser.score < 80) {
        setAlertData({ recipient: knownUser.user_name, trustScore: knownUser.score, message: knownUser.msg });
        setShowAlert(true);
        return { success: false, userFound: true };
      }
      showToast(`Transaction of ₹${amount} to ${recipient} approved.`, 'success');
      return { success: true, userFound: true };
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('name, score, upi_id, upi_number')
      .or(`upi_id.eq.${recipient},upi_number.eq.${recipient}`)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
      return { success: false, userFound: false, error: 'A database error occurred. Please try again later.' };
    }

    if (profile) {
      if (profile.score < 50) {
        setAlertData({
          recipient: profile.name,
          trustScore: profile.score,
          message: `This user has a low trust score of ${profile.score}. Proceed with caution.`,
        });
        setShowAlert(true);
        return { success: false, userFound: true };
      }
      showToast(`Transaction of ₹${amount} to ${recipient} approved.`, 'success');
      return { success: true, userFound: true };
    }
    
    return { success: false, userFound: false };
  };

  const handleViewPersonHistory = (personName: string) => {
    setSelectedPerson(personName);
    setCurrentView('person-history');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedPerson(null);
  };

  const handleProfileNavigation = (view: string) => {
    setProfileView(view);
  };
  
  const handleBackToProfile = () => {
    setProfileView('main');
  };

  const handleLogout = async () => {
    await logout();
    setActiveTab('home');
    setCurrentView('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        switch (currentView) {
          case 'send-money':
            return <SendMoney onBack={handleBackToDashboard} onSendMoney={handleSendMoney} />;
          case 'scan-qr':
            return <ScanQR onBack={handleBackToDashboard} onSendMoney={async (r, a) => (await handleSendMoney(r, a)).success} />;
          case 'pay-bills':
            return <PayBills onBack={handleBackToDashboard} />;
          case 'person-history':
            return <PersonTransactionHistory personName={selectedPerson!} onBack={handleBackToDashboard} />;
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
        switch (profileView) {
          case 'edit-profile':
            return <EditProfile onBack={handleBackToProfile} />;
          case 'account-settings':
            return <AccountSettings onBack={handleBackToProfile} />;
          case 'notifications':
            return <Notifications onBack={handleBackToProfile} />;
          case 'privacy-security':
            return <PrivacySecurity onBack={handleBackToProfile} />;
          default:
            return <Profile onNavigate={handleProfileNavigation} onLogout={handleLogout} />;
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

  if (!session) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
        <Auth />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-8 w-8 text-white" />
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
            { id: 'profile', icon: UserIcon, label: 'Profile' },
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
          onClose={() => setShowAlert(false)}
          onProceed={() => {
            setShowAlert(false);
            showToast('Transaction proceeded despite warning.', 'info');
          }}
        />
      )}
    </div>
  );
}

export default App;
