import React from 'react';
import styled from 'styled-components';
import { useEventContext } from '../context/EventContext';
import Button from './Button';

interface PaginationProps {
  hasMore: boolean;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Pagination: React.FC<PaginationProps> = ({ hasMore }) => {
  const { fetchNextPage, loading } = useEventContext();

  const handleLoadMore = () => {
    fetchNextPage();
  };

  return (
    <PaginationWrapper>
      <Button onClick={handleLoadMore} disabled={loading || !hasMore}>
        {loading ? 'Loading...' : 'Load More'}
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;
