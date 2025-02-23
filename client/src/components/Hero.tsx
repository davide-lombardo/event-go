import React from 'react';
import styled from 'styled-components';

const HeroWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6.25rem var(--20px);
  max-width: 1200px;
  margin: 0 auto;
  gap: var(--40px);

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    padding: 3rem var(--20px);
    text-align: center;
  }
`;

const ContentSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

const HeroTitle = styled.h1`
  font-size: var(--50px);
  font-weight: 400;
  margin: 0;
  line-height: 3.5rem;

  @media (max-width: 900px) {
    font-size: var(--40px);
    line-height: 3rem;
  }
`;

const LogoText = styled.span`
  font-weight: bold;
`;

const HeroSubtitle = styled.p`
  font-size: var(--16px);
  margin-top: var(--10px);
  color: var(--color-gray-7);
`;

type HeroProps = {
  subtitle: string;
  imageSrc?: string;
};

const Hero: React.FC<HeroProps> = ({ subtitle }) => {
  return (
    <HeroWrapper>
    <ContentSection>
      <HeroTitle>
        Hey there! Welcome to <LogoText>EventGo</LogoText>
      </HeroTitle>
      <HeroSubtitle>{subtitle}</HeroSubtitle>
    </ContentSection>
    
  </HeroWrapper>
  );
};

export default Hero;
