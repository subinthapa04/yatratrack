import React, { useState } from 'react';
import { Package, CheckCircle, Clock, User, MapPin, Phone, Mail, Search, Filter } from 'lucide-react';

const LostFoundManagement: React.FC = () => {
  const [items, setItems] = useState([
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
      reportedAt: new Date('2024-01-15T10:30:00'),
      matchedWith: null
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
      reportedAt: new Date('2024-01-14T16:45:00'),
      matchedWith: null
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
      reportedAt: new Date('2024-01-13T14:20:00'),
      matchedWith: 4
    },
    {
      id: 4,
      type: 'found',
      category: 'Keys',
      description: 'Set of keys with red keychain found on bus seat.',
      location: 'Bus #108 (Kalanki - Koteshwor)',
      date: '2024-01-13',
      contactEmail: 'conductor@transport.com',
      contactPhone: '+977-9823456789',
      reward: '',
      status: 'resolved',
      reportedBy: 'Bus Conductor',
      reportedAt: new Date('2024-01-13T15:30:00'),
      matchedWith: 3
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [potentialMatches, setPotentialMatches] = useState<any[]>([]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'lost' && item.type === 'lost') ||
                         (filter === 'found' && item.type === 'found') ||
                         (filter === 'active' && item.status === 'active') ||
                         (filter === 'resolved' && item.status === 'resolved');
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const findPotentialMatches = (item: any) => {
    const oppositeType = item.type === 'lost' ? 'found' : 'lost';
    const matches = items.filter(otherItem => 
      otherItem.type === oppositeType &&
      otherItem.status === 'active' &&
      otherItem.category === item.category &&
      otherItem.id !== item.id
    );
    setPotentialMatches(matches);
    setSelectedItem(item);
  };

  const handleMatch = (item1Id: number, item2Id: number) => {
    setItems(prev => prev.map(item => {
      if (item.id === item1Id || item.id === item2Id) {
        return { 
          ...item, 
          status: 'resolved', 
          matchedWith: item.id === item1Id ? item2Id : item1Id 
        };
      }
      return item;
    }));
    setSelectedItem(null);
    setPotentialMatches([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'expired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
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

  const stats = {
    totalItems: items.length,
    lostItems: items.filter(item => item.type === 'lost' && item.status === 'active').length,
    foundItems: items.filter(item => item.type === 'found' && item.status === 'active').length,
    resolved: items.filter(item => item.status === 'resolved').length,
    matchRate: ((items.filter(item => item.status === 'resolved').length / items.length) * 100).toFixed(1)
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lost & Found Management</h2>
        <p className="text-gray-600">
          Manage lost and found items, facilitate matches, and help users reunite with their belongings.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
              <p className="text-sm text-gray-600">Total Items</p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-900">{stats.lostItems}</p>
            <p className="text-sm text-red-600">Lost Items</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-900">{stats.foundItems}</p>
            <p className="text-sm text-green-600">Found Items</p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{stats.resolved}</p>
            <p className="text-sm text-blue-600">Resolved</p>
          </div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-900">{stats.matchRate}%</p>
            <p className="text-sm text-orange-600">Match Rate</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Items</option>
              <option value="lost">Lost Items</option>
              <option value="found">Found Items</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
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
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                      {item.type === 'lost' ? 'Lost' : 'Found'}
                    </span>
                    <span className="text-gray-600 text-sm">{item.category}</span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    {item.matchedWith && (
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                        Matched
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.description}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>{item.reportedBy}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{item.contactEmail}</span>
                      </div>
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
              <div className="flex items-center space-x-3">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(item.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="active">Active</option>
                  <option value="resolved">Resolved</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Reported {formatDate(item.reportedAt)}</span>
                <div className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{item.contactPhone}</span>
                </div>
              </div>
              <div className="space-x-3">
                {item.status === 'active' && (
                  <button
                    onClick={() => findPotentialMatches(item)}
                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                  >
                    Find Matches
                  </button>
                )}
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                  Contact Reporter
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Match Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Potential Matches for {selectedItem.type === 'lost' ? 'Lost' : 'Found'} Item
              </h3>
              <p className="text-gray-600 mt-1">{selectedItem.description}</p>
            </div>

            <div className="p-6">
              {potentialMatches.length > 0 ? (
                <div className="space-y-4">
                  {potentialMatches.map((match) => (
                    <div key={match.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-2 py-1 rounded text-sm font-medium ${getTypeColor(match.type)}`}>
                              {match.type === 'lost' ? 'Lost' : 'Found'}
                            </span>
                            <span className="text-gray-600">{match.category}</span>
                          </div>
                          <p className="text-gray-900 mb-2">{match.description}</p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-3 w-3" />
                              <span>{match.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="h-3 w-3" />
                              <span>{match.reportedBy}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(match.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleMatch(selectedItem.id, match.id)}
                          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Match Items</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No potential matches found for this item.</p>
                </div>
              )}

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostFoundManagement;