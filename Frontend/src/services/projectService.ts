import api from './api';

export interface Project {
  id: number;
  projectName: string;
  type: string;
  department: string;
  status: string;
  clientId: number;
  contactPersonId: number;
  managerId: number;
  projectLeadId: number;
  budgets: number;
  listOfHighlights: number[];
  listOfResources: number[];
  contractId: number;
}

export interface CreateProjectRequest {
  projectName: string;
  type: string;
  department: string;
  status: string;
  clientId: number;
  contactPersonId: number;
  managerId: number;
  projectLeadId: number;
  budgets: number;
  listOfHighlights: number[];
  listOfResources: number[];
  contractId: number;
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