import React from 'react';
import { ArrowLeft, Key, Phone, Globe } from 'lucide-react';

interface AccountSettingsProps {
  onBack: () => void;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onBack }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600">Manage your account preferences</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4 divide-y divide-gray-100">
          <div className="flex items-center justify-between pt-4 first:pt-0">
            <div className="flex items-center space-x-3">
              <Key className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-500">Last changed 3 months ago</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Phone Number</h4>
                <p className="text-sm text-gray-500">+91 •••• ••••61</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">Edit</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Language</h4>
                <p className="text-sm text-gray-500">English (US)</p>
              </div>
            </div>
            <button className="text-blue-600 font-medium text-sm hover:underline">Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
