'use client';

import React, { useContext, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import Pagination from './Pagination';
import UserModal from './UserModal';
import { User } from '@/lib/users';
import { Button } from './ui/button';


const UserTable = () => {
  const context = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { 
    paginatedUsers, 
    sort, 
    order, 
    handleSort, 
    search, 
    setSearch, 
    role, 
    setRole, 
    status, 
    setStatus 
  } = context;

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="p-4  rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-md"
          />
          <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border rounded-md">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="user">User</option>
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border rounded-md">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-80">
          <tr>
            <th onClick={() => handleSort('name')} className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name {sort === 'name' && (order === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('email')} className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email {sort === 'email' && (order === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('role')} className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role {sort === 'role' && (order === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('status')} className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status {sort === 'status' && (order === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="   divide-y divide-gray-200">
          {paginatedUsers.map(user => (
            <tr key={user.id}>
              <td className="p-3 whitespace-nowrap">
                <div className="flex items-center">
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
                  {user.name}
                </div>
              </td>
              <td className="p-3 whitespace-nowrap">{user.email}</td>
              <td className="p-3 whitespace-nowrap">{user.role}</td>
              <td className="p-3 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {user.status}
                </span>
              </td>
              <td className="p-3 whitespace-nowrap">
                <Button onClick={() => handleEditUser(user)} variant="link">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
      {isModalOpen && <UserModal user={editingUser} onClose={handleCloseModal} />}
    </div>
  );
};

export default UserTable;
