import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';

const data = [
  { name: 'High', value: 5, color: '#EF4444' },
  { name: 'Urgent', value: 3, color: '#DC2626' },
  { name: 'Medium', value: 8, color: '#F59E0B' },
  { name: 'Low', value: 7, color: '#10B981' },
];

const issueIcons = {
  High: AlertTriangle,
  Urgent: AlertCircle,
  Medium: Info,
  Low: CheckCircle,
};

const IssuesOverview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Issues by Severity</h3>
      
      <div className="flex items-center">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-1/2 space-y-3">
          {data.map((item) => {
            const Icon = issueIcons[item.name as keyof typeof issueIcons];
            return (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon 
                    className="w-4 h-4 mr-2" 
                    style={{ color: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-900 mr-2">{item.value}</span>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Total Issues</span>
          <span className="text-2xl font-bold text-gray-900">
            {data.reduce((sum, item) => sum + item.value, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IssuesOverview;