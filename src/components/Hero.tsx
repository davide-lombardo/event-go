import React from 'react';
import styled from 'styled-components';

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 6.25rem var(--20px);
`;

const HeroTitle = styled.h1`
  font-size: var(--50px);
  font-weight: bold;
  margin: 0;

  background-image: var(--gradient-primary);

  background-size: 100%;
  background-repeat: repeat;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: var(--25px);
  margin-top: var(--10px);
  color: var(--color-gray-7);
`;

type HeroProps = {
  title: string;
  subtitle: string;
};

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <HeroWrapper>
      <HeroTitle>{title}</HeroTitle>
      <HeroSubtitle>{subtitle}</HeroSubtitle>
    </HeroWrapper>
  );
};

export default Hero;
