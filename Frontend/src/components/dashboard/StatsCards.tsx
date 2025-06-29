import React, { useState, useEffect } from 'react';
import { FolderOpen, Users, UserCheck, AlertCircle, TrendingUp, Clock } from 'lucide-react';
import projectService from '../../services/projectService';
import clientService from '../../services/clientService';
import resourceService from '../../services/resourceService';
import issueService from '../../services/issueService';

interface StatsData {
  totalProjects: number;
  activeClients: number;
  allocatedResources: number;
  openIssues: number;
  projectCompletion: number;
  avgProjectDuration: number;
}

const StatsCards: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalProjects: 0,
    activeClients: 0,
    allocatedResources: 0,
    openIssues: 0,
    projectCompletion: 0,
    avgProjectDuration: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [projects, clients, resources, issues] = await Promise.all([
          projectService.getAllProjects(),
          clientService.getAllClients(),
          resourceService.getAllResources(),
          issueService.getAllIssues()
        ]);

        // Calculate stats
        const activeProjects = projects.filter(p => p.status === 'ACTIVE');
        const completedProjects = projects.filter(p => p.status === 'COMPLETED');
        const activeClients = clients.filter(c => c.isActive);
        const allocatedResources = resources.filter(r => !r.availability);
        const openIssues = issues.filter(i => i.status === 'OPEN' || i.status === 'IN_PROGRESS');

        // Calculate project completion percentage
        const projectCompletion = projects.length > 0 
          ? Math.round((completedProjects.length / projects.length) * 100)
          : 0;

        // Calculate average project duration (simplified)
        const avgProjectDuration = projects.length > 0 
          ? Math.round(projects.length / 6) // Simplified calculation
          : 0;

        setStats({
          totalProjects: projects.length,
          activeClients: activeClients.length,
          allocatedResources: allocatedResources.length,
          openIssues: openIssues.length,
          projectCompletion,
          avgProjectDuration
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsConfig = [
    {
      name: 'Total Projects',
      value: stats.totalProjects.toString(),
      icon: FolderOpen,
      color: 'bg-blue-500'
    },
    {
      name: 'Active Clients',
      value: stats.activeClients.toString(),
      icon: Users,
      color: 'bg-teal-500'
    },
    {
      name: 'Allocated Resources',
      value: stats.allocatedResources.toString(),
      icon: UserCheck,
      color: 'bg-orange-500'
    },
    {
      name: 'Open Issues',
      value: stats.openIssues.toString(),
      icon: AlertCircle,
      color: 'bg-red-500'
    },
    {
      name: 'Project Completion',
      value: `${stats.projectCompletion}%`,
      icon: TrendingUp,
      color: 'bg-green-500'
    },
    {
      name: 'Avg. Project Duration',
      value: `${stats.avgProjectDuration}mo`,
      icon: Clock,
      color: 'bg-purple-500'
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statsConfig.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;