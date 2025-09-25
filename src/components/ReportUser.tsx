import React, { useState } from 'react';
import { AlertTriangle, User, Calendar, FileText, Send, Shield, Search, Phone, MapPin, CreditCard, Clock, X, Paperclip, UploadCloud, UserCheck, ShieldAlert } from 'lucide-react';

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
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setReportForm(prev => ({
        ...prev,
        evidence: [...prev.evidence, ...newFiles]
      }));
      e.dataTransfer.clearData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting report:', reportForm);
    
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
    
    setReportForm({
      recipientUpi: '', recipientName: '', recipientPhone: '', recipientAddress: '',
      amount: '', transactionId: '', transactionDate: '', category: '',
      description: '', evidence: [], urgency: 'medium', previousAttempts: '',
      witnessDetails: ''
    });
  };

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
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <ShieldAlert className="h-8 w-8 text-red-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report User</h1>
          <p className="text-gray-600">Help us maintain a safe and trustworthy payment community.</p>
        </div>
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-orange-900">Please Read Before Reporting</h3>
            <ul className="text-orange-800 mt-2 space-y-1 list-disc list-inside">
              <li>Filing false reports can lower your Trust Score and may lead to account suspension.</li>
              <li>Provide clear, truthful information and upload all relevant evidence.</li>
              <li>Our team investigates every claim seriously to ensure fairness.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">File a New Report</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2 flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <span>Reported User Information</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient UPI ID *</label>
                <input type="text" value={reportForm.recipientUpi} onChange={(e) => setReportForm({...reportForm, recipientUpi: e.target.value})} placeholder="user@paytm" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input type="text" value={reportForm.recipientName} onChange={(e) => setReportForm({...reportForm, recipientName: e.target.value})} placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><Phone className="inline h-4 w-4 mr-1" />Phone Number</label>
                <input type="tel" value={reportForm.recipientPhone} onChange={(e) => setReportForm({...reportForm, recipientPhone: e.target.value})} placeholder="+91 9876543210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><MapPin className="inline h-4 w-4 mr-1" />Known Address (if any)</label>
                <input type="text" value={reportForm.recipientAddress} onChange={(e) => setReportForm({...reportForm, recipientAddress: e.target.value})} placeholder="City, State" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2"><CreditCard className="h-5 w-5 text-blue-600" /><span>Transaction Details</span></h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Involved (₹) *</label>
                <input type="number" value={reportForm.amount} onChange={(e) => setReportForm({...reportForm, amount: e.target.value})} placeholder="0.00" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                <input type="text" value={reportForm.transactionId} onChange={(e) => setReportForm({...reportForm, transactionId: e.target.value})} placeholder="TXN123456789" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2"><Clock className="inline h-4 w-4 mr-1" />Transaction Date *</label>
              <input type="date" value={reportForm.transactionDate} onChange={(e) => setReportForm({...reportForm, transactionDate: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2"><FileText className="h-5 w-5 text-blue-600" /><span>Report Details</span></h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Category *</label>
                <select value={reportForm.category} onChange={(e) => setReportForm({...reportForm, category: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                  <option value="">Select a category</option>
                  {reportCategories.map((category) => (<option key={category.value} value={category.value}>{category.label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level *</label>
                <select value={reportForm.urgency} onChange={(e) => setReportForm({...reportForm, urgency: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required>
                  <option value="low">Low - Can wait</option>
                  <option value="medium">Medium - Normal priority</option>
                  <option value="high">High - Urgent attention needed</option>
                  <option value="critical">Critical - Immediate action required</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
              <textarea value={reportForm.description} onChange={(e) => setReportForm({...reportForm, description: e.target.value})} placeholder="Please provide detailed information about the issue..." rows={5} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
            </div>
          </div>

          <div className="space-y-6 pt-8 border-t border-gray-100">
            <h4 className="font-semibold text-gray-900 flex items-center space-x-2"><Paperclip className="h-5 w-5 text-blue-600" /><span>Attach Evidence</span></h4>
            <div>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer ${
                  isDragging 
                    ? 'border-blue-600 bg-blue-100 scale-105' 
                    : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-3">
                  <UploadCloud className="h-12 w-12 text-gray-400" />
                  <p className="text-base font-semibold text-gray-700">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF (MAX. 10MB per file)</p>
                </div>
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*,.pdf" multiple onChange={handleFileChange} />
              </div>
              {reportForm.evidence.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded files:</h4>
                  {reportForm.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <Paperclip className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-800 truncate">{file.name}</span>
                        <span className="text-xs text-gray-500 flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                      </div>
                      <button type="button" onClick={() => handleRemoveFile(file.name)} className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full"><X className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm text-orange-600 mt-2"><AlertTriangle className="inline h-4 w-4 mr-1" />Evidence is crucial. Please upload screenshots of chats, transaction receipts, etc.</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-8 border-t border-gray-100">
            <button type="button" className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">Save as Draft</button>
            <button type="submit" className="flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors font-semibold"><Send className="h-5 w-5" /><span>Submit Report</span></button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Previous Reports</h2>
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search reports..." className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
        <div className="space-y-4">
          {previousReports.map((report) => (
            <div key={report.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-all">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-gray-900">Report #{report.id}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>{report.status}</span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>User:</strong> {report.reportedUser}</p>
                    <p><strong>Category:</strong> {report.category}</p>
                    <p><strong>Amount:</strong> ₹{report.amount.toLocaleString('en-IN')}</p>
                  </div>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">{report.description}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportUser;
