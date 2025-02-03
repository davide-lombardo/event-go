import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import EyeIcon from '/src/assets/eye.svg';
import EyeOffIcon from '/src/assets/eye-off.svg';

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
    color: black;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;

  &:focus {
    border-color: var(--color-blue);
  }
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: black;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: black;
  position: absolute;
  top: 0;
  right: 0;

  &:hover {
    color: var(--color-primary);
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.875rem;
  margin-top: -8px;
`;

const TogglePasswordIcon = styled.span`
  position: absolute;
  right: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  color: black;
`;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuth }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
                onChange={e => setUserName(e.target.value)}
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
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Label htmlFor="password">Password</Label>
          <InputWrapper>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <TogglePasswordIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <img
                  src={EyeOffIcon}
                  alt="hide password icon"
                  width={14}
                  height={14}
                />
              ) : (
                <img
                  src={EyeIcon}
                  alt="show password icon"
                  width={14}
                  height={14}
                />
              )}
            </TogglePasswordIcon>
          </InputWrapper>
          {error && <ErrorText>{error}</ErrorText>}
          <ButtonRow>
            <Button type="submit" variant="primary">
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Button>
          </ButtonRow>
        </Form>
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'black' }}>
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <span
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => setMode('signup')}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => setMode('signin')}
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AuthModal;
