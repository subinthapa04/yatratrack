import React, { useState } from 'react';
import { MessageCircle, Star, Reply, Filter, Search, Clock, User, CheckCircle } from 'lucide-react';

const FeedbackManagement: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState([
    {
      id: 1,
      user: 'Subin Thapa',
      email: 'rajesh@example.com',
      rating: 5,
      category: 'Driver Behavior',
      busRoute: 'Ratna Park - Bhaktapur',
      feedback: 'The bus was on time and the driver was very courteous. Great service!',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'new',
      priority: 'low',
      adminResponse: null
    },
    {
      id: 2,
      user: 'Anjil Acharya',
      email: 'sita@example.com',
      rating: 2,
      category: 'Bus Condition',
      busRoute: 'Thamel - Patan',
      feedback: 'Bus #205 broke down midway and we had to wait for 45 minutes. Please improve maintenance.',
      timestamp: new Date('2024-01-14T16:45:00'),
      status: 'in-progress',
      priority: 'high',
      adminResponse: 'Thank you for reporting this issue. We have scheduled immediate maintenance for Bus #205.'
    },
    {
      id: 3,
      user: 'Hemraj Giri',
      email: 'hemraj@gmail.com',
      rating: 5,
      category: 'App Issues',
      busRoute: 'Kalanki - Koteshwor',
      feedback: 'Love the new real-time tracking feature! Makes planning my commute so much easier.',
      timestamp: new Date('2024-01-13T14:20:00'),
      status: 'resolved',
      priority: 'low',
      adminResponse: 'Thank you for your positive feedback! We are glad the feature is helpful.'
    },
    {
      id: 4,
      user: 'Maya Gurung',
      email: 'maya@example.com',
      rating: 3,
      category: 'Fare Issues',
      busRoute: 'New Road - Baneshwor',
      feedback: 'The fare seems to have increased without prior notice. Please provide transparent pricing.',
      timestamp: new Date('2024-01-12T09:15:00'),
      status: 'new',
      priority: 'medium',
      adminResponse: null
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);
  const [responseText, setResponseText] = useState('');

  const categories = ['All Categories', 'Bus Timing', 'Driver Behavior', 'Bus Condition', 'Route Information', 'Fare Issues', 'Safety Concerns', 'App Issues', 'General Feedback'];
  const statuses = ['all', 'new', 'in-progress', 'resolved'];

  const filteredFeedback = feedbackList.filter(item => {
    const matchesSearch = item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.feedback.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.busRoute.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (id: number, newStatus: string) => {
    setFeedbackList(prev => prev.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleResponse = (feedback: any) => {
    setSelectedFeedback(feedback);
    setResponseText(feedback.adminResponse || '');
  };

  const submitResponse = () => {
    if (!selectedFeedback || !responseText.trim()) return;

    setFeedbackList(prev => prev.map(item => 
      item.id === selectedFeedback.id 
        ? { ...item, adminResponse: responseText, status: 'resolved' }
        : item
    ));

    setSelectedFeedback(null);
    setResponseText('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
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
    total: feedbackList.length,
    new: feedbackList.filter(f => f.status === 'new').length,
    inProgress: feedbackList.filter(f => f.status === 'in-progress').length,
    resolved: feedbackList.filter(f => f.status === 'resolved').length,
    avgRating: (feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length).toFixed(1)
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Feedback Management</h2>
        <p className="text-gray-600">
          Monitor and respond to user feedback to improve service quality.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-600">Total Feedback</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-900">{stats.new}</p>
            <p className="text-sm text-blue-600">New</p>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-900">{stats.inProgress}</p>
            <p className="text-sm text-yellow-600">In Progress</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
            <p className="text-sm text-green-600">Resolved</p>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-900">{stats.avgRating}</p>
            <p className="text-sm text-purple-600">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search feedback..."
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
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <div key={feedback.id} className={`border-l-4 ${getPriorityColor(feedback.priority)} bg-white rounded-r-xl shadow-lg border-t border-r border-b border-gray-100 p-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{feedback.user}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className={`ml-1 text-sm font-medium ${getRatingColor(feedback.rating)}`}>
                        {feedback.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {feedback.category}
                    </span>
                    <span className="text-gray-600 text-sm">{feedback.busRoute}</span>
                    <span className="text-gray-600 text-sm">{feedback.email}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{feedback.feedback}</p>
                  
                  {feedback.adminResponse && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                      <div className="flex items-start space-x-2">
                        <Reply className="h-4 w-4 text-blue-600 mt-1" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 mb-1">Admin Response:</p>
                          <p className="text-sm text-blue-800">{feedback.adminResponse}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(feedback.status)}`}>
                  {feedback.status}
                </span>
                <select
                  value={feedback.status}
                  onChange={(e) => handleStatusChange(feedback.id, e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1"
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(feedback.timestamp)}</span>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  feedback.priority === 'high' ? 'bg-red-100 text-red-700' :
                  feedback.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {feedback.priority} priority
                </span>
              </div>
              <button
                onClick={() => handleResponse(feedback)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                <Reply className="h-4 w-4" />
                <span>{feedback.adminResponse ? 'Edit Response' : 'Respond'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Response Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                Respond to Feedback
              </h3>
              <p className="text-gray-600 mt-1">From: {selectedFeedback.user}</p>
            </div>

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-800">{selectedFeedback.feedback}</p>
              </div>

              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                placeholder="Type your response here..."
              />

              <div className="flex space-x-4 mt-6">
                <button
                  onClick={submitResponse}
                  disabled={!responseText.trim()}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>Send Response</span>
                </button>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;