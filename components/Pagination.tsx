'use client';
import React, { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';
import {
  Pagination,
  
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const PaginationComponent = () => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { page, setPage, totalPages } = context;

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious size="default" onClick={handlePrevious} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink size="default">{page} of {totalPages}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationNext size="default" onClick={handleNext} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
  );
};

export default PaginationComponent;
