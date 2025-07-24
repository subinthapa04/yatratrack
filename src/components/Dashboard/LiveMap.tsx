import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Bus, Navigation, Zap } from 'lucide-react';

const LiveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [buses, setBuses] = useState<any[]>([]);
  const [selectedBus, setSelectedBus] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      // Import Leaflet dynamically
      import('leaflet').then((L) => {
        // Initialize map
        const mapInstance = L.map(mapRef.current!).setView([27.7172, 85.3240], 12);

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstance);

        // Mock bus data
        const mockBuses = [
          {
            id: 1,
            number: 'Bus #205',
            operator: 'Sajha Yatayat',
            lat: 27.7172,
            lng: 85.3240,
            route: 'Ratna Park - Bhaktapur',
            speed: 25,
            passengers: 32,
            capacity: 45,
            nextStop: 'New Road',
            eta: '3 mins'
          },
          {
            id: 2,
            number: 'Micro #401',
            operator: 'Local Transport',
            lat: 27.7000,
            lng: 85.3200,
            route: 'Thamel - Patan',
            speed: 18,
            passengers: 12,
            capacity: 20,
            nextStop: 'Ratna Park',
            eta: '5 mins'
          },
          {
            id: 3,
            number: 'Bus #108',
            operator: 'City Transport',
            lat: 27.7300,
            lng: 85.3300,
            route: 'Kalanki - Koteshwor',
            speed: 22,
            passengers: 28,
            capacity: 40,
            nextStop: 'Baneshwor',
            eta: '2 mins'
          }
        ];

        // Create custom bus icon
        const busIcon = L.divIcon({
          html: '<div class="bg-blue-600 text-white p-2 rounded-full shadow-lg"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"/></svg></div>',
          className: 'custom-bus-icon',
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        // Add bus markers
        mockBuses.forEach((bus) => {
          const marker = L.marker([bus.lat, bus.lng], { icon: busIcon }).addTo(mapInstance);
          
          marker.bindPopup(`
            <div class="p-2">
              <h3 class="font-bold text-lg">${bus.number}</h3>
              <p class="text-sm text-gray-600">${bus.operator}</p>
              <p class="text-sm">${bus.route}</p>
              <div class="mt-2 space-y-1">
                <p class="text-xs"><strong>Speed:</strong> ${bus.speed} km/h</p>
                <p class="text-xs"><strong>Next Stop:</strong> ${bus.nextStop}</p>
                <p class="text-xs"><strong>ETA:</strong> ${bus.eta}</p>
              </div>
            </div>
          `);

          marker.on('click', () => {
            setSelectedBus(bus);
          });
        });

        setBuses(mockBuses);
        setMap(mapInstance);

        // Cleanup
        return () => {
          mapInstance.remove();
        };
      });
    }
  }, []);

  const zoomToBus = (bus: any) => {
    if (map) {
      map.setView([bus.lat, bus.lng], 15);
      setSelectedBus(bus);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Bus Tracking</h2>
        <p className="text-gray-600">
          Track real-time locations of buses and micros across Kathmandu Valley.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bus List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Active Buses</h3>
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">Live</span>
              </div>
            </div>

            <div className="space-y-3">
              {buses.map((bus) => (
                <div
                  key={bus.id}
                  onClick={() => zoomToBus(bus)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedBus?.id === bus.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{bus.number}</h4>
                      <p className="text-sm text-gray-600">{bus.operator}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        {bus.speed} km/h
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{bus.route}</p>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-500" />
                      <span className="text-gray-600">{bus.nextStop}</span>
                    </div>
                    <span className="text-blue-600 font-medium">{bus.eta}</span>
                  </div>

                  {/* Occupancy Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Occupancy</span>
                      <span className="text-gray-900">{bus.passengers}/{bus.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (bus.passengers / bus.capacity) < 0.7 ? 'bg-green-500' :
                          (bus.passengers / bus.capacity) < 0.9 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(bus.passengers / bus.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="h-96 lg:h-[600px] relative">
              <div
                ref={mapRef}
                className="w-full h-full"
                style={{ minHeight: '400px' }}
              />
              {!map && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Map Controls */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <span className="text-sm text-gray-600">Active Buses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Real-time Updates</span>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
                  <Navigation className="h-4 w-4" />
                  <span>Center Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Bus Details */}
      {selectedBus && (
        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Bus Details</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Basic Info</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Bus Number:</strong> {selectedBus.number}</p>
                <p><strong>Operator:</strong> {selectedBus.operator}</p>
                <p><strong>Route:</strong> {selectedBus.route}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Speed:</strong> {selectedBus.speed} km/h</p>
                <p><strong>Next Stop:</strong> {selectedBus.nextStop}</p>
                <p><strong>ETA:</strong> {selectedBus.eta}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Occupancy</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Passengers:</strong> {selectedBus.passengers}/{selectedBus.capacity}</p>
                <p><strong>Availability:</strong> {selectedBus.capacity - selectedBus.passengers} seats</p>
                <div className={`inline-block px-2 py-1 rounded text-xs ${
                  (selectedBus.passengers / selectedBus.capacity) < 0.7 ? 'bg-green-100 text-green-700' :
                  (selectedBus.passengers / selectedBus.capacity) < 0.9 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                }`}>
                  {(selectedBus.passengers / selectedBus.capacity) < 0.7 ? 'Comfortable' :
                   (selectedBus.passengers / selectedBus.capacity) < 0.9 ? 'Moderate' : 'Crowded'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMap;