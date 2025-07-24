import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Package, Plus, Search, Clock, MapPin, User, CheckCircle } from 'lucide-react';

const LostFound: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'report' | 'browse'>('browse');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'lost',
    category: '',
    description: '',
    location: '',
    date: '',
    contactEmail: '',
    contactPhone: '',
    reward: ''
  });

  const categories = [
    'Mobile Phone', 'Wallet/Purse', 'Keys', 'Bag/Backpack', 
    'Documents', 'Jewelry', 'Electronics', 'Clothing', 'Other'
  ];

  const busRoutes = [
    'Ratna Park - Bhaktapur', 'Thamel - Patan', 'Kalanki - Koteshwor',
    'New Road - Baneshwor', 'Pulchowk - Chabahil', 'Boudha - Swayambhunath'
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      // Mock data for demo
      const mockItems = [
        {
          id: 1,
          type: 'lost',
          category: 'Mobile Phone',
          description: 'Black iPhone 13 with blue case. Has family photos.',
          location: 'Bus #205 (Ratna Park - Bhaktapur)',
          date: '2024-01-15',
          contactEmail: 'user@example.com',
          contactPhone: '+977-9841234567',
          reward: 'NPR 2000',
          status: 'active',
          reportedBy: 'Rajesh Kumar',
          reportedAt: new Date('2024-01-15T10:30:00')
        },
        {
          id: 2,
          type: 'found',
          category: 'Wallet/Purse',
          description: 'Brown leather wallet with ID cards and some cash.',
          location: 'Micro #401 (Thamel - Patan)',
          date: '2024-01-14',
          contactEmail: 'admin@yatratrack.com',
          contactPhone: '+977-9851234567',
          reward: '',
          status: 'active',
          reportedBy: 'Bus Conductor',
          reportedAt: new Date('2024-01-14T16:45:00')
        },
        {
          id: 3,
          type: 'lost',
          category: 'Keys',
          description: 'House keys with motorcycle key. Red keychain.',
          location: 'Bus #108 (Kalanki - Koteshwor)',
          date: '2024-01-13',
          contactEmail: 'user2@example.com',
          contactPhone: '+977-9812345678',
          reward: 'NPR 500',
          status: 'resolved',
          reportedBy: 'Sita Sharma',
          reportedAt: new Date('2024-01-13T14:20:00')
        }
      ];
      
      setItems(mockItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, this would add to Firestore
      console.log('Submitting item:', formData);
      
      // Mock successful submission
      setTimeout(() => {
        const newItem = {
          id: Date.now(),
          ...formData,
          status: 'active',
          reportedBy: 'Current User',
          reportedAt: new Date()
        };
        
        setItems(prev => [newItem, ...prev]);
        setFormData({
          type: 'lost',
          category: '',
          description: '',
          location: '',
          date: '',
          contactEmail: '',
          contactPhone: '',
          reward: ''
        });
        setActiveTab('browse');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting item:', error);
      setLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lost & Found</h2>
        <p className="text-gray-600">
          Report lost items or browse found items from public transport across Nepal.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab('browse')}
          className={`flex-1 py-3 px-6 rounded-l-lg font-medium transition-all ${
            activeTab === 'browse'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-200'
          }`}
        >
          <Search className="inline h-5 w-5 mr-2" />
          Browse Items
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex-1 py-3 px-6 rounded-r-lg font-medium transition-all ${
            activeTab === 'report'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-600 hover:text-gray-800 border border-l-0 border-gray-200'
          }`}
        >
          <Plus className="inline h-5 w-5 mr-2" />
          Report Item
        </button>
      </div>

      {activeTab === 'browse' ? (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-blue-900">
                    {items.filter(item => item.type === 'lost' && item.status === 'active').length}
                  </p>
                  <p className="text-sm text-blue-600">Lost Items</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Package className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-900">
                    {items.filter(item => item.type === 'found' && item.status === 'active').length}
                  </p>
                  <p className="text-sm text-green-600">Found Items</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold text-orange-900">
                    {items.filter(item => item.status === 'resolved').length}
                  </p>
                  <p className="text-sm text-orange-600">Reunited</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${
                      item.type === 'lost' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      <Package className={`h-6 w-6 ${
                        item.type === 'lost' ? 'text-red-600' : 'text-green-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.type === 'lost' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {item.type === 'lost' ? 'Lost' : 'Found'}
                        </span>
                        <span className="text-gray-600 text-sm">{item.category}</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.status === 'active' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.description}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{item.reportedBy}</span>
                        </div>
                      </div>
                      {item.reward && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mb-3">
                          <p className="text-sm text-yellow-800">
                            <strong>Reward Offered:</strong> {item.reward}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Reported {formatDate(item.reportedAt)}
                  </p>
                  <div className="space-x-3">
                    <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                      Contact Reporter
                    </button>
                    {item.type === 'found' && (
                      <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                        Claim Item
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Report Lost or Found Item</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Item Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      formData.type === 'lost'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Package className="h-6 w-6 mx-auto mb-2" />
                    <span className="font-medium">Lost Item</span>
                    <p className="text-xs text-gray-500 mt-1">I lost something</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type: 'found' }))}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      formData.type === 'found'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Package className="h-6 w-6 mx-auto mb-2" />
                    <span className="font-medium">Found Item</span>
                    <p className="text-xs text-gray-500 mt-1">I found something</p>
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Describe the item in detail (color, brand, size, distinguishing features, etc.)"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (Bus Route/Stop)
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select bus route or enter custom location</option>
                  {busRoutes.map(route => (
                    <option key={route} value={route}>{route}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date {formData.type === 'lost' ? 'Lost' : 'Found'}
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+977-XXXXXXXXXX"
                    required
                  />
                </div>
              </div>

              {/* Reward (optional for lost items) */}
              {formData.type === 'lost' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reward (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.reward}
                    onChange={(e) => setFormData(prev => ({ ...prev, reward: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., NPR 1000"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : `Report ${formData.type === 'lost' ? 'Lost' : 'Found'} Item`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFound;