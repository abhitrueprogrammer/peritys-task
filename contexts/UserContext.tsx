'use client';

import React, { createContext, useState, useMemo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { users as initialUsers, User } from '@/lib/users';

interface UserContextType {
  users: User[];
  paginatedUsers: User[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  sort: string;
  order: 'asc' | 'desc';
  handleSort: (newSort: string) => void;
  search: string;
  setSearch: (search: string) => void;
  role: string;
  setRole: (role: string) => void;
  status: string;
  setStatus: (status: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [sort, setSort] = useState(searchParams.get('sort') || 'name');
  const [order, setOrder] = useState<'asc' | 'desc'>((searchParams.get('order') as 'asc' | 'desc') || 'asc');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [role, setRole] = useState(searchParams.get('role') || '');
  const [status, setStatus] = useState(searchParams.get('status') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (page) params.set('page', String(page));
    if (sort) params.set('sort', sort);
    if (order) params.set('order', order);
    if (search) params.set('search', search);
    if (role) params.set('role', role);
    if (status) params.set('status', status);
    router.replace(`${pathname}?${params.toString()}`);
  }, [page, sort, order, search, role, status, router, pathname]);

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => 
        (role ? user.role === role : true) &&
        (status ? user.status === status : true) &&
        (search ? user.name.toLowerCase().includes(search.toLowerCase()) : true)
      )
      .sort((a, b) => {
        const aValue = a[sort as keyof User];
        const bValue = b[sort as keyof User];
        if (aValue < bValue) return order === 'asc' ? -1 : 1;
        if (aValue > bValue) return order === 'asc' ? 1 : -1;
        return 0;
      });
  }, [users, role, status, search, sort, order]);

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * usersPerPage, page * usersPerPage);

  const handleSort = (newSort: string) => {
    if (sort === newSort) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSort(newSort);
      setOrder('asc');
    }
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: `u${users.length + 1}` };
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleSetSearch = (search: string) => {
    setSearch(search);
    setPage(1);
  };

  const handleSetRole = (role: string) => {
    setRole(role);
    setPage(1);
  };

  const handleSetStatus = (status: string) => {
    setStatus(status);
    setPage(1);
  };

  return (
    <UserContext.Provider value={{ 
      users: filteredUsers, 
      paginatedUsers, 
      page, 
      setPage, 
      totalPages, 
      sort, 
      order, 
      handleSort, 
      search, 
      setSearch: handleSetSearch, 
      role, 
      setRole: handleSetRole, 
      status, 
      setStatus: handleSetStatus,
      addUser,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};
