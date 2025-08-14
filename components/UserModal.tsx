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
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from './ui/use-toast';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  const { toast } = useToast();
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
      toast({ title: "User updated successfully" });
    } else {
      addUser({ name, email, role: role as User['role'], status: status as User['status'], avatarUrl: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}` });
      toast({ title: "User added successfully" });
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
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name"
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-4">
            <Label>Role</Label>
            <Select value={role} onValueChange={(value) => setRole(value as User['role'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4">
            <Label>Status</Label>
            <Select value={status} onValueChange={(value) => setStatus(value as User['status'])}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
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
