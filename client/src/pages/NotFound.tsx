import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  color: var(--color-gray-7);
`;

const Title = styled.h1`
  font-size: 6rem;
  font-weight: bold;
  color: var(--color-primary);
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: var(--font-color-muted);
  margin-top: var(--spacing-small);
`;

const HomeButton = styled(Link)`
  margin-top: var(--spacing-large);
  padding: var(--spacing-medium) var(--spacing-large);
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-medium);
  border-radius: var(--border-radius);
  text-decoration: none;
  transition: background 0.3s;

  &:hover {
    background-color: var(--color-primary-dark);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Message>Oops! The page you are looking for doesn’t exist.</Message>
      <HomeButton to="/">Go Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;
