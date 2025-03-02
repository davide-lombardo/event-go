import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const AnimatedPinWrapper = styled.div`
  display: flex;  
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover .top-pin {
    animation: ${bounce} 0.8s ease-in-out infinite;
  }

  &:hover .pin-path, 
  &:hover .pin-circle {
    stroke: var(--color-gray-10);
  }
`;

const StyledSvg = styled.svg`
  overflow: visible;
  position: relative;
`;

interface AnimatedPinProps {
  size?: number;
  color?: string;
  onClick?: () => void;
}

const AnimatedPin: React.FC<AnimatedPinProps> = ({ 
  size = 16, 
  color = 'currentColor',
  onClick 
}) => {
  return (
    <AnimatedPinWrapper onClick={onClick}>
      <StyledSvg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Top */}
        <g className="top-pin">
          <path 
            d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" 
            className="pin-path"
          />
          <circle 
            cx="12" 
            cy="8" 
            r="2" 
            className="pin-circle"
          />
        </g>
        
        {/* Base */}
        <path 
          d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712" 
          className="pin-path"
        />
      </StyledSvg>
    </AnimatedPinWrapper>
  );
};

export default AnimatedPin;