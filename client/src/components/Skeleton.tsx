import React from 'react';
import styled from 'styled-components';

const SkeletonCard = styled.div<{ $isListView: boolean }>`
  width: 100%;
  height: ${props => (props.$isListView ? '120px' : '200px')};
  max-width: ${props => (props.$isListView ? '100%' : '25rem')};
  margin: var(--20px);
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-elevation-medium);
  background-color: var(--color-gray-2);
  
  display: ${props => (props.$isListView ? 'flex' : 'block')};
  flex-direction: ${props => (props.$isListView ? 'column' : 'unset')};

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

const SkeletonDescription = styled.div<{ $isListView: boolean }>`
  height: ${props => (props.$isListView ? '20px' : '60px')};
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

const Skeleton: React.FC<{ isListView: boolean }> = ({ isListView }) => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} $isListView={isListView}>
          <SkeletonTitle />
          <SkeletonDescription $isListView={isListView}/>
          { !isListView && <SkeletonFooter></SkeletonFooter> }
        </SkeletonCard>
      ))}
    </>
  );
};

export default Skeleton;
