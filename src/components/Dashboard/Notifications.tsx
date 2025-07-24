import React, { useState, useEffect } from 'react';
import { Bell, X, Clock, MapPin, AlertTriangle, Info, CheckCircle, Settings } from 'lucide-react';

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [settings, setSettings] = useState({
    busDelays: true,
    routeChanges: true,
    lostFoundMatches: true,
    systemUpdates: false,
    promotions: false
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    const mockNotifications = [
      {
        id: 1,
        type: 'delay',
        title: 'Bus Delay Alert',
        message: 'Bus #205 on Ratna Park - Bhaktapur route is running 15 minutes late due to traffic.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        priority: 'high',
        actionable: true
      },
      {
        id: 2,
        type: 'match',
        title: 'Lost Item Match Found',
        message: 'A potential match has been found for your lost wallet reported on January 14th.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        priority: 'medium',
        actionable: true
      },
      {
        id: 3,
        type: 'route',
        title: 'Route Schedule Update',
        message: 'New express service added to Thamel - Patan route with reduced travel time.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true,
        priority: 'low',
        actionable: false
      },
      {
        id: 4,
        type: 'system',
        title: 'App Update Available',
        message: 'Version 2.1 is now available with improved real-time tracking and new features.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: false,
        priority: 'low',
        actionable: true
      },
      {
        id: 5,
        type: 'reminder',
        title: 'Bus Reminder',
        message: 'Your favorite bus #108 departs in 10 minutes from Kalanki.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        read: true,
        priority: 'medium',
        actionable: false
      }
    ];
    setNotifications(mockNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'delay': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'match': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'route': return <MapPin className="h-5 w-5 text-blue-500" />;
      case 'system': return <Info className="h-5 w-5 text-purple-500" />;
      case 'reminder': return <Clock className="h-5 w-5 text-orange-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h2>
            <p className="text-gray-600">
              Stay updated with real-time alerts and important information.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                Mark All Read
              </button>
            )}
            <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {unreadCount} unread
            </div>
          </div>
        </div>
      </div>

      {/* Notification Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'unread', label: 'Unread' },
            { key: 'delay', label: 'Delays' },
            { key: 'match', label: 'Matches' },
            { key: 'route', label: 'Routes' },
            { key: 'system', label: 'System' }
          ].map(filterOption => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === filterOption.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filterOption.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 ${getPriorityColor(notification.priority)} bg-white rounded-r-xl shadow-lg border-t border-r border-b border-gray-100 p-6 ${
              !notification.read ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{notification.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{formatTimestamp(notification.timestamp)}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      notification.priority === 'high' ? 'bg-red-100 text-red-700' :
                      notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {notification.priority} priority
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {notification.actionable && (
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                    View Details
                  </button>
                )}
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Mark as read"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete notification"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? "You're all caught up! No notifications to show."
              : `No ${filter} notifications found.`
            }
          </p>
        </div>
      )}

      {/* Notification Settings */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Settings className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-bold text-gray-900">Notification Settings</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(settings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm text-gray-600">
                  {key === 'busDelays' && 'Get notified when your buses are delayed'}
                  {key === 'routeChanges' && 'Receive updates about route modifications'}
                  {key === 'lostFoundMatches' && 'Alert when potential matches are found'}
                  {key === 'systemUpdates' && 'System maintenance and update notifications'}
                  {key === 'promotions' && 'Special offers and promotional content'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setSettings(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;