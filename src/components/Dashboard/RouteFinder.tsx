import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Navigation, ArrowRight } from 'lucide-react';

const RouteFinder: React.FC = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const popularLocations = [
    'Ratna Park', 'Thamel', 'Boudha', 'Patan Durbar Square',
    'Swayambhunath', 'Bhaktapur', 'New Road', 'Pulchowk',
    'Baneshwor', 'Kalanki', 'Koteshwor', 'Chabahil'
  ];

  const calculateFare = (distance: number) => {
    // Basic fare calculation for Nepal (NPR)
    const baseFare = 15;
    const perKmRate = 8;
    return Math.ceil(baseFare + (distance * perKmRate));
  };

  const findRoutes = async () => {
    if (!source || !destination) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRoutes = [
        {
          id: 1,
          busNumber: 'Bus #205',
          operator: 'Sajha Yatayat',
          distance: 12.5,
          duration: 35,
          stops: [source, 'Ratna Park', 'New Road', destination],
          nextArrival: '5 mins',
          fare: calculateFare(12.5)
        },
        {
          id: 2,
          busNumber: 'Micro #401',
          operator: 'Local Transport',
          distance: 8.2,
          duration: 28,
          stops: [source, 'Baneshwor', destination],
          nextArrival: '12 mins',
          fare: calculateFare(8.2)
        },
        {
          id: 3,
          busNumber: 'Bus #108',
          operator: 'City Transport',
          distance: 15.8,
          duration: 42,
          stops: [source, 'Thamel', 'Ratna Park', 'Patan', destination],
          nextArrival: '8 mins',
          fare: calculateFare(15.8)
        }
      ];
      
      setRoutes(mockRoutes);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Route</h2>
        <p className="text-gray-600">
          Get real-time routes, fares, and bus timings for your journey across Nepal.
        </p>
      </div>

      {/* Route Search Form */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From (Source)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-green-500" />
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter pickup location"
                list="locations"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To (Destination)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-red-500" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter destination"
                list="locations"
              />
            </div>
          </div>
        </div>

        <datalist id="locations">
          {popularLocations.map((location) => (
            <option key={location} value={location} />
          ))}
        </datalist>

        <button
          onClick={findRoutes}
          disabled={!source || !destination || loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Navigation className="h-5 w-5" />
          <span>{loading ? 'Finding Routes...' : 'Find Routes'}</span>
        </button>

        {/* Popular Locations */}
        <div className="mt-6">
          <p className="text-sm font-medium text-gray-700 mb-3">Popular Locations:</p>
          <div className="flex flex-wrap gap-2">
            {popularLocations.slice(0, 8).map((location) => (
              <button
                key={location}
                onClick={() => !source ? setSource(location) : setDestination(location)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Route Results */}
      {routes.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Available Routes</h3>
            <p className="text-sm text-gray-600">{routes.length} routes found</p>
          </div>

          {routes.map((route) => (
            <div key={route.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {route.busNumber}
                    </span>
                    <span className="text-gray-600">{route.operator}</span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{route.duration} mins</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{route.distance} km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>NPR {route.fare}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                    Next: {route.nextArrival}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Track Live
                  </button>
                </div>
              </div>

              {/* Route Stops */}
              <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Route Stops:</p>
                <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                  {route.stops.map((stop: string, index: number) => (
                    <React.Fragment key={stop}>
                      <div className="flex items-center space-x-2 whitespace-nowrap">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          index === 0 ? 'bg-green-500' : 
                          index === route.stops.length - 1 ? 'bg-red-500' : 
                          'bg-gray-300'
                        }`} />
                        <span className="text-sm text-gray-700">{stop}</span>
                      </div>
                      {index < route.stops.length - 1 && (
                        <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {routes.length === 0 && !loading && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
          <Navigation className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Find Your Perfect Route</h3>
          <p className="text-gray-600">
            Enter your source and destination to discover the best public transport options.
          </p>
        </div>
      )}
    </div>
  );
};

export default RouteFinder;