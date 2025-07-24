import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { Bus, MapPin, MessageCircle, Package, Route, LogOut, Menu, X, Clock, Bell, Phone, User as UserIcon } from 'lucide-react';
import RouteFinder from './RouteFinder';
import LiveMap from './LiveMap';
import LostFound from './LostFound';
import Feedback from './Feedback';
import BusSchedule from './BusSchedule';
import Notifications from './Notifications';
import EmergencyContacts from './EmergencyContacts';
import Profile from './Profile';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('routes');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  const navigation = [
    { id: 'routes', name: 'Route Finder', icon: Route },
    { id: 'map', name: 'Live Map', icon: MapPin },
    { id: 'schedule', name: 'Bus Schedule', icon: Clock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'lost-found', name: 'Lost & Found', icon: Package },
    { id: 'feedback', name: 'Feedback', icon: MessageCircle },
    { id: 'emergency', name: 'Emergency', icon: Phone },
    { id: 'profile', name: 'Profile', icon: UserIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'routes':
        return <RouteFinder />;
      case 'map':
        return <LiveMap />;
      case 'schedule':
        return <BusSchedule />;
      case 'notifications':
        return <Notifications />;
      case 'lost-found':
        return <LostFound />;
      case 'feedback':
        return <Feedback />;
      case 'emergency':
        return <EmergencyContacts />;
      case 'profile':
        return <Profile user={user} />;
      default:
        return <RouteFinder />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <Bus className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">YatraTrack</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center space-x-2 px-6 py-4 border-b border-gray-200">
              <Bus className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">YatraTrack</h1>
                <p className="text-sm text-gray-500">Nepal Transit</p>
              </div>
            </div>

            {/* User Info */}
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-medium">
                    {user.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.email}
                  </p>
                  <p className="text-xs text-gray-500">Regular User</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </nav>

            {/* Sign Out */}
            <div className="px-4 py-4 border-t border-gray-200">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-4 lg:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;