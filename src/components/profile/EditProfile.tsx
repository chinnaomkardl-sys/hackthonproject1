import React, { useState } from 'react';
import { ArrowLeft, User, Mail } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface User {
  name: string;
  email: string;
  upiId: string;
}

interface EditProfileProps {
  user: User;
  onBack: () => void;
  onSave: (updatedUser: User) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ user, onBack, onSave }) => {
  const { showToast } = useToast();
  const [name, setName] = useState(user.name);
  const [upiId, setUpiId] = useState(user.upiId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { ...user, name, upiId };
    onSave(updatedUser);
    showToast('Profile updated successfully!', 'success');
    onBack();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
