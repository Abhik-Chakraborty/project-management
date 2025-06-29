import api from './api';

export interface Project {
  id: number;
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  clientId: number;
  projectLeadId: number;
  budget: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface CreateProjectRequest {
  projectName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  clientId: number;
  projectLeadId: number;
  budget: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {
  id: number;
}

class ProjectService {
  async getAllProjects(): Promise<Project[]> {
    const response = await api.get('/projects');
    return response.data;
  }

  async getProjectById(id: number): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  }

  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    const response = await api.post('/projects', projectData);
    return response.data;
  }

  async updateProject(projectData: UpdateProjectRequest): Promise<Project> {
    const response = await api.put(`/projects/${projectData.id}`, projectData);
    return response.data;
  }

  async deleteProject(id: number): Promise<void> {
    await api.delete(`/projects/${id}`);
  }

  async getProjectsByStatus(status: string): Promise<Project[]> {
    const response = await api.get(`/projects/status/${status}`);
    return response.data;
  }

  async getProjectsByClient(clientId: number): Promise<Project[]> {
    const response = await api.get(`/projects/client/${clientId}`);
    return response.data;
  }
}

export default new ProjectService(); 