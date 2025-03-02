import React from 'react';
import styled from 'styled-components';
import { useEventContext } from '../context/EventContext';
import { ArrowLeftIcon, ArrowRightIcon } from '../utils/icons.utils';

interface PaginationProps {
  hasMore: boolean;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--color-gray-2);
  padding: var(--spacing-medium) var(--spacing-large);
  border-radius: var(--border-radius);
  width: max-content;
  gap: 1rem;
  margin: 0 auto;
`;

const PageInfo = styled.span`
  font-size: var(--font-size-small);
  font-weight: bold;
  margin: 0 var(--spacing-medium);
  color: var(--color-text);
`;

const IconButton = styled.button`
  background: ${({ disabled }) =>
    disabled ? 'var(--color-gray-4)' : 'var(--color-gray-8)'};
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

  &:focus {
    outline-offset: 0.3rem;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ hasMore }) => {
  const { loading, fetchEvents, pagination } = useEventContext();

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchEvents({} as any, pagination.page + 1, pagination.pageSize);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchEvents({} as any, pagination.page - 1, pagination.pageSize);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <PaginationWrapper>
      <IconButton
        onClick={handlePrevPage}
        disabled={loading || pagination.page <= 1}
      >
        <IconWrapper>{ArrowLeftIcon}</IconWrapper>
      </IconButton>
      <PageInfo>
        {pagination.page} of {pagination.totalPages}
      </PageInfo>
      <IconButton onClick={handleNextPage} disabled={loading || !hasMore}>
        <IconWrapper>{ArrowRightIcon}</IconWrapper>
      </IconButton>
    </PaginationWrapper>
  );
};

export default Pagination;
