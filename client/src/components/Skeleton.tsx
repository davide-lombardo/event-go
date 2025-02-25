import React from 'react';
import styled from 'styled-components';

const SkeletonCard = styled.div`
  width: 100%;
  height: 200px;
  max-width: 25rem;
  margin: var(--20px);
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-elevation-medium);
  background-color: var(--color-gray-2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--color-gray-3), transparent);
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

const SkeletonTitle = styled.div`
  height: 20px;
  width: 60%;
  background-color: var(--color-gray-3);
  margin: var(--20px);
  border-radius: 4px;
`;

const SkeletonDescription = styled.div`
  height: 60px;
  width: 90%;
  background-color: var(--color-gray-3);
  margin: var(--20px);
  border-radius: 4px;
`;

const SkeletonFooter = styled.div`
  height: 40px;
  width: 40%;
  background-color: var(--color-gray-3);
  margin: var(--20px);
  border-radius: 4px;
`;

const Skeleton: React.FC = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index}>
          <SkeletonTitle />
          <SkeletonDescription />
          <SkeletonFooter />
        </SkeletonCard>
      ))}
    </>
  );
};

export default Skeleton;
