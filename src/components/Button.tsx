import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;     
  children: React.ReactNode;
  primary?: boolean;
  variant?: 'primary' | 'danger' | 'transparent';
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<ButtonProps>`
  padding: var(--12px) var(--25px);
  border: none;
  border-radius: var(--8px);
  font-size: var(--16px);
  background-color: ${({ variant }) => 
    variant === 'primary' ? 'var(--color-gray-7)' : 
    variant === 'danger' ? 'var(--color-primary)' : 
    'transparent'};
  color: ${({ variant }) => 
    variant === 'primary' ? 'var(--color-gray-1)' : 
    variant === 'danger' ? 'var(--color-gray-1)' : 
    'var(--color-gray-7)'};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ variant }) => 
      variant === 'primary' ? 'transparent' : 
      variant === 'danger' ? 'var(--color-grey-7)' : 
      'rgba(0, 0, 0, 0.05)'};
    color: ${({ variant }) => 
    variant === 'transparent' ? 'var(--color-primary)' : 
    'var(--color-gray-7)'};
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;

StyledButton.shouldForwardProp = (prop) => prop !== 'variant';


const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', type = 'button' }) => {
  return (
    <StyledButton onClick={onClick} variant={variant} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
