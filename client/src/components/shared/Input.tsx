import styled from "styled-components";

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid var(--color-gray-10);
  border-radius: var(--border-radius-sm);
  outline: none;
  transition: border-color 0.2s;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
`;

export default Input;