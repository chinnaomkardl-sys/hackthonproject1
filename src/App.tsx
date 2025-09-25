import React, { useState } from 'react';
import { Home, Clock, HelpCircle, Star, AlertTriangle, Shield } from 'lucide-react';
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
import { supabase } from './lib/supabase';
import { knownUsers } from './data/knownUsers';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ recipient: '', trustScore: 0, message: '' });
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  const handleSendMoney = async (recipient: string, amount: number): Promise<boolean> => {
    // 1. Check local known users list first
    const knownUser = knownUsers.find(
      (user) => user.upi_ids.includes(recipient.toLowerCase()) || user.upi_number === recipient
    );

    if (knownUser) {
      if (knownUser.score < 80) { // Trigger alert for any known user with score < 80
        setAlertData({ recipient: knownUser.user_name, trustScore: knownUser.score, message: knownUser.msg });
        setShowAlert(true);
        return false; // Stop transaction
      }
    }

    // 2. If not in local list, check Supabase 'profiles' table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('name, score, upi_id, upi_number')
      .or(`upi_id.eq.${recipient},upi_number.eq.${recipient}`)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116: 'single' row not found
      console.error('Error fetching profile:', error);
    }

    if (profile) {
      if (profile.score < 50) {
        setAlertData({
          recipient: profile.name,
          trustScore: profile.score,
          message: `This user has a low trust score of ${profile.score}. Proceed with caution.`,
        });
        setShowAlert(true);
        return false; // Stop transaction
      }
    }
    
    // 3. Fallback for unknown users (for demonstration)
    if (!knownUser && !profile) {
      const randomTrustScore = Math.floor(Math.random() * 100);
      if (randomTrustScore < 50) {
        setAlertData({ 
          recipient, 
          trustScore: randomTrustScore,
          message: `This is an unknown user with a simulated low trust score. Be careful.`
        });
        setShowAlert(true);
        return false;
      }
    }

    // If all checks pass, allow the transaction
    console.log(`Transaction of ${amount} to ${recipient} approved.`);
    return true;
  };

  const handleViewPersonHistory = (personName: string) => {
    setSelectedPerson(personName);
    setCurrentView('person-history');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedPerson(null);
  };
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        switch (currentView) {
          case 'send-money':
            return <SendMoney onBack={handleBackToDashboard} onSendMoney={handleSendMoney} />;
          case 'scan-qr':
            return <ScanQR onBack={handleBackToDashboard} onSendMoney={handleSendMoney} />;
          case 'pay-bills':
            return <PayBills onBack={handleBackToDashboard} />;
          case 'person-history':
            return <PersonTransactionHistory personName={selectedPerson!} onBack={handleBackToDashboard} />;
          default:
            return <Dashboard 
              onSendMoney={handleSendMoney} 
              onNavigate={setCurrentView}
              onViewPersonHistory={handleViewPersonHistory}
              onNavigateToScoreTab={() => setActiveTab('score')}
            />;
        }
      case 'history':
        return <TransactionHistory />;
      case 'score':
        return <UserScore />;
      case 'report':
        return <ReportUser />;
      case 'help':
        return <Help />;
      default:
        return <Dashboard 
          onSendMoney={handleSendMoney} 
          onNavigate={setCurrentView}
          onViewPersonHistory={handleViewPersonHistory}
          onNavigateToScoreTab={() => setActiveTab('score')}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header */}
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'history', icon: Clock, label: 'History' },
            { id: 'score', icon: Star, label: 'Score' },
            { id: 'report', icon: AlertTriangle, label: 'Report', notification: true },
            { id: 'help', icon: HelpCircle, label: 'Help' }
          ].map(({ id, icon: Icon, label, notification }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
                activeTab === id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{label}</span>
              {notification && (
                <span className="absolute top-1 right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Alert Modal */}
      {showAlert && (
        <AlertModal
          recipient={alertData.recipient}
          trustScore={alertData.trustScore}
          message={alertData.message}
          onClose={() => setShowAlert(false)}
          onProceed={() => {
            setShowAlert(false);
            // Handle proceeding with transaction
            alert('Transaction proceeded despite warning.');
          }}
        />
      )}

      {/* Footer Logo */}
      <footer className="bg-white border-t border-gray-200 py-4 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">Powered by SecurePay</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
