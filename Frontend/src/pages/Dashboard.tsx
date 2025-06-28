import React from 'react';
import StatsCards from '../components/dashboard/StatsCards';
import ProjectChart from '../components/dashboard/ProjectChart';
import RecentProjects from '../components/dashboard/RecentProjects';
import IssuesOverview from '../components/dashboard/IssuesOverview';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectChart />
        <IssuesOverview />
      </div>

      <RecentProjects />
    </div>
  );
};

export default Dashboard;