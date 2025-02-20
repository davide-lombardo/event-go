import { useState } from 'react';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const StyledSVG = styled.svg<{ $isAnimating: boolean }>`
  .path {
    animation: ${props => props.$isAnimating ? 'draw 3.5s infinite' : 'none'};
  }

  @keyframes draw {
    0% {
      stroke-dashoffset: ${props => props.pathLength};
    }
    50% {
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dashoffset: ${props => props.pathLength};
    }
  }
`;

export default function EventGoLogo() {
  const [isAnimating, setAnimating] = useState(false);

  const handleClick = () => {
    setAnimating(!isAnimating);
  };

  return (
    <LogoContainer onClick={handleClick}>
      <StyledSVG
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 670 236"
        $isAnimating={isAnimating}
        pathLength="300"
      >
        <defs>
          <linearGradient id="logoGradient" gradientTransform="rotate(45)">
            <stop offset="0%" stopColor="hsl(347deg 99% 63%)" />
            <stop offset="6%" stopColor="hsl(339deg 95% 62%)" />
            <stop offset="13%" stopColor="hsl(332deg 91% 61%)" />
            <stop offset="20%" stopColor="hsl(324deg 87% 60%)" />
            <stop offset="28%" stopColor="hsl(317deg 84% 60%)" />
            <stop offset="37%" stopColor="hsl(309deg 80% 59%)" />
            <stop offset="45%" stopColor="hsl(302deg 77% 58%)" />
            <stop offset="54%" stopColor="hsl(294deg 74% 57%)" />
            <stop offset="63%" stopColor="hsl(287deg 71% 56%)" />
            <stop offset="73%" stopColor="hsl(280deg 68% 55%)" />
            <stop offset="82%" stopColor="hsl(272deg 65% 54%)" />
            <stop offset="91%" stopColor="hsl(265deg 62% 53%)" />
            <stop offset="100%" stopColor="hsl(257deg 60% 53%)" />
          </linearGradient>
        </defs>
        <path
          className="path"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeDasharray="300"
          strokeDashoffset="300"
          fill="none"
          d="M343.6 75.9v20.3l23.1 21.8-23.1 21.8v20.3l44.6-42.1zM326.4 139.8l-23.1-21.8 23.1-21.8v-20.3l-44.6 42.1 44.6 42.1z"
        />
        <path
          className="path"
          stroke="url(#logoGradient)"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeDasharray="500"
          strokeDashoffset="500"
          fill="none"
          d="M335 38.9c-43.7 0-79.1 35.4-79.1 79.1s35.4 79.1 79.1 79.1 79.1-35.4 79.1-79.1-35.4-79.1-79.1-79.1zM335 182.9c-35.8 0-64.9-29.1-64.9-64.9s29.1-64.9 64.9-64.9 64.9 29.1 64.9 64.9-29.1 64.9-64.9 64.9z"
        />
      </StyledSVG>
    </LogoContainer>
  );
}