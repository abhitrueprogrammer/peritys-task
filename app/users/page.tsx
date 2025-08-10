'use client';

import React from 'react';
import UserTable from '@/components/UserTable';
import { UserProvider } from '@/contexts/UserContext';

const UsersPage = () => {
  return (
    <UserProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <UserTable />
      </div>
    </UserProvider>
  );
};

export default UsersPage;
