import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  $size?: string;
  $gradient?: string;
}

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

const DotsSpinner = styled.div<SpinnerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: calc(${({ $size }) => $size || '10px'} / 2);

  & > div {
    width: ${({ $size }) => $size || '10px'};
    height: ${({ $size }) => $size || '10px'};
    background: ${({ $gradient }) => 
      $gradient || 'linear-gradient(45deg, var(--color-red), var(--color-purple))'};
    border-radius: 50%;
    animation: ${bounce} 1.4s infinite ease-in-out both;
  }

  /* Staggered delay for each dot */
  & > div:nth-child(1) {
    animation-delay: -0.32s;
  }
  & > div:nth-child(2) {
    animation-delay: -0.16s;
  }
`;

const Spinner: React.FC<SpinnerProps> = ({ $size = '12px', $gradient }) => (
  <DotsSpinner $size={$size} $gradient={$gradient}>
    <div />
    <div />
    <div />
  </DotsSpinner>
);

export default Spinner;