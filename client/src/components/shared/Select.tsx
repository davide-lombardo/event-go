import styled from "styled-components";

const Select = styled.select`
  padding: 0.95rem;
  font-size: 1rem;
  border: 1px solid var(--color-gray-10);
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
`;

export default Select;
