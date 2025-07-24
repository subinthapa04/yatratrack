import React from 'react';
import { 
  Users, Bus, MessageCircle, Package, TrendingUp, 
  Clock, MapPin, Star, AlertCircle, CheckCircle,
  Activity, Zap
} from 'lucide-react';

const AdminStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Users',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Routes',
      value: '156',
      change: '+3.2%',
      trend: 'up',
      icon: MapPin,
      color: 'green'
    },
    {
      title: 'Total Feedback',
      value: '1,234',
      change: '+8.7%',
      trend: 'up',
      icon: MessageCircle,
      color: 'purple'
    },
    {
      title: 'Lost Items',
      value: '89',
      change: '-15.3%',
      trend: 'down',
      icon: Package,
      color: 'orange'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'feedback',
      message: 'New feedback received for Bus #205',
      time: '5 minutes ago',
      icon: MessageCircle,
      color: 'blue',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'lost-item',
      message: 'Lost item reported on Thamel-Patan route',
      time: '12 minutes ago',
      icon: Package,
      color: 'orange',
      priority: 'high'
    },
    {
      id: 3,
      type: 'route-update',
      message: 'Route #108 schedule updated',
      time: '1 hour ago',
      icon: MapPin,
      color: 'green',
      priority: 'low'
    },
    {
      id: 4,
      type: 'user-signup',
      message: '15 new users registered today',
      time: '2 hours ago',
      icon: Users,
      color: 'purple',
      priority: 'low'
    },
    {
      id: 5,
      type: 'system',
      message: 'Route optimization completed',
      time: '3 hours ago',
      icon: Activity,
      color: 'green',
      priority: 'medium'
    }
  ];

  const topRoutes = [
    { 
      route: 'Ratna Park - Bhaktapur', 
      buses: 12, 
      passengers: 2847, 
      satisfaction: 4.2,
      revenue: 'NPR 142,350',
      status: 'active'
    },
    { 
      route: 'Thamel - Patan', 
      buses: 8, 
      passengers: 1923, 
      satisfaction: 4.0,
      revenue: 'NPR 96,150',
      status: 'active'
    },
    { 
      route: 'Kalanki - Koteshwor', 
      buses: 10, 
      passengers: 2156, 
      satisfaction: 3.8,
      revenue: 'NPR 107,800',
      status: 'maintenance'
    },
    { 
      route: 'New Road - Baneshwor', 
      buses: 6, 
      passengers: 1456, 
      satisfaction: 4.1,
      revenue: 'NPR 72,800',
      status: 'active'
    },
  ];

  const systemHealth = [
    { metric: 'Server Uptime', value: '99.8%', status: 'excellent' },
    { metric: 'Response Time', value: '142ms', status: 'good' },
    { metric: 'Database Load', value: '23%', status: 'excellent' },
    { metric: 'Active Connections', value: '1,247', status: 'good' },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600">
          Monitor system performance and user activities across Nepal's transit network.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Live</span>
            </div>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className={`border-l-4 ${getPriorityColor(activity.priority)} pl-4 py-3 bg-gray-50 rounded-r-lg`}>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getColorClasses(activity.color)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">System Health</h3>
          <div className="space-y-4">
            {systemHealth.map((health) => (
              <div key={health.metric} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{health.metric}</p>
                  <p className={`text-lg font-bold ${getHealthColor(health.status)}`}>
                    {health.value}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${
                  health.status === 'excellent' ? 'bg-green-100' :
                  health.status === 'good' ? 'bg-blue-100' :
                  health.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {health.status === 'excellent' || health.status === 'good' ? (
                    <CheckCircle className={`h-5 w-5 ${getHealthColor(health.status)}`} />
                  ) : (
                    <AlertCircle className={`h-5 w-5 ${getHealthColor(health.status)}`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Routes Performance */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Top Routes Performance</h3>
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
            View All Routes
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Route</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Buses</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Daily Passengers</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Satisfaction</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {topRoutes.map((route, index) => (
                <tr key={route.route} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{route.route}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{route.buses}</td>
                  <td className="py-4 px-4 text-gray-700">{route.passengers.toLocaleString()}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-gray-900 font-medium">{route.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700 font-medium">{route.revenue}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStats; 