import api from './api';

export interface Client {
  id: number;
  clientName: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  companySize: string;
  isActive: boolean;
}

export interface CreateClientRequest {
  clientName: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  companySize: string;
  isActive: boolean;
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {
  id: number;
}

class ClientService {
  async getAllClients(): Promise<Client[]> {
    const response = await api.get('/clients');
    return response.data;
  }

  async getClientById(id: number): Promise<Client> {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  }

  async createClient(clientData: CreateClientRequest): Promise<Client> {
    const response = await api.post('/clients', clientData);
    return response.data;
  }

  async updateClient(clientData: UpdateClientRequest): Promise<Client> {
    const response = await api.put(`/clients/${clientData.id}`, clientData);
    return response.data;
  }

  async deleteClient(id: number): Promise<void> {
    await api.delete(`/clients/${id}`);
  }

  async getActiveClients(): Promise<Client[]> {
    const response = await api.get('/clients/active');
    return response.data;
  }
}

export default new ClientService(); 