import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Building, Mail, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import clientService, { Client } from '../../services/clientService';
import projectService from '../../services/projectService';
import AddClientModal from './AddClientModal';

interface ClientWithStats extends Omit<Client, 'clientRating'> {
  activeProjects?: number;
  totalProjects?: number;
  clientRating?: number;
  contactPerson?: string;
}

const ClientsList: React.FC = () => {
  const [clients, setClients] = useState<ClientWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const [clientsData, projectsData] = await Promise.all([
        clientService.getAllClients(),
        projectService.getAllProjects()
      ]);
      const clientsWithStats = clientsData.map(client => {
        const clientProjects = projectsData.filter(project => project.clientId === client.id);
        const activeProjects = clientProjects.filter(project => project.status === 'ACTIVE').length;
        return {
          ...client,
          activeProjects,
          totalProjects: clientProjects.length,
          contactPerson: 'Contact Person'
        };
      });
      setClients(clientsWithStats);
    } catch (err) {
      setError('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client =>
    (client.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.industry || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Map 1-10 rating to 1-5 stars
  const getStarRating = (rating: number) => {
    if (rating <= 2) return 1;
    if (rating <= 4) return 2;
    if (rating <= 6) return 3;
    if (rating <= 8) return 4;
    return 5;
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= getStarRating(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating} / 10</span>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-1">Manage your client relationships and projects</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 animate-pulse">
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-1">Manage your client relationships and projects</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client relationships and projects</p>
        </div>
        {isAdmin && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            onClick={() => setIsClientModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </button>
        )}
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`${client.id}`)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.industry}</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Client Rating</p>
                  {renderStars(client.clientRating || 4)}
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{client.activeProjects || 0}</p>
                    <p className="text-xs text-gray-600">Active Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{client.totalProjects || 0}</p>
                    <p className="text-xs text-gray-600">Total Projects</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`font-medium ${client.isActive ? 'text-green-600' : 'text-red-600'}`}>{client.isActive ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Building className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
        </div>
      )}
      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onClientCreated={fetchClients}
      />
    </div>
  );
};

export default ClientsList; 