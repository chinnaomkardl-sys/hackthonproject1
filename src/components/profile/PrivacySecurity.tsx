import React, { useState } from 'react';
import { ArrowLeft, Lock, Shield, EyeOff, UserX, X } from 'lucide-react';
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

const PrivacySecurity: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [modal, setModal] = useState<'sessions' | 'blocked' | null>(null);
  const { showToast } = useToast();

  const sessions = [
    { device: 'Chrome on macOS', location: 'Bangalore, IN', time: 'Active now' },
    { device: 'iPhone 14 Pro', location: 'Mumbai, IN', time: '2 hours ago' },
  ];

  const blockedUsers = ['spam_user@upi', 'scammer123@paytm'];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
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
            <div className="flex items-center space-x-3"><Lock className="h-5 w-5 text-gray-500" /><div><h4 className="font-medium">Two-Factor Authentication</h4><p className="text-sm text-green-600">Enabled</p></div></div>
            <button onClick={() => showToast('This is a demo.', 'info')} className="text-blue-600 font-medium text-sm hover:underline">Manage</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3"><Shield className="h-5 w-5 text-gray-500" /><div><h4 className="font-medium">Login Sessions</h4><p className="text-sm text-gray-500">{sessions.length} active sessions</p></div></div>
            <button onClick={() => setModal('sessions')} className="text-blue-600 font-medium text-sm hover:underline">View</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3"><EyeOff className="h-5 w-5 text-gray-500" /><div><h4 className="font-medium">Profile Visibility</h4><p className="text-sm text-gray-500">Visible to all users</p></div></div>
            <button onClick={() => showToast('This is a demo.', 'info')} className="text-blue-600 font-medium text-sm hover:underline">Change</button>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3"><UserX className="h-5 w-5 text-gray-500" /><div><h4 className="font-medium">Blocked Users</h4><p className="text-sm text-gray-500">{blockedUsers.length} users blocked</p></div></div>
            <button onClick={() => setModal('blocked')} className="text-blue-600 font-medium text-sm hover:underline">Manage</button>
          </div>
        </div>
      </div>

      {modal === 'sessions' && <Modal title="Login Sessions" onClose={() => setModal(null)}>
        <div className="space-y-3">
          {sessions.map((s, i) => <div key={i} className="p-3 border rounded-lg">
            <p className="font-semibold">{s.device}</p>
            <p className="text-sm text-gray-500">{s.location} • {s.time}</p>
          </div>)}
          <button onClick={() => showToast('Logged out from all other devices (demo)', 'info')} className="w-full mt-4 p-3 border text-red-600 border-red-200 rounded-lg hover:bg-red-50">Log out all other sessions</button>
        </div>
      </Modal>}
      
      {modal === 'blocked' && <Modal title="Blocked Users" onClose={() => setModal(null)}>
        <div className="space-y-3">
          {blockedUsers.map((u, i) => <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
            <p>{u}</p>
            <button onClick={() => showToast(`${u} unblocked (demo)`, 'info')} className="text-sm text-blue-600">Unblock</button>
          </div>)}
          <button onClick={() => showToast('This is a demo.', 'info')} className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg">Block a new user</button>
        </div>
      </Modal>}
    </div>
  );
};

export default PrivacySecurity;
