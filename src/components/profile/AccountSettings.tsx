import React, { useState } from 'react';
import { ArrowLeft, Key, Phone, Globe, X } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

const Modal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full"><X className="h-5 w-5" /></button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

const AccountSettings: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [modal, setModal] = useState<'password' | 'phone' | 'language' | null>(null);
  const { showToast } = useToast();

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Password changed successfully (demo)', 'success');
    setModal(null);
  };
  
  const handlePhoneChange = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Phone number updated (demo)', 'success');
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
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
            <div className="flex items-center space-x-3"><Key className="h-5 w-5 text-gray-500" /><div><h4 className="font-medium">Change Password</h4><p className="text-sm text-gray-500">Last changed 3 months ago</p></div></div>
            <button onClick={() => setModal('password')} className="text-blue-600 font-medium text-sm hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3"><Phone className="h-5 w-5 text-gray-500" /><div><h4 className="font-medium">Phone Number</h4><p className="text-sm text-gray-500">+91 •••• ••••61</p></div></div>
            <button onClick={() => setModal('phone')} className="text-blue-600 font-medium text-sm hover:underline">Edit</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3"><Globe className="h-5 w-5 text-gray-500" /><div><h4 className="font-medium">Language</h4><p className="text-sm text-gray-500">English (US)</p></div></div>
            <button onClick={() => setModal('language')} className="text-blue-600 font-medium text-sm hover:underline">Select</button>
          </div>
        </div>
      </div>

      {modal === 'password' && <Modal title="Change Password" onClose={() => setModal(null)}>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input type="password" placeholder="Current Password" required className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="New Password" required className="w-full p-3 border rounded-lg" />
          <input type="password" placeholder="Confirm New Password" required className="w-full p-3 border rounded-lg" />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg">Save</button>
        </form>
      </Modal>}
      
      {modal === 'phone' && <Modal title="Edit Phone Number" onClose={() => setModal(null)}>
        <form onSubmit={handlePhoneChange} className="space-y-4">
          <input type="tel" defaultValue="+919620174461" required className="w-full p-3 border rounded-lg" />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg">Save</button>
        </form>
      </Modal>}

      {modal === 'language' && <Modal title="Select Language" onClose={() => setModal(null)}>
        <div className="space-y-2">
          {['English (US)', 'English (UK)', 'Hindi', 'Tamil'].map(lang => (
            <button key={lang} onClick={() => { showToast(`Language set to ${lang} (demo)`, 'info'); setModal(null); }} className="w-full text-left p-3 hover:bg-gray-100 rounded-lg">{lang}</button>
          ))}
        </div>
      </Modal>}
    </div>
  );
};

export default AccountSettings;
