import React from 'react';
import styled from 'styled-components';
import { useEventContext } from '../context/EventContext';

interface PaginationProps {
  hasMore: boolean;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-large);
  background: var(--color-gray-2);
  padding: var(--spacing-medium) var(--spacing-large);
  border-radius: var(--border-radius);
  width: 100%;
  gap: 1rem;
`;


const PageInfo = styled.span`
  font-size: var(--font-size-small);
  font-weight: bold;
  margin: 0 var(--spacing-medium);
  color: var(--color-text);
`;

const IconButton = styled.button`
  background: ${({ disabled }) => (disabled ? 'var(--color-gray-4)' : 'var(--color-gray-8)')};
  color: var(--color-gray-1);
  padding: var(--spacing-small);
  min-width: 40px;
  border-radius: var(--border-radius-small);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-medium);
  font-weight: bold;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Pagination: React.FC<PaginationProps> = ({ hasMore }) => {
  const { loading, fetchEvents, pagination } = useEventContext();

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchEvents({} as any, pagination.page + 1, pagination.pageSize);
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchEvents({} as any, pagination.page - 1, pagination.pageSize);
    }
  };

  return (
    <PaginationWrapper>
      <IconButton
        onClick={handlePrevPage}
        disabled={loading || pagination.page <= 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </IconButton>
      <PageInfo>
        {pagination.page} of {pagination.totalPages}
      </PageInfo>
      <IconButton onClick={handleNextPage} disabled={loading || !hasMore}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </IconButton>
    </PaginationWrapper>
  );
};

export default Pagination;
