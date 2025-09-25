import React from 'react';
import { ArrowLeft, Lock, Shield, EyeOff, UserX } from 'lucide-react';

interface PrivacySecurityProps {
  onBack: () => void;
}

const PrivacySecurity: React.FC<PrivacySecurityProps> = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Privacy & Security</h1>
          <p className="text-gray-600">Control your privacy and account security</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4 divide-y divide-gray-100">
          <div className="flex items-center justify-between pt-4 first:pt-0">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-green-600">Enabled</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">Manage</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Login Sessions</h4>
                <p className="text-sm text-gray-500">2 active sessions</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">View</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <EyeOff className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Profile Visibility</h4>
                <p className="text-sm text-gray-500">Visible to all users</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <UserX className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Blocked Users</h4>
                <p className="text-sm text-gray-500">3 users blocked</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">Manage</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySecurity;
