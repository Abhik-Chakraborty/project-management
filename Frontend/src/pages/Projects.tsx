import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectList from '../components/projects/ProjectList';
import ProjectDetail from '../components/projects/ProjectDetail';

const Projects: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ProjectList />} />
      <Route path=":id" element={<ProjectDetail />} />
    </Routes>
  );
};

export default Projects;