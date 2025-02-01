import React from 'react';
import styled from 'styled-components';

interface ConfirmDeleteProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-elevation-medium);
  max-width: 400px;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;

  &:first-of-type {
    background: var(--color-primary);
    color: white;
  }

  &:last-of-type {
    background: var(--color-grey-5);
    color: black;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        <ButtonGroup>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onCancel}>No</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmDelete;