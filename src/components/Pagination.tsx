import React from 'react';
import styled from 'styled-components';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
`;

const Button = styled.button<{ disabled?: boolean }>`
  padding: 10px 15px;
  font-size: 1rem;
  border: none;
  background: ${({ disabled }) => (disabled ? '#ccc' : 'var(--color-primary)')};
  color: white;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 4px;

  &:hover {
    background: ${({ disabled }) =>
      disabled ? '#ccc' : 'var(--color-primary-dark)'};
  }
`;

const PageIndicator = styled.span`
  font-size: 1rem;
  color: #333;
`;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <PaginationWrapper>
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <PageIndicator>
        Page {currentPage} of {totalPages}
      </PageIndicator>
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;
