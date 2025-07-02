import React, { useState } from 'react';
import { X, Star } from 'lucide-react';
import clientService, { CreateClientRequest } from '../../services/clientService';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClientCreated: () => void;
}

// Adjust CreateClientRequest for only the required fields
interface ClientForm {
  clientName: string;
  email: string;
  onBoardedOn: string; // ISO date string
  clientRating: number;
  isActive: boolean;
}

const initialForm: ClientForm = {
  clientName: '',
  email: '',
  onBoardedOn: '',
  clientRating: 0,
  isActive: true,
};

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onClientCreated }) => {
  const [formData, setFormData] = useState<ClientForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Prepare DTO for backend
      const dto = {
        name: formData.clientName,
        email: formData.email,
        onBoardedOn: formData.onBoardedOn,
        clientRating: formData.clientRating,
        isActive: formData.isActive,
      };
      await clientService.createClient(dto as any); // as any to match backend DTO
      setFormData(initialForm);
      onClientCreated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Add New Client</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
            <input
              name="clientName"
              type="text"
              required
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter client name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">On Boarded On *</label>
            <input
              name="onBoardedOn"
              type="date"
              required
              value={formData.onBoardedOn}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-3">
            <span className="block text-sm font-medium text-gray-700">Status:</span>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
              className={`relative inline-flex items-center h-6 rounded-full w-12 transition-colors focus:outline-none ${formData.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
              aria-pressed={formData.isActive}
            >
              <span
                className={`inline-block w-6 h-6 transform bg-white rounded-full shadow transition-transform ${formData.isActive ? 'translate-x-6' : 'translate-x-0'}`}
              />
            </button>
            <span className={`ml-2 text-sm font-semibold ${formData.isActive ? 'text-green-600' : 'text-red-600'}`}>{formData.isActive ? 'Active' : 'Inactive'}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client Rating (1-10) *</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5,6,7,8,9,10].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData(prev => ({ ...prev, clientRating: star }))}
                  className="focus:outline-none"
                  aria-label={`Set rating to ${star}`}
                >
                  <Star className={`w-6 h-6 ${star <= formData.clientRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                </button>
              ))}
              <span className="ml-2 text-gray-700 font-semibold">{formData.clientRating} / 10</span>
            </div>
          </div>
          {/* Associated Projects: For create, this is empty. For edit, you could display a list here. */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal; 