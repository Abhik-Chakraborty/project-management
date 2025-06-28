import React, { useState } from 'react';
import { Plus, Search, Filter, UserCheck, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const resources = [
  {
    id: '1',
    resourceName: 'John Doe',
    projectName: 'Trading Platform Enhancement',
    resourceLevel: 'SENIOR',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    allocationPercentage: 100,
    exp: 5,
    isAllocated: true,
    skills: ['React', 'Node.js', 'TypeScript']
  },
  {
    id: '2',
    resourceName: 'Jane Smith',
    projectName: 'Risk Management System',
    resourceLevel: 'INTERMEDIATE',
    startDate: '2024-02-01',
    endDate: '2024-03-20',
    allocationPercentage: 80,
    exp: 3,
    isAllocated: true,
    skills: ['Java', 'Spring Boot', 'PostgreSQL']
  },
  {
    id: '3',
    resourceName: 'Mike Johnson',
    projectName: 'Customer Portal Redesign',
    resourceLevel: 'JUNIOR',
    startDate: '2024-03-01',
    endDate: '2024-04-10',
    allocationPercentage: 60,
    exp: 2,
    isAllocated: true,
    skills: ['UI/UX', 'Figma', 'CSS']
  },
  {
    id: '4',
    resourceName: 'Sarah Wilson',
    projectName: null,
    resourceLevel: 'SENIOR',
    startDate: null,
    endDate: null,
    allocationPercentage: 0,
    exp: 7,
    isAllocated: false,
    skills: ['Python', 'Machine Learning', 'AWS']
  }
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'SENIOR': return 'bg-green-100 text-green-800';
    case 'INTERMEDIATE': return 'bg-blue-100 text-blue-800';
    case 'JUNIOR': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [allocationFilter, setAllocationFilter] = useState('ALL');
  const { isAdmin } = useAuth();

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = levelFilter === 'ALL' || resource.resourceLevel === levelFilter;
    const matchesAllocation = allocationFilter === 'ALL' || 
                             (allocationFilter === 'ALLOCATED' && resource.isAllocated) ||
                             (allocationFilter === 'AVAILABLE' && !resource.isAllocated);
    return matchesSearch && matchesLevel && matchesAllocation;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600 mt-1">Manage team resources and allocations</p>
        </div>
        {isAdmin && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900">{resources.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Allocated</p>
              <p className="text-2xl font-bold text-gray-900">
                {resources.filter(r => r.isAllocated).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-2xl font-bold text-gray-900">
                {resources.filter(r => !r.isAllocated).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Avg. Utilization</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(resources.reduce((sum, r) => sum + r.allocationPercentage, 0) / resources.length)}%
              </p>
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
              placeholder="Search resources or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Levels</option>
              <option value="JUNIOR">Junior</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="SENIOR">Senior</option>
            </select>
            <select
              value={allocationFilter}
              onChange={(e) => setAllocationFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="ALLOCATED">Allocated</option>
              <option value="AVAILABLE">Available</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allocation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {resource.resourceName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{resource.resourceName}</div>
                        <div className="text-sm text-gray-500">{resource.exp} years experience</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {resource.projectName || (
                        <span className="text-gray-400 italic">Not assigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(resource.resourceLevel)}`}>
                      {resource.resourceLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${resource.allocationPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{resource.allocationPercentage}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {resource.startDate && resource.endDate ? (
                        <>
                          {new Date(resource.startDate).toLocaleDateString()} - {new Date(resource.endDate).toLocaleDateString()}
                        </>
                      ) : (
                        <span className="text-gray-400 italic">No assignment</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {resource.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {resource.skills.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                          +{resource.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <UserCheck className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Resources;