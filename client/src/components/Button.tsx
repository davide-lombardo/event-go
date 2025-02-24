import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  primary?: boolean;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  tooltip?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: var(--12px) var(--25px);
  border: none;
  border-radius: var(--8px);
  font-size: var(--16px);
  background-color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return 'var(--color-primary)';
      case 'secondary':
        return 'var(--color-secondary)';
      case 'danger':
        return 'var(--color-danger)';
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'link':
        return 'transparent';
      case 'outline':
        return 'transparent';
      default:
        return 'var(--color-primary)';
    }
  }};

color: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return 'var(--color-white)';
      case 'secondary':
        return 'var(--color-gray-7)';
      case 'danger':
        return 'var(--color-white)';
      case 'success':
        return 'var(--color-white)';
      case 'warning':
        return 'var(--color-white)';
      case 'link':
        return 'var(--color-blue)';
      case 'outline':
        return 'var(--color-gray-7)';
      default:
        return 'var(--color-white)';
    }
  }};

  border: ${({ variant }) => {
    switch (variant) {
      case 'outline':
        return '1px solid var(--color-gray-4)';
      default:
        return 'none';
    }
  }};
  
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'primary'
        ? 'transparent'
        : variant === 'danger'
        ? 'var(--color-grey-7)'
        : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ variant }) =>
      variant === 'transparent'
        ? 'var(--color-primary)'
        : 'var(--color-gray-7)'};
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: ${({ disabled }) => (disabled ? 'none' : 'scale(0.98)')};
  }

  &:disabled {
    background-color: var(--color-gray-4);
    color: var(--color-gray-6);
  }
    
`;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: var(--color-gray-7);
  color: var(--color-gray-1);
  text-align: center;
  border-radius: var(--8px);
  padding: var(--8px);
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position above the button */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  width: max-content;

  &::after {
    content: '';
    position: absolute;
    top: 100%; /* Arrow pointing down */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: var(--color-gray-7) transparent transparent transparent;
  }
`;

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

StyledButton.shouldForwardProp = prop => prop !== 'variant';

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  tooltip
}) => {
  return (
    
    <TooltipWrapper>
      <StyledButton
        onClick={onClick}
        variant={variant}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </StyledButton>
      {disabled && tooltip && <Tooltip>{tooltip}</Tooltip>}
    </TooltipWrapper>
  );
};

export default Button;
