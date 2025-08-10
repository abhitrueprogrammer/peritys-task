'use client';

import React, { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { Button } from './ui/button';

const Pagination = () => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { page, setPage, totalPages } = context;

  return (
    <div className="flex justify-between items-center mt-4">
      <Button 
        onClick={() => setPage(page - 1)} 
        disabled={page === 1}
        variant="outline"
      >
        Previous
      </Button>
      <span>Page {page} of {totalPages}</span>
      <Button 
        onClick={() => setPage(page + 1)} 
        disabled={page === totalPages}
        variant="outline"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
