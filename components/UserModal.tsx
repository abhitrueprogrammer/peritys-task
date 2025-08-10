'use client';

import React, { useState, useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { User } from '@/lib/users';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const context = useContext(UserContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || 'user');
  const [status, setStatus] = useState(user?.status || 'active');

  if (!context) {
    return null;
  }

  const { addUser, updateUser } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({ ...user, name, email, role: role as User['role'], status: status as User['status'] });
    } else {
      addUser({ name, email, role: role as User['role'], status: status as User['status'], avatarUrl: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}` });
    }
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block ">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-2 border rounded-md" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block ">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2 border rounded-md" 
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block ">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as User['role'])} className="w-full p-2 border rounded-md">
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block ">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as User['status'])} className="w-full p-2 border rounded-md">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{user ? 'Update' : 'Add'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
