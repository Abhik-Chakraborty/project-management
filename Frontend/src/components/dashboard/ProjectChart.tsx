import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', completed: 4, ongoing: 8, planned: 2 },
  { month: 'Feb', completed: 6, ongoing: 6, planned: 3 },
  { month: 'Mar', completed: 3, ongoing: 9, planned: 4 },
  { month: 'Apr', completed: 8, ongoing: 7, planned: 2 },
  { month: 'May', completed: 5, ongoing: 8, planned: 5 },
  { month: 'Jun', completed: 7, ongoing: 6, planned: 3 },
];

const ProjectChart: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Project Status Overview</h3>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Completed</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Ongoing</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Planned</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ongoing" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="planned" fill="#F97316" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProjectChart;