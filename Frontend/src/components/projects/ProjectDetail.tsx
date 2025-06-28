import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, DollarSign, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();

  // Mock project data - replace with API call
  const project = {
    id,
    projectName: 'Trading Platform Enhancement',
    client: 'Morgan Stanley',
    status: 'IN_PROGRESS',
    type: 'Web Application',
    department: 'Financial Services',
    description: 'A comprehensive enhancement of the existing trading platform to improve performance, add new features, and enhance user experience.',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    budget: '$2,500,000',
    progress: 75,
    manager: 'John Smith',
    projectLead: 'Sarah Wilson',
    teamSize: 12,
    resources: [
      { name: 'John Doe', role: 'Frontend Developer', allocation: 100 },
      { name: 'Jane Smith', role: 'Backend Developer', allocation: 80 },
      { name: 'Mike Johnson', role: 'UI/UX Designer', allocation: 60 }
    ],
    issues: [
      { id: 1, title: 'API Performance Issues', severity: 'HIGH', status: 'OPEN' },
      { id: 2, title: 'UI Alignment Problems', severity: 'MEDIUM', status: 'IN_PROGRESS' }
    ],
    milestones: [
      { name: 'Requirements Gathering', date: '2024-01-20', completed: true },
      { name: 'Design Phase', date: '2024-01-30', completed: true },
      { name: 'Development Phase', date: '2024-02-10', completed: false },
      { name: 'Testing Phase', date: '2024-02-15', completed: false }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link 
          to="/projects"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.projectName}</h1>
          <p className="text-gray-600">{project.client} • {project.department}</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Progress</p>
              <p className="text-2xl font-bold text-gray-900">{project.progress}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Budget</p>
              <p className="text-2xl font-bold text-gray-900">{project.budget}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Team Size</p>
              <p className="text-2xl font-bold text-gray-900">{project.teamSize}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Open Issues</p>
              <p className="text-2xl font-bold text-gray-900">{project.issues.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Start Date</label>
                  <p className="text-gray-600 mt-1">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">End Date</label>
                  <p className="text-gray-600 mt-1">{new Date(project.endDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Manager</label>
                  <p className="text-gray-600 mt-1">{project.manager}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Project Lead</label>
                  <p className="text-gray-600 mt-1">{project.projectLead}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Resources</h3>
            <div className="space-y-3">
              {project.resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{resource.name}</p>
                    <p className="text-sm text-gray-600">{resource.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{resource.allocation}%</p>
                    <p className="text-xs text-gray-600">Allocation</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Milestones</h3>
            <div className="space-y-3">
              {project.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${milestone.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                      {milestone.name}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(milestone.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Issues</h3>
            <div className="space-y-3">
              {project.issues.map((issue) => (
                <div key={issue.id} className="p-3 border border-gray-200 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{issue.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      issue.severity === 'HIGH' ? 'bg-red-100 text-red-800' :
                      issue.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.severity}
                    </span>
                    <span className="text-xs text-gray-600">{issue.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;