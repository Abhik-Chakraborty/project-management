import api from './api';

export interface Issue {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assignedToId: number;
  reportedById: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  resolution: string;
}

export interface CreateIssueRequest {
  projectId: number;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  assignedToId: number;
  reportedById: number;
  dueDate: string;
  resolution?: string;
}

export interface UpdateIssueRequest extends Partial<CreateIssueRequest> {
  id: number;
}

class IssueService {
  async getAllIssues(): Promise<Issue[]> {
    const response = await api.get('/issues');
    return response.data;
  }

  async getIssueById(id: number): Promise<Issue> {
    const response = await api.get(`/issues/${id}`);
    return response.data;
  }

  async createIssue(issueData: CreateIssueRequest): Promise<Issue> {
    const response = await api.post('/issues', issueData);
    return response.data;
  }

  async updateIssue(issueData: UpdateIssueRequest): Promise<Issue> {
    const response = await api.put(`/issues/${issueData.id}`, issueData);
    return response.data;
  }

  async deleteIssue(id: number): Promise<void> {
    await api.delete(`/issues/${id}`);
  }

  async getIssuesByProject(projectId: number): Promise<Issue[]> {
    const response = await api.get(`/issues/project/${projectId}`);
    return response.data;
  }

  async getIssuesByStatus(status: string): Promise<Issue[]> {
    const response = await api.get(`/issues/status/${status}`);
    return response.data;
  }

  async getIssuesByPriority(priority: string): Promise<Issue[]> {
    const response = await api.get(`/issues/priority/${priority}`);
    return response.data;
  }

  async getIssuesByAssignee(assignedToId: number): Promise<Issue[]> {
    const response = await api.get(`/issues/assignee/${assignedToId}`);
    return response.data;
  }

  async getOpenIssues(): Promise<Issue[]> {
    const response = await api.get('/issues/open');
    return response.data;
  }
}

export default new IssueService(); 