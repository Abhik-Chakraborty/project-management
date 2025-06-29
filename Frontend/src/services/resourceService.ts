import api from './api';

export interface Resource {
  id: number;
  resourceName: string;
  email: string;
  phone: string;
  level: 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'LEAD' | 'ARCHITECT';
  skills: string;
  availability: boolean;
  hourlyRate: number;
  isActive: boolean;
}

export interface CreateResourceRequest {
  resourceName: string;
  email: string;
  phone: string;
  level: 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'LEAD' | 'ARCHITECT';
  skills: string;
  availability: boolean;
  hourlyRate: number;
  isActive: boolean;
}

export interface UpdateResourceRequest extends Partial<CreateResourceRequest> {
  id: number;
}

export interface ResourceRequired {
  id: number;
  projectId: number;
  level: 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'LEAD' | 'ARCHITECT';
  quantity: number;
  startDate: string;
  endDate: string;
  isAllocated: boolean;
}

class ResourceService {
  async getAllResources(): Promise<Resource[]> {
    const response = await api.get('/resources');
    return response.data;
  }

  async getResourceById(id: number): Promise<Resource> {
    const response = await api.get(`/resources/${id}`);
    return response.data;
  }

  async createResource(resourceData: CreateResourceRequest): Promise<Resource> {
    const response = await api.post('/resources', resourceData);
    return response.data;
  }

  async updateResource(resourceData: UpdateResourceRequest): Promise<Resource> {
    const response = await api.put(`/resources/${resourceData.id}`, resourceData);
    return response.data;
  }

  async deleteResource(id: number): Promise<void> {
    await api.delete(`/resources/${id}`);
  }

  async getAvailableResources(): Promise<Resource[]> {
    const response = await api.get('/resources/available');
    return response.data;
  }

  async getResourcesByLevel(level: string): Promise<Resource[]> {
    const response = await api.get(`/resources/level/${level}`);
    return response.data;
  }

  // Resource Required endpoints
  async getResourcesRequiredByProject(projectId: number): Promise<ResourceRequired[]> {
    const response = await api.get(`/resources-required/project/${projectId}`);
    return response.data;
  }

  async createResourceRequired(resourceRequiredData: Omit<ResourceRequired, 'id'>): Promise<ResourceRequired> {
    const response = await api.post('/resources-required', resourceRequiredData);
    return response.data;
  }

  async updateResourceRequired(id: number, resourceRequiredData: Partial<ResourceRequired>): Promise<ResourceRequired> {
    const response = await api.put(`/resources-required/${id}`, resourceRequiredData);
    return response.data;
  }

  async deleteResourceRequired(id: number): Promise<void> {
    await api.delete(`/resources-required/${id}`);
  }
}

export default new ResourceService(); 