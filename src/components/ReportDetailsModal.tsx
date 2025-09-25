import React from 'react';
import { X, User, Calendar, FileText, CreditCard, Clock, AlertTriangle } from 'lucide-react';

export interface Report {
  id: string;
  reportedUser: string;
  category: string;
  amount: number;
  status: string;
  date: string;
  description: string;
}

interface ReportDetailsModalProps {
  report: Report;
  onClose: () => void;
}

const ReportDetailsModal: React.FC<ReportDetailsModalProps> = ({ report, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'under review': return 'text-yellow-600 bg-yellow-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Report Details #{report.id}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500 text-right">Date Filed</p>
              <p className="font-medium text-gray-800">{new Date(report.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Reported User</p>
                <p className="font-semibold text-gray-800">{report.reportedUser}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-semibold text-gray-800">{report.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Amount Involved</p>
                <p className="font-semibold text-gray-800">₹{report.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>Description</span>
            </h4>
            <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-gray-100">
              {report.description}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-100 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsModal;
