import React from 'react';
import styled from 'styled-components';

interface HeroProps {
  subtitle: string;
}

const BaseHeroContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 80vh;
  margin-top: -64px;
  padding-top: 64px;
  overflow: hidden;
`;

const BaseContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem var(--20px);
  position: relative;
  z-index: 2;

    @media (max-width: 768px) {
      padding: 6rem var(--20px) 0 var(--20px);

  }
`;

const SplitHeroWrapper = styled(BaseHeroContainer)`
  display: flex;
  align-items: center;
  min-height: 90vh;

  @media (max-width: 768px) {
    min-height: 0;
  }
`;

const SplitContent = styled(BaseContentContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const MainContent = styled.div`
  h1 {
    font-size: var(--50px);
    line-height: 3.5rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
    line-height: 1.1;

    span {
      font-weight: 700;
    }

    @media (max-width: 768px) {
      font-size: var(--40px);
    }
  }

  p {
    font-size: var(--16px);
    margin-top: var(--10px);
    color: var(--color-gray-7);
    margin-bottom: 2rem;
    @media (max-width: var(--breakpoint-medium)) {
      margin-bottom: 0;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100%;
  background: var(--gradient-primary);
  overflow: hidden;
  clip-path: polygon(
    20% 0%,
    0% 20%,
    30% 50%,
    0% 80%,
    20% 100%,
    50% 70%,
    80% 100%,
    100% 80%,
    70% 50%,
    100% 20%,
    80% 0%,
    50% 30%
  );

  @media (max-width: var(--breakpoint-medium)) {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
    background: url('https://images.unsplash.com/photo-1682447404920-4be1294c2854?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D')
      center/cover;
    opacity: 0.4;
  }
`;

// const ImageContainer = styled.div`
//   position: relative;
//   height: 100%;
//   background: var(--gradient-primary);
//   overflow: hidden;
//   clip-path: polygon(
//     20% 0%,
//     0% 20%,
//     30% 50%,
//     0% 80%,
//     20% 100%,
//     50% 70%,
//     80% 100%,
//     100% 80%,
//     70% 50%,
//     100% 20%,
//     80% 0%,
//     50% 30%
//   );

//   &::before {
//     content: '';
//     position: absolute;
//     width: 120%;
//     height: 120%;
//     top: -10%;
//     left: -10%;
//     background: url('https://images.unsplash.com/photo-1682447404920-4be1294c2854?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
//       center/cover;
//     opacity: 0.4;
//   }
// `;

const Hero: React.FC<HeroProps> = ({ subtitle }) => (
  <SplitHeroWrapper>
    <SplitContent>
      <MainContent>
        <h1>
          Hey there!
          <br />
          Welcome to <span>EventGo</span>
        </h1>
        <p>{subtitle}</p>
      </MainContent>
      <ImageContainer />
    </SplitContent>
  </SplitHeroWrapper>
);

export { Hero };
