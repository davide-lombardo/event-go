import React from 'react';
import styled from 'styled-components';
import Button from '../shared/Button';

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
  background: var(--card-background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  background: var(--color-white);
  padding: var(--20px);
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
          <Button variant="danger" onClick={onConfirm} label='Delete'>Delete</Button>
          <Button variant="outline" onClick={onCancel} label='No'>No</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmDelete;