import React, { useState } from 'react';
import { Phone, MapPin, Clock, AlertTriangle, Shield, Ambulance, Car, Users } from 'lucide-react';

const EmergencyContacts: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const emergencyContacts = [
    {
      id: 1,
      category: 'police',
      name: 'Nepal Police Emergency',
      number: '100',
      description: 'General emergency police assistance',
      available: '24/7',
      location: 'Nationwide'
    },
    {
      id: 2,
      category: 'medical',
      name: 'Emergency Medical Service',
      number: '102',
      description: 'Ambulance and medical emergency',
      available: '24/7',
      location: 'Nationwide'
    },
    {
      id: 3,
      category: 'fire',
      name: 'Fire Brigade',
      number: '101',
      description: 'Fire emergency and rescue services',
      available: '24/7',
      location: 'Nationwide'
    },
    {
      id: 4,
      category: 'transport',
      name: 'Traffic Police Kathmandu',
      number: '01-4226359',
      description: 'Traffic accidents and road incidents',
      available: '24/7',
      location: 'Kathmandu Valley'
    },
    {
      id: 5,
      category: 'transport',
      name: 'Sajha Yatayat Control Room',
      number: '01-4266131',
      description: 'Bus service complaints and emergencies',
      available: '6:00 AM - 10:00 PM',
      location: 'Kathmandu Valley'
    },
    {
      id: 6,
      category: 'medical',
      name: 'Bir Hospital Emergency',
      number: '01-4221119',
      description: 'Major government hospital emergency',
      available: '24/7',
      location: 'Kathmandu'
    },
    {
      id: 7,
      category: 'police',
      name: 'Tourist Police',
      number: '01-4247041',
      description: 'Assistance for tourists and visitors',
      available: '24/7',
      location: 'Major tourist areas'
    },
    {
      id: 8,
      category: 'transport',
      name: 'Department of Transport',
      number: '01-4262866',
      description: 'Transport licensing and regulation',
      available: '10:00 AM - 5:00 PM',
      location: 'Kathmandu'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Services', icon: Shield },
    { key: 'police', label: 'Police', icon: Shield },
    { key: 'medical', label: 'Medical', icon: Ambulance },
    { key: 'fire', label: 'Fire Brigade', icon: AlertTriangle },
    { key: 'transport', label: 'Transport', icon: Car }
  ];

  const filteredContacts = selectedCategory === 'all' 
    ? emergencyContacts 
    : emergencyContacts.filter(contact => contact.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'police': return 'bg-blue-100 text-blue-700';
      case 'medical': return 'bg-red-100 text-red-700';
      case 'fire': return 'bg-orange-100 text-orange-700';
      case 'transport': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'police': return <Shield className="h-5 w-5" />;
      case 'medical': return <Ambulance className="h-5 w-5" />;
      case 'fire': return <AlertTriangle className="h-5 w-5" />;
      case 'transport': return <Car className="h-5 w-5" />;
      default: return <Phone className="h-5 w-5" />;
    }
  };

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Emergency Contacts</h2>
        <p className="text-gray-600">
          Quick access to important emergency numbers and transport authorities in Nepal.
        </p>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Guidelines</h3>
            <ul className="text-red-800 space-y-1 text-sm">
              <li>• For life-threatening emergencies, call 100 (Police) or 102 (Medical) immediately</li>
              <li>• Stay calm and provide clear location information</li>
              <li>• Keep your phone charged and accessible while traveling</li>
              <li>• Share your travel plans with family or friends</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-6">
        <div className="flex flex-wrap gap-3">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Emergency Contacts List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getCategoryColor(contact.category)}`}>
                  {getCategoryIcon(contact.category)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {contact.description}
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{contact.available}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{contact.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-2xl font-bold text-gray-900">
                {contact.number}
              </div>
              <button
                onClick={() => handleCall(contact.number)}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Dial Section */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Dial Emergency Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { number: '100', label: 'Police', color: 'bg-blue-600' },
            { number: '101', label: 'Fire', color: 'bg-orange-600' },
            { number: '102', label: 'Medical', color: 'bg-red-600' },
            { number: '103', label: 'Disaster', color: 'bg-purple-600' }
          ].map(emergency => (
            <button
              key={emergency.number}
              onClick={() => handleCall(emergency.number)}
              className={`${emergency.color} text-white p-4 rounded-xl hover:opacity-90 transition-opacity text-center`}
            >
              <div className="text-2xl font-bold mb-1">{emergency.number}</div>
              <div className="text-sm">{emergency.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Users className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Public Transport Safety Tips</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Before Traveling</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Check bus schedules and routes in advance</li>
              <li>• Inform someone about your travel plans</li>
              <li>• Keep emergency contacts readily available</li>
              <li>• Carry sufficient cash for fare and emergencies</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">During Travel</h4>
            <ul className="text-gray-700 space-y-1 text-sm">
              <li>• Stay alert and aware of your surroundings</li>
              <li>• Keep valuables secure and out of sight</li>
              <li>• Know the location of emergency exits</li>
              <li>• Report suspicious activities to authorities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;