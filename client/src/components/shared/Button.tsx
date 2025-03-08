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
  loading?: boolean;
  label?: string;
  icon?: React.ReactNode | string;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  padding: var(--10px) var(--25px);
  border: none;
  border-radius: var(--8px);
  font-size: var(--16px);
  transition: background-color 0.3s ease;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  background-color: ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
      case 'warning':
        return `var(--color-${variant})`;
      case 'secondary':
        return 'var(--color-gray-8)';
      case 'link':
      case 'outline':
        return 'transparent';
      default:
        return 'var(--color-primary)';
    }
  }};

  color: ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
      case 'danger':
      case 'success':
      case 'warning':
        return 'var(--color-white)';
      case 'secondary':
        return 'var(--color-gray-1)';
      case 'link':
      case 'outline':
        return 'var(--color-gray-8)';
      default:
        return 'var(--color-white)';
    }
  }};

  border: ${({ variant = 'primary' }) =>
    variant === 'outline' ? '1px solid var(--color-gray-5)' : 'none'};

  &:hover {
    background-color: ${({ variant = 'primary' }) =>
      ['primary', 'danger'].includes(variant)
        ? 'var(--color-gray-8)'
        : 'rgba(0, 0, 0, 0.05)'};
    color: ${({ variant = 'primary' }) =>
      ['primary', 'danger'].includes(variant)
        ? 'var(--color-white)'
        : 'var(--color-gray-8)'};

    img {
      filter: brightness(0);
    }
  }

  &:focus {
    outline-offset: 0.3rem;
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
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  width: max-content;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
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

StyledButton.shouldForwardProp = prop =>
  prop !== 'variant' && prop !== 'loading' && prop !== 'icon';

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  tooltip,
  loading = false,
  label,
  icon, 
}) => {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: icon }}
          style={{ marginRight: '8px' }}
        />
      );
    }
    return React.cloneElement(icon as React.ReactElement, {
      style: { marginRight: '8px' },
    });
  };

  return (
    <TooltipWrapper>
      <StyledButton
        onClick={onClick}
        variant={variant}
        type={type}
        disabled={disabled || (type === 'submit' && loading)}
        aria-disabled={disabled || (type === 'submit' && loading)}
        aria-label={label}
      >
        {icon && renderIcon()}
        {children}
      </StyledButton>
      {disabled && tooltip && <Tooltip>{tooltip}</Tooltip>}
    </TooltipWrapper>
  );
};

export default Button;
