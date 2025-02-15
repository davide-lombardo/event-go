import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  primary?: boolean;
  variant?: 'primary' | 'danger' | 'transparent';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  tooltip?: string;
}

const StyledButton = styled.button<ButtonProps>`
  padding: var(--12px) var(--25px);
  border: none;
  border-radius: var(--8px);
  font-size: var(--16px);
  background-color: ${({ variant, disabled }) =>
    disabled
      ? 'inherit'
      : variant === 'primary'
      ? 'var(--color-gray-7)'
      : variant === 'danger'
      ? 'var(--color-primary)'
      : 'transparent'};
  color: ${({ variant, disabled }) =>
    disabled
      ? 'inherit'
      : variant === 'primary'
      ? 'var(--color-gray-1)'
      : variant === 'danger'
      ? 'var(--color-gray-1)'
      : 'var(--color-gray-7)'};
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
