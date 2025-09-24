import React, { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown, 
  ChevronRight,
  Shield,
  CreditCard,
  AlertTriangle,
  Star,
  FileText,
  Clock,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);

  const helpCategories = [
    {
      id: 'payments',
      title: 'Payments & Transactions',
      icon: CreditCard,
      color: 'bg-blue-100 text-blue-600',
      faqs: [
        {
          id: 'send-money',
          question: 'How do I send money using SecurePay?',
          answer: 'You can send money through UPI ID, QR code, or phone number. Go to the Home tab, enter recipient details and amount, then confirm the transaction.'
        },
        {
          id: 'transaction-limits',
          question: 'What are the transaction limits?',
          answer: 'Daily limit is ₹1,00,000 for UPI transactions. Monthly limit is ₹20,00,000. Limits may vary based on your account verification level.'
        },
        {
          id: 'failed-transaction',
          question: 'What to do if a transaction fails?',
          answer: 'Failed transactions are automatically refunded within 2-3 business days. Check your transaction history for status updates.'
        }
      ]
    },
    {
      id: 'trust-score',
      title: 'Trust Score & Rating',
      icon: Star,
      color: 'bg-yellow-100 text-yellow-600',
      faqs: [
        {
          id: 'trust-score-meaning',
          question: 'What is a Trust Score?',
          answer: 'Trust Score reflects your payment reliability based on transaction history, user feedback, timely repayments, and account verification status.'
        },
        {
          id: 'improve-score',
          question: 'How can I improve my Trust Score?',
          answer: 'Make timely payments, maintain regular transactions, complete KYC verification, and build positive relationships with other users.'
        },
        {
          id: 'score-factors',
          question: 'What factors affect my Trust Score?',
          answer: 'Payment history (40%), user reports (30%), transaction volume (20%), and account verification (10%) determine your score.'
        }
      ]
    },
    {
      id: 'refunds',
      title: 'Refunds & Disputes',
      icon: AlertTriangle,
      color: 'bg-orange-100 text-orange-600',
      faqs: [
        {
          id: 'refund-window',
          question: 'How long do I have to request a refund?',
          answer: 'You have 24 hours to request a refund for money sent to the wrong person. After 24 hours, you need to contact the recipient directly.'
        },
        {
          id: 'refund-process',
          question: 'How does the refund process work?',
          answer: 'Click "Request Refund" on the transaction. The recipient gets a notification and has 48 hours to approve or dispute the refund.'
        },
        {
          id: 'dispute-resolution',
          question: 'What if the recipient refuses to refund?',
          answer: 'You can escalate to our dispute resolution team. We review evidence from both parties and make a decision within 5-7 business days.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Safety',
      icon: Shield,
      color: 'bg-green-100 text-green-600',
      faqs: [
        {
          id: 'account-security',
          question: 'How do I keep my account secure?',
          answer: 'Use a strong password, enable 2FA, never share your PIN, and always verify recipient details before sending money.'
        },
        {
          id: 'suspicious-activity',
          question: 'What to do if I notice suspicious activity?',
          answer: 'Immediately change your password, contact support, and report any unauthorized transactions. We monitor accounts 24/7.'
        },
        {
          id: 'low-trust-warning',
          question: 'Why am I getting warnings about low trust users?',
          answer: 'This alert protects you from potentially risky transactions. Users with low trust scores have poor payment history or negative reports.'
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Live Chat Support',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'bg-blue-600 hover:bg-blue-700',
      action: 'Start Chat'
    },
    {
      title: 'Call Support',
      description: '24/7 phone support available',
      icon: Phone,
      color: 'bg-green-600 hover:bg-green-700',
      action: '1800-SECURE'
    },
    {
      title: 'Email Support',
      description: 'Send us your detailed queries',
      icon: Mail,
      color: 'bg-purple-600 hover:bg-purple-700',
      action: 'support@securepay.com'
    }
  ];

  const filteredCategories = helpCategories.filter(category =>
    searchQuery === '' ||
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.faqs.some(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        <p className="text-gray-600 mt-2">Find answers to your questions or get in touch with our support team</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`${action.color} text-white p-6 rounded-2xl transition-all hover:shadow-lg group`}
          >
            <div className="flex items-center space-x-3">
              <action.icon className="h-8 w-8" />
              <div className="text-left">
                <h3 className="font-semibold">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
                <p className="text-sm font-medium mt-1 group-hover:underline">
                  {action.action}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
        
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-2xl"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                <span className="text-sm text-gray-500">
                  ({category.faqs.length} articles)
                </span>
              </div>
              {expandedCategory === category.id ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>
            
            {expandedCategory === category.id && (
              <div className="border-t border-gray-100">
                {category.faqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => setSelectedFaq(
                        selectedFaq === faq.id ? null : faq.id
                      )}
                      className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{faq.question}</p>
                        {selectedFaq === faq.id ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    {selectedFaq === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Still need help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Support Hours</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
              <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
              <p className="text-green-600 font-medium">Emergency support: 24/7</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">Response Times</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Live Chat: Immediate</p>
              <p>Phone Support: 2-5 minutes</p>
              <p>Email Support: 2-4 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Useful Resources */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Useful Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'User Guide', description: 'Complete guide to using SecurePay', icon: FileText },
            { title: 'Privacy Policy', description: 'How we protect your data', icon: Shield },
            { title: 'Terms of Service', description: 'Our terms and conditions', icon: CheckCircle },
            { title: 'System Status', description: 'Check service availability', icon: Clock }
          ].map((resource, index) => (
            <button
              key={index}
              className="flex items-center space-x-3 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all group"
            >
              <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100">
                <resource.icon className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              </div>
              <div className="text-left flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-900">
                  {resource.title}
                </h4>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
