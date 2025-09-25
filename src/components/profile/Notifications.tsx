import React, { useState } from 'react';
import { ArrowLeft, Bell, Mail, MessageSquare } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

const Toggle = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
      checked ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    sms: true,
    offers: true,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Choose how you want to be notified</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4 divide-y divide-gray-100">
          <div className="flex items-center justify-between pt-4 first:pt-0">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-gray-500">For transaction alerts and updates</p>
              </div>
            </div>
            <Toggle checked={settings.push} onChange={(c) => setSettings(s => ({...s, push: c}))} />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500">For monthly statements and news</p>
              </div>
            </div>
            <Toggle checked={settings.email} onChange={(c) => setSettings(s => ({...s, email: c}))} />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">SMS Notifications</h4>
                <p className="text-sm text-gray-500">For critical alerts</p>
              </div>
            </div>
            <Toggle checked={settings.sms} onChange={(c) => setSettings(s => ({...s, sms: c}))} />
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-500" />
              <div>
                <h4 className="font-medium">Offers & Promotions</h4>
                <p className="text-sm text-gray-500">Receive special offers</p>
              </div>
            </div>
            <Toggle checked={settings.offers} onChange={(c) => setSettings(s => ({...s, offers: c}))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
