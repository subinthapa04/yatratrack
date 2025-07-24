import React, { useState, useEffect } from 'react';
import { Clock, Bus, MapPin, Calendar, Bell, Star, Filter } from 'lucide-react';

const BusSchedule: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const routes = [
    'Ratna Park - Bhaktapur',
    'Thamel - Patan', 
    'Kalanki - Koteshwor',
    'New Road - Baneshwor',
    'Pulchowk - Chabahil',
    'Boudha - Swayambhunath'
  ];

  useEffect(() => {
    if (selectedRoute) {
      fetchSchedules();
    }
  }, [selectedRoute, selectedDate]);

  const fetchSchedules = () => {
    // Mock schedule data
    const mockSchedules = [
      {
        id: 1,
        busNumber: 'Bus #205',
        operator: 'Sajha Yatayat',
        departureTime: '06:00',
        arrivalTime: '06:45',
        frequency: '15 mins',
        fare: 25,
        status: 'on-time',
        occupancy: 'low',
        nextBuses: ['06:15', '06:30', '06:45']
      },
      {
        id: 2,
        busNumber: 'Micro #401',
        operator: 'Local Transport',
        departureTime: '06:10',
        arrivalTime: '06:45',
        frequency: '20 mins',
        fare: 20,
        status: 'delayed',
        occupancy: 'medium',
        nextBuses: ['06:30', '06:50', '07:10']
      },
      {
        id: 3,
        busNumber: 'Bus #108',
        operator: 'City Transport',
        departureTime: '06:05',
        arrivalTime: '06:50',
        frequency: '12 mins',
        fare: 30,
        status: 'on-time',
        occupancy: 'high',
        nextBuses: ['06:17', '06:29', '06:41']
      }
    ];
    setSchedules(mockSchedules);
  };

  const toggleFavorite = (busNumber: string) => {
    setFavorites(prev => 
      prev.includes(busNumber) 
        ? prev.filter(fav => fav !== busNumber)
        : [...prev, busNumber]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'bg-green-100 text-green-700';
      case 'delayed': return 'bg-red-100 text-red-700';
      case 'early': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Bus Schedules</h2>
        <p className="text-gray-600">
          View real-time bus schedules, set reminders, and track your favorite routes.
        </p>
      </div>

      {/* Schedule Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Route
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a route</option>
                {routes.map(route => (
                  <option key={route} value={route}>{route}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-blue-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Results */}
      {schedules.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">
              Schedule for {selectedRoute}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Updated 2 mins ago</span>
            </div>
          </div>

          {schedules.map((schedule) => (
            <div key={schedule.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Bus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {schedule.busNumber}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(schedule.status)}`}>
                        {schedule.status}
                      </span>
                      <button
                        onClick={() => toggleFavorite(schedule.busNumber)}
                        className={`p-1 rounded-full transition-colors ${
                          favorites.includes(schedule.busNumber)
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`h-5 w-5 ${favorites.includes(schedule.busNumber) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-3">{schedule.operator}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Departure</p>
                        <p className="font-semibold text-gray-900">{schedule.departureTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Arrival</p>
                        <p className="font-semibold text-gray-900">{schedule.arrivalTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Frequency</p>
                        <p className="font-semibold text-gray-900">{schedule.frequency}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fare</p>
                        <p className="font-semibold text-gray-900">NPR {schedule.fare}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-gray-600">Occupancy:</span>
                    <div className={`w-3 h-3 rounded-full ${getOccupancyColor(schedule.occupancy)}`}></div>
                    <span className="text-sm font-medium capitalize">{schedule.occupancy}</span>
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                    <Bell className="h-4 w-4" />
                    <span>Set Reminder</span>
                  </button>
                </div>
              </div>

              {/* Next Buses */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Next Departures:</p>
                <div className="flex items-center space-x-4">
                  {schedule.nextBuses.map((time: string, index: number) => (
                    <div key={time} className={`px-3 py-1 rounded-lg text-sm ${
                      index === 0 ? 'bg-green-100 text-green-700 font-medium' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {schedules.length === 0 && selectedRoute && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Schedules Available</h3>
          <p className="text-gray-600">
            Schedule information for this route is currently unavailable.
          </p>
        </div>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Favorite Routes</h3>
          <div className="flex flex-wrap gap-2">
            {favorites.map(favorite => (
              <div key={favorite} className="flex items-center space-x-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-yellow-800">{favorite}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusSchedule;