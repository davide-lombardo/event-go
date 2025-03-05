import React, { ReactNode, SelectHTMLAttributes } from 'react';
import styled from "styled-components";

// Define props interface for the styled component
interface SelectContainerProps {
  $fullWidth?: boolean;
}

const SelectContainer = styled.div<SelectContainerProps>`
  position: relative;
  display: inline-block;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid var(--color-gray-10);
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.6%205.4-7.9%205.4-12.9%200-5-1.9-9.2-5.5-12.7z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.65em;
  padding-right: 2.5rem;
  cursor: pointer;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }

  &:disabled {
    background-color: var(--color-gray-5);
    cursor: not-allowed;
  }
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  children,
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <SelectContainer $fullWidth={fullWidth} className={className}>
      <StyledSelect {...props}>
        {children}
      </StyledSelect>
    </SelectContainer>
  );
};

export default Select;