import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clientService, { Client } from '../../services/clientService';
import { ArrowLeft, Star } from 'lucide-react';

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        setError(null);
        if (id) {
          const data = await clientService.getClientById(Number(id));
          setClient(data);
        }
      } catch (err) {
        setError('Failed to load client details');
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  // Map 1-10 rating to 1-5 stars
  const getStarRating = (rating: number) => {
    if (rating <= 2) return 1;
    if (rating <= 4) return 2;
    if (rating <= 6) return 3;
    if (rating <= 8) return 4;
    return 5;
  };

  if (loading) {
    return <div className="p-6">Loading client details...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }
  if (!client) {
    return <div className="p-6">Client not found.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <button className="mb-4 flex items-center text-blue-600 hover:underline" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clients
      </button>
      <h2 className="text-2xl font-bold mb-2">{client.name}</h2>
      <p className="text-gray-600 mb-2">Industry: {client.industry}</p>
      <p className="text-gray-600 mb-2">Email: {client.email}</p>
      <p className="text-gray-600 mb-2">Status: <span className={client.isActive ? 'text-green-600' : 'text-red-600'}>{client.isActive ? 'Active' : 'Inactive'}</span></p>
      <p className="text-gray-600 mb-2 font-semibold">Boarded On: <span className="font-normal">{client.onBoardedOn ? new Date(client.onBoardedOn).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span></p>
      <div className="flex items-center mb-2">
        <span className="text-gray-600 font-semibold mr-2">Rating:</span>
        {[1,2,3,4,5].map(star => (
          <Star key={star} className={`w-5 h-5 ${star <= getStarRating(client.clientRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
        <span className="ml-2 text-sm text-gray-600">{client.clientRating} / 10</span>
      </div>
      {/* Add more client details and associated projects here as needed */}
    </div>
  );
};

export default ClientDetail; 