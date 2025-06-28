import React from 'react';
import { FolderOpen, Users, UserCheck, AlertCircle, TrendingUp, Clock } from 'lucide-react';

const stats = [
  {
    name: 'Total Projects',
    value: '24',
    change: '+12%',
    changeType: 'positive',
    icon: FolderOpen,
    color: 'bg-blue-500'
  },
  {
    name: 'Active Clients',
    value: '8',
    change: '+2%',
    changeType: 'positive',
    icon: Users,
    color: 'bg-teal-500'
  },
  {
    name: 'Allocated Resources',
    value: '156',
    change: '+8%',
    changeType: 'positive',
    icon: UserCheck,
    color: 'bg-orange-500'
  },
  {
    name: 'Open Issues',
    value: '23',
    change: '-15%',
    changeType: 'negative',
    icon: AlertCircle,
    color: 'bg-red-500'
  },
  {
    name: 'Project Completion',
    value: '89%',
    change: '+5%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-green-500'
  },
  {
    name: 'Avg. Project Duration',
    value: '4.2mo',
    change: '-0.5mo',
    changeType: 'positive',
    icon: Clock,
    color: 'bg-purple-500'
  },
];

const StatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
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