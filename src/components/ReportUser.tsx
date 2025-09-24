import React, { useState } from 'react';
import { AlertTriangle, User, Calendar, FileText, Send, Shield, Search, Phone, MapPin, CreditCard, Clock, X, Paperclip } from 'lucide-react';

const ReportUser = () => {
  const [reportForm, setReportForm] = useState({
    recipientUpi: '',
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    amount: '',
    transactionId: '',
    transactionDate: '',
    category: '',
    description: '',
    evidence: [] as File[],
    urgency: 'medium',
    previousAttempts: '',
    witnessDetails: ''
  });

  const [previousReports, setPreviousReports] = useState([
    {
      id: 'RPT001',
      reportedUser: 'John Doe (john.doe@paytm)',
      category: 'Money Not Returned',
      amount: 5000,
      status: 'Under Review',
      date: '2024-01-14',
      description: 'Borrowed money for emergency but not returning calls'
    },
    {
      id: 'RPT002',
      reportedUser: 'Alice Smith (alice@gpay)',
      category: 'Fraudulent Transaction',
      amount: 1200,
      status: 'Resolved',
      date: '2024-01-10',
      description: 'Transaction made without authorization'
    }
  ]);

  const reportCategories = [
    { value: 'money-not-returned', label: 'Money Not Returned', severity: 'high' },
    { value: 'fraudulent-transaction', label: 'Fraudulent Transaction', severity: 'high' },
    { value: 'harassment', label: 'Harassment', severity: 'medium' },
    { value: 'spam', label: 'Spam/Unwanted Messages', severity: 'low' },
    { value: 'fake-profile', label: 'Fake Profile', severity: 'medium' },
    { value: 'other', label: 'Other', severity: 'low' }
  ];
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setReportForm(prev => ({
        ...prev,
        evidence: [...prev.evidence, ...newFiles]
      }));
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setReportForm(prev => ({
      ...prev,
      evidence: prev.evidence.filter(file => file.name !== fileName)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle report submission
    console.log('Submitting report:', reportForm);
    
    // Add to previous reports (simulation)
    const newReport = {
      id: `RPT${String(previousReports.length + 1).padStart(3, '0')}`,
      reportedUser: `${reportForm.recipientName} (${reportForm.recipientUpi})`,
      category: reportCategories.find(c => c.value === reportForm.category)?.label || 'Other',
      amount: parseFloat(reportForm.amount) || 0,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
      description: reportForm.description
    };
    
    setPreviousReports([newReport, ...previousReports]);
    
    // Reset form
    setReportForm({
      recipientUpi: '',
      recipientName: '',
      recipientPhone: '',
      recipientAddress: '',
      amount: '',
      transactionId: '',
      transactionDate: '',
      category: '',
      description: '',
      evidence: [],
      urgency: 'medium',
      previousAttempts: '',
      witnessDetails: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return 'text-green-600 bg-green-100';
      case 'under review':
        return 'text-yellow-600 bg-yellow-100';
      case 'submitted':
        return 'text-blue-600 bg-blue-100';
      case 'rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Report User</h1>
        <p className="text-gray-600">Help us maintain a safe and trustworthy payment community</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-orange-900">Important Notice</h3>
            <p className="text-orange-800 mt-1">
              False reports can result in penalties to your account. Please ensure all information is accurate 
              and you have valid reasons for reporting this user. Reports are thoroughly investigated.
            </p>
          </div>
        </div>
      </div>

      {/* Report Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">File a New Report</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Information */}
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Reported User Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Recipient UPI ID *
                </label>
                <input
                  type="text"
                  value={reportForm.recipientUpi}
                  onChange={(e) => setReportForm({...reportForm, recipientUpi: e.target.value})}
                  placeholder="user@paytm"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={reportForm.recipientName}
                  onChange={(e) => setReportForm({...reportForm, recipientName: e.target.value})}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={reportForm.recipientPhone}
                  onChange={(e) => setReportForm({...reportForm, recipientPhone: e.target.value})}
                  placeholder="+91 9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Known Address (if any)
                </label>
                <input
                  type="text"
                  value={reportForm.recipientAddress}
                  onChange={(e) => setReportForm({...reportForm, recipientAddress: e.target.value})}
                  placeholder="City, State"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Transaction Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CreditCard className="inline h-4 w-4 mr-1" />
                  Amount Involved (₹) *
                </label>
                <input
                  type="number"
                  value={reportForm.amount}
                  onChange={(e) => setReportForm({...reportForm, amount: e.target.value})}
                  placeholder="0.00"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID
                </label>
                <input
                  type="text"
                  value={reportForm.transactionId}
                  onChange={(e) => setReportForm({...reportForm, transactionId: e.target.value})}
                  placeholder="TXN123456789"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline h-4 w-4 mr-1" />
                Transaction Date *
              </label>
              <input
                type="date"
                value={reportForm.transactionDate}
                onChange={(e) => setReportForm({...reportForm, transactionDate: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Report Category */}
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">Report Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Category *
                </label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {reportCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urgency Level *
                </label>
                <select
                  value={reportForm.urgency}
                  onChange={(e) => setReportForm({...reportForm, urgency: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="low">Low - Can wait</option>
                  <option value="medium">Medium - Normal priority</option>
                  <option value="high">High - Urgent attention needed</option>
                  <option value="critical">Critical - Immediate action required</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline h-4 w-4 mr-1" />
              Detailed Description *
            </label>
            <textarea
              value={reportForm.description}
              onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
              placeholder="Please provide detailed information about the issue, including timeline, communication history, and any relevant circumstances. Be as specific as possible."
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Minimum 50 characters required. Include dates, amounts, and communication details.
            </p>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Previous Attempts to Resolve
              </label>
              <textarea
                value={reportForm.previousAttempts}
                onChange={(e) => setReportForm({...reportForm, previousAttempts: e.target.value})}
                placeholder="Describe any previous attempts to contact the user or resolve this issue..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Witness Details (if any)
              </label>
              <input
                type="text"
                value={reportForm.witnessDetails}
                onChange={(e) => setReportForm({...reportForm, witnessDetails: e.target.value})}
                placeholder="Names and contact details of any witnesses"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          {/* Evidence Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Evidence (Screenshots, Messages, Documents) *
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              <div className="space-y-2">
                <FileText className="h-8 w-8 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB. Multiple files supported.
                </p>
              </div>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,.pdf"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {reportForm.evidence.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Uploaded files:</h4>
                {reportForm.evidence.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <div className="flex items-center space-x-2 overflow-hidden">
                      <Paperclip className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-800 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500 flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.name)}
                      className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm text-orange-600 mt-2">
              <AlertTriangle className="inline h-4 w-4 mr-1" />
              Evidence is required for processing your report. Screenshots of conversations, transaction receipts, etc.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
            >
              <Send className="h-4 w-4" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>

      {/* Previous Reports */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Previous Reports</h2>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-4">
          {previousReports.map((report) => (
            <div key={report.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">Report #{report.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>User:</strong> {report.reportedUser}</p>
                    <p><strong>Category:</strong> {report.category}</p>
                    <p><strong>Amount:</strong> ₹{report.amount.toLocaleString('en-IN')}</p>
                    <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString('en-IN')}</p>
                  </div>
                  
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">{report.description}</p>
                </div>
                
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Need Help with Reporting?</h3>
            <p className="text-blue-800 mt-1">
              Our team is here to help. If you're unsure about filing a report or need assistance, 
              contact our support team at <strong>support@securepay.com</strong> or call <strong>1800-SECURE</strong>.
            </p>
            <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportUser;
