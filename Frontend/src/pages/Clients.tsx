import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientsList from '../components/clients/ClientsList';
import ClientDetail from '../components/clients/ClientDetail';

const Clients: React.FC = () => {
  return (
    <Routes>
      <Route index element={<ClientsList />} />
      <Route path=":id" element={<ClientDetail />} />
    </Routes>
  );
};

export default Clients;