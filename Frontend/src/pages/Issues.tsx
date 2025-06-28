import React, { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const issues = [
  {
    id: '1',
    projectId: '1',
    projectName: 'Trading Platform Enhancement',
    severity: 'HIGH',
    description: 'API response times are exceeding acceptable limits during peak trading hours',
    createdBy: 'John Doe',
    createdDate: '2024-01-20',
    status: 'OPEN',
    assignee: 'Jane Smith'
  },
  {
    id: '2',
    projectId: '1',
    projectName: 'Trading Platform Enhancement',
    severity: 'MEDIUM',
    description: 'UI alignment issues on mobile devices for the portfolio view',
    createdBy: 'Sarah Wilson',
    createdDate: '2024-01-22',
    status: 'IN_PROGRESS',
    assignee: 'Mike Johnson'
  },
  {
    id: '3',
    projectId: '2',
    projectName: 'Risk Management System',
    severity: 'URGENT',
    description: 'Critical security vulnerability discovered in authentication module',
    createdBy: 'Alex Brown',
    createdDate: '2024-01-25',
    status: 'OPEN',
    assignee: 'David Chen'
  },
  {
    id: '4',
    projectId: '3',
    projectName: 'Customer Portal Redesign',
    severity: 'LOW',
    description: 'Minor styling inconsistencies in the footer section',
    createdBy: 'Lisa Wang',
    createdDate: '2024-01-24',
    status: 'RESOLVED',
    assignee: 'Emily Davis'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'URGENT': return 'bg-red-100 text-red-800';
    case 'HIGH': return 'bg-orange-100 text-orange-800';
    case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
    case 'LOW': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'OPEN': return 'bg-red-100 text-red-800';
    case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
    case 'RESOLVED': return 'bg-green-100 text-green-800';
    case 'CLOSED': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'URGENT': return AlertCircle;
    case 'HIGH': return AlertTriangle;
    case 'MEDIUM': return Info;
    case 'LOW': return CheckCircle;
    default: return Info;
  }
};

const Issues: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const { isAdmin } = useAuth();

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || issue.severity === severityFilter;
    const matchesStatus = statusFilter === 'ALL' || issue.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const severityStats = {
    URGENT: issues.filter(i => i.severity === 'URGENT').length,
    HIGH: issues.filter(i => i.severity === 'HIGH').length,
    MEDIUM: issues.filter(i => i.severity === 'MEDIUM').length,
    LOW: issues.filter(i => i.severity === 'LOW').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Issues</h1>
          <p className="text-gray-600 mt-1">Track and manage project issues</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Report Issue
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">{severityStats.URGENT}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">High</p>
              <p className="text-2xl font-bold text-gray-900">{severityStats.HIGH}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Info className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Medium</p>
              <p className="text-2xl font-bold text-gray-900">{severityStats.MEDIUM}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Low</p>
              <p className="text-2xl font-bold text-gray-900">{severityStats.LOW}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Severity</option>
              <option value="URGENT">Urgent</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => {
          const SeverityIcon = getSeverityIcon(issue.severity);
          return (
            <div key={issue.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getSeverityColor(issue.severity).replace('text-', 'bg-').replace('800', '100')}`}>
                  <SeverityIcon className={`w-5 h-5 ${getSeverityColor(issue.severity).replace('bg-', 'text-').replace('100', '600')}`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{issue.description}</h3>
                      <p className="text-sm text-gray-600 mb-3">Project: {issue.projectName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(issue.status)}`}>
                        {issue.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Reported by</p>
                      <p className="text-sm font-medium text-gray-900">{issue.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned to</p>
                      <p className="text-sm font-medium text-gray-900">{issue.assignee}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Created on</p>
                      <p className="text-sm font-medium text-gray-900">{new Date(issue.createdDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <AlertCircle className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Issues;