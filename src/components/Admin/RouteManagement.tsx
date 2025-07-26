import React, { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Bus, Clock, Users ,DollarSign} from 'lucide-react';

const RouteManagement: React.FC = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: 'Ratna Park - Bhaktapur',
      distance: 18.5,
      estimatedTime: 45,
      fare: 25,
      buses: 12,
      frequency: '5-7 mins',
      status: 'active',
      stops: ['Ratna Park', 'New Road', 'Thapathali', 'Kumaripati', 'Lagankhel', 'Bhaktapur']
    },
    {
      id: 2,
      name: 'Thamel - Patan',
      distance: 12.3,
      estimatedTime: 35,
      fare: 20,
      buses: 8,
      frequency: '8-10 mins',
      status: 'active',
      stops: ['Thamel', 'Ratna Park', 'Tripureshwor', 'Kalimati', 'Patan']
    },
    {
      id: 3,
      name: 'Kalanki - Koteshwor',
      distance: 22.1,
      estimatedTime: 55,
      fare: 30,
      buses: 10,
      frequency: '6-8 mins',
      status: 'maintenance',
      stops: ['Kalanki', 'Balkhu', 'Ratna Park', 'Baneshwor', 'Koteshwor']
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingRoute, setEditingRoute] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    distance: '',
    estimatedTime: '',
    fare: '',
    buses: '',
    frequency: '',
    stops: ['', '']
  });

  const handleAddRoute = () => {
    setEditingRoute(null);
    setFormData({
      name: '',
      distance: '',
      estimatedTime: '',
      fare: '',
      buses: '',
      frequency: '',
      stops: ['', '']
    });
    setShowModal(true);
  };

  const handleEditRoute = (route: any) => {
    setEditingRoute(route);
    setFormData({
      name: route.name,
      distance: route.distance.toString(),
      estimatedTime: route.estimatedTime.toString(),
      fare: route.fare.toString(),
      buses: route.buses.toString(),
      frequency: route.frequency,
      stops: [...route.stops]
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const routeData = {
      id: editingRoute ? editingRoute.id : Date.now(),
      name: formData.name,
      distance: parseFloat(formData.distance),
      estimatedTime: parseInt(formData.estimatedTime),
      fare: parseInt(formData.fare),
      buses: parseInt(formData.buses),
      frequency: formData.frequency,
      stops: formData.stops.filter(stop => stop.trim() !== ''),
      status: editingRoute ? editingRoute.status : 'active'
    };

    if (editingRoute) {
      setRoutes(prev => prev.map(route => route.id === editingRoute.id ? routeData : route));
    } else {
      setRoutes(prev => [...prev, routeData]);
    }

    setShowModal(false);
  };

  const handleDeleteRoute = (id: number) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(prev => prev.filter(route => route.id !== id));
    }
  };

  const addStop = () => {
    setFormData(prev => ({
      ...prev,
      stops: [...prev.stops, '']
    }));
  };

  const removeStop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index)
    }));
  };

  const updateStop = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      stops: prev.stops.map((stop, i) => i === index ? value : stop)
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Route Management</h2>
            <p className="text-gray-600">
              Manage bus routes, schedules, and fare information across the network.
            </p>
          </div>
          <button
            onClick={handleAddRoute}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Route</span>
          </button>
        </div>
      </div>

      {/* Routes List */}
      <div className="space-y-6">
        {routes.map((route) => (
          <div key={route.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{route.name}</h3>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{route.distance} km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{route.estimatedTime} mins</span>
                    </div>
                    <div className="flex items-center space-x-1">
           
                      <DollarSign className="h-4 w-4" />
                      <span>NPR {route.fare}</span>
                    </div> 
        
                      
                      {/* 
                      <div className="flex items-center gap-2">
                      <span>Rs</span>
                      <span>{route.fare}</span>
                    </div> 
                    */}
                      
                    <div className="flex items-center space-x-1">
                      <Bus className="h-4 w-4"/>
                      <span>{route.buses} buses</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(route.status)}`}>
                  {route.status}
                </span>
                <button
                  onClick={() => handleEditRoute(route)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteRoute(route.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Route Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Route Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium">{route.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Buses:</span>
                    <span className="font-medium">{route.buses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Bus Stops</h4>
                <div className="flex flex-wrap gap-2">
                  {route.stops.map((stop, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {stop}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Route */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {editingRoute ? 'Edit Route' : 'Add New Route'}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Ratna Park - Bhaktapur"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Distance (km)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.distance}
                    onChange={(e) => setFormData(prev => ({ ...prev, distance: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.estimatedTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedTime: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fare (NPR)
                  </label>
                  <input
                    type="number"
                    value={formData.fare}
                    onChange={(e) => setFormData(prev => ({ ...prev, fare: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Buses
                  </label>
                  <input
                    type="number"
                    value={formData.buses}
                    onChange={(e) => setFormData(prev => ({ ...prev, buses: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequency
                  </label>
                  <input
                    type="text"
                    value={formData.frequency}
                    onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 5-7 mins"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Bus Stops
                  </label>
                  <button
                    type="button"
                    onClick={addStop}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Stop
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.stops.map((stop, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={stop}
                        onChange={(e) => updateStop(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Stop ${index + 1}`}
                      />
                      {formData.stops.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeStop(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingRoute ? 'Update Route' : 'Create Route'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;