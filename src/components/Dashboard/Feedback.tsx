import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { MessageCircle, Star, Send, ThumbsUp, Clock, User } from 'lucide-react';

const Feedback: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('');
  const [busRoute, setBusRoute] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackList, setFeedbackList] = useState<any[]>([]);

  const categories = [
    'Bus Timing', 'Driver Behavior', 'Bus Condition', 'Route Information',
    'Fare Issues', 'Safety Concerns', 'App Issues', 'General Feedback'
  ];

  const busRoutes = [
    'Ratna Park - Bhaktapur', 'Thamel - Patan', 'Kalanki - Koteshwor',
    'New Road - Baneshwor', 'Pulchowk - Chabahil', 'Boudha - Swayambhunath'
  ];

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      // Mock feedback data for demo
      const mockFeedback = [
        {
          id: 1,
          feedback: 'The bus was on time and the driver was very courteous. Great service!',
          rating: 5,
          category: 'Driver Behavior',
          busRoute: 'Ratna Park - Bhaktapur',
          userName: 'Rajesh Kumar',
          timestamp: new Date('2024-01-15T10:30:00'),
          likes: 12,
          status: 'resolved'
        },
        {
          id: 2,
          feedback: 'Bus #205 broke down midway and we had to wait for 45 minutes. Please improve maintenance.',
          rating: 2,
          category: 'Bus Condition',
          busRoute: 'Thamel - Patan',
          userName: 'Sita Sharma',
          timestamp: new Date('2024-01-14T16:45:00'),
          likes: 8,
          status: 'in-progress'
        },
        {
          id: 3,
          feedback: 'Love the new real-time tracking feature! Makes planning my commute so much easier.',
          rating: 5,
          category: 'App Issues',
          busRoute: 'Kalanki - Koteshwor',
          userName: 'Amit Thapa',
          timestamp: new Date('2024-01-13T14:20:00'),
          likes: 15,
          status: 'resolved'
        },
        {
          id: 4,
          feedback: 'The fare seems to have increased without prior notice. Please provide transparent pricing.',
          rating: 3,
          category: 'Fare Issues',
          busRoute: 'New Road - Baneshwor',
          userName: 'Maya Gurung',
          timestamp: new Date('2024-01-12T09:15:00'),
          likes: 6,
          status: 'pending'
        }
      ];
      
      setFeedbackList(mockFeedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim() || rating === 0 || !category) return;

    setLoading(true);
    try {
      // In a real app, this would add to Firestore
      console.log('Submitting feedback:', { feedback, rating, category, busRoute });
      
      // Mock successful submission
      setTimeout(() => {
        const newFeedback = {
          id: Date.now(),
          feedback,
          rating,
          category,
          busRoute,
          userName: 'Current User',
          timestamp: new Date(),
          likes: 0,
          status: 'pending'
        };
        
        setFeedbackList(prev => [newFeedback, ...prev]);
        setFeedback('');
        setRating(0);
        setCategory('');
        setBusRoute('');
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
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

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Feedback & Reviews</h2>
        <p className="text-gray-600">
          Share your experience and help us improve public transportation services.
        </p>
      </div>

      {/* Feedback Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Submit Your Feedback</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Overall Rating
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-1 transition-colors ${
                    star <= rating ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'
                  }`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
              <span className="ml-3 text-sm text-gray-600">
                {rating > 0 && (
                  <>
                    {rating}/5 - {
                      rating === 5 ? 'Excellent' :
                      rating === 4 ? 'Good' :
                      rating === 3 ? 'Average' :
                      rating === 2 ? 'Poor' : 'Very Poor'
                    }
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Bus Route */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bus Route (Optional)
            </label>
            <select
              value={busRoute}
              onChange={(e) => setBusRoute(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select bus route</option>
              {busRoutes.map(route => (
                <option key={route} value={route}>{route}</option>
              ))}
            </select>
          </div>

          {/* Feedback Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Tell us about your experience, suggestions for improvement, or any issues you faced..."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              {feedback.length}/500 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !feedback.trim() || rating === 0 || !category}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Send className="h-5 w-5" />
            <span>{loading ? 'Submitting...' : 'Submit Feedback'}</span>
          </button>
        </form>
      </div>

      {/* Feedback Statistics */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-900">4.2</p>
              <p className="text-sm text-green-600">Avg Rating</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{feedbackList.length}</p>
              <p className="text-sm text-blue-600">Total Reviews</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-900">
                {feedbackList.filter(f => f.status === 'pending').length}
              </p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <ThumbsUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-900">
                {feedbackList.filter(f => f.status === 'resolved').length}
              </p>
              <p className="text-sm text-purple-600">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">Recent Feedback</h3>
        
        {feedbackList.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{item.userName}</h4>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < item.rating 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className={`ml-1 text-sm font-medium ${getRatingColor(item.rating)}`}>
                        {item.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {item.category}
                    </span>
                    {item.busRoute && (
                      <span className="text-gray-600 text-sm">{item.busRoute}</span>
                    )}
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3">{item.feedback}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(item.timestamp)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{item.likes} helpful</span>
                </div>
              </div>
              <button className="flex items-center space-x-2 px-3 py-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                <ThumbsUp className="h-4 w-4" />
                <span>Helpful</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;