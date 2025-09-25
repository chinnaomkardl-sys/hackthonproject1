import React from 'react';
import { User, Shield, Settings, Bell, Lock, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileProps {
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate, onLogout }) => {
  const { user } = useAuth();

  const profile = {
    name: user?.user_metadata.name || user?.email?.split('@')[0] || 'User',
    upiId: user?.user_metadata.upi_id || user?.email || 'no-email@securepay',
    avatar: (user?.user_metadata.name || user?.email || 'U')[0].toUpperCase(),
    trustScore: 78, // This would come from the profile table in a real app
  };

  const menuItems = [
    { id: 'edit-profile', label: 'Edit Profile', icon: User },
    { id: 'account-settings', label: 'Account Settings', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy-security', label: 'Privacy & Security', icon: Lock },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-4xl font-bold text-white">{profile.avatar}</span>
          </div>
          <button 
            onClick={() => onNavigate('edit-profile')}
            className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
          >
            <User className="h-4 w-4 text-blue-600" />
          </button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-600">{profile.upiId}</p>
        </div>
      </div>

      {/* Trust Score Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Your Trust Score</h3>
              <p className="text-sm text-gray-500">Keep it high for better benefits</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">{profile.trustScore}</p>
            <p className="text-sm text-green-600">Excellent</p>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-100">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => onNavigate(item.id)} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center space-x-4">
                <item.icon className="h-5 w-5 text-gray-500" />
                <span className="font-medium text-gray-800">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <button onClick={onLogout} className="w-full flex items-center space-x-4 p-4 hover:bg-red-50 transition-colors text-left">
          <LogOut className="h-5 w-5 text-red-600" />
          <span className="font-medium text-red-600">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
