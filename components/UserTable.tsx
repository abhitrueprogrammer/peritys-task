'use client';

import React, { useContext, useState } from 'react';
import { UserContext } from '@/contexts/UserContext';
import PaginationComponent from './Pagination';
import UserModal from './UserModal';
import { User } from '@/lib/users';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

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
          <Input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded-md"
          />
          <Select value={role} onValueChange={(value) => setRole(value === 'all' ? '' : value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value) => setStatus(value === 'all' ? '' : value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleAddUser}>Add User</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')}>
              Name {sort === 'name' && (order === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead onClick={() => handleSort('email')}>
              Email {sort === 'email' && (order === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead onClick={() => handleSort('role')}>
              Role {sort === 'role' && (order === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead onClick={() => handleSort('status')}>
              Status {sort === 'status' && (order === 'asc' ? '▲' : '▼')}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="flex items-center">
                  <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full mr-4" />
                  {user.name}
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-800' : user.status === 'inactive' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEditUser(user)} variant="link">Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationComponent />
      {isModalOpen && <UserModal user={editingUser} onClose={handleCloseModal} />}
    </div>
  );
};

export default UserTable;
