import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: (
    email: string,
    password: string,
    username: string,
    mode: 'signin' | 'signup'
  ) => void;
}

interface ModalOverlayProps {
  $isOpen: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
    color: black; /* Ensure the text color is black */
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-blue);
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: black; /* Ensure the text color is black */
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items to the center vertically */
  position: relative; /* Ensure the close button is positioned relative to the header */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: black;
  position: absolute;
  top: 0; /* Align to the top */
  right: 0; /* Align to the right */

  &:hover {
    color: var(--color-primary);
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: -8px;
`;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput()) {
      onAuth(email, password, username, mode);
    }
  };

  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorText>{error}</ErrorText>}
          <ButtonRow>
            <Button type="submit" variant="primary">
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>
          </ButtonRow>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'black' }}>
          {mode === 'signin' ? (
            <>
              <p>
                Don't have an account?{' '}
                <span
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => setMode('signup')}
                >
                  Sign Up
                </span>
              </p>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => setMode('signin')}
              >
                Sign In
              </span>
            </>
          )}
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;