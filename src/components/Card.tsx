import React from 'react';
import styled from 'styled-components';
import LinkIcon from './shared/LinkIcon';
import LinkIconImage from '/src/assets/external-link.svg';
import UserIconImage from '/src/assets/user.svg';
import MapPinIconImage from '/src/assets/map-pin.svg';

interface CardProps {
  title: string;
  link: string;
  description: string;
  tags: string[];
  paid: boolean;
  userImage: string;
  userName: string;
  eventDate: string;
  location: string;
}

const CardContainer = styled.div`
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  width: 100%;
  max-width: 25rem;
  margin: var(--20px);
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-elevation-medium);

  // Gradient Border using ::before pseudo-element
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--border-radius);
    padding: 3px;
    background: var(--gradient-primary);
    box-shadow: var(--shadow-elevation-medium);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }

  // Inner container to hold actual content, avoiding the gradient overlap
  > * {
    position: relative;
    border-radius: calc(
      var(--border-radius) - 5px
    ); // Match pseudo-element padding
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const TitleSection = styled.div`
  display: flex;
  align-items: baseline;
  padding: var(--20px);
  gap: var(--10px);
`;

const Title = styled.h2`
  font-size: var(--font-size-title);
  color: var(--color-heading);
  margin: 0;
  flex-grow: 1;
  overflow-wrap: break-word;
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: fit-content;
`;

const Link = styled.a`
  display: inline-flex;
  gap: 2px;
  font-size: var(--font-size-small);
  color: var(--color-grey-7);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Label = styled.span<{ $paid: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: var(--font-size-small);
  font-weight: bold;
  margin-top: var(--10px);
  padding-left: var(--20px);
  color: ${props => (props.$paid ? 'var(--color-pink)' : 'var(--color-green)')};
`;

const LabelDot = styled.span<{ $paid: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${props =>
    props.$paid ? 'var(--color-pink)' : 'var(--color-green)'};
`;

const TagsContainer = styled.div`
  margin-top: var(--10px);
  padding-left: var(--10px);
`;

const Tag = styled.span`
  background-color: transparent;
  color: var(--color-primary);
  font-size: var(--font-size-small);
  border: 1px solid var(--color-primary);
  padding: var(--5px) var(--10px);
  margin-right: var(--10px);
  border-radius: 100px;
`;

const Description = styled.p`
  padding: var(--20px);
  font-size: var(--font-size-text);
  line-height: 1.5;
`;

const Footer = styled.div`
  padding: var(--20px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const UserImage = styled.img`
  width: var(--40px);
  height: var(--40px);
  border-radius: 50%;
  object-fit: cover;
  margin-right: var(--15px);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserName = styled.span`
  font-weight: bold;
  color: var(--color-heading);
`;

const EventDate = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-primary);
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px; // Adjust spacing as needed
  margin-top: 4px;
`;

const Location = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-grey-7);
  margin-top: 4px;
`;

const LocationIconImg = styled.img`
  width: 14px; // Adjust size as needed
  height: 14px;
`;

const Card: React.FC<CardProps> = ({
  title,
  link,
  description,
  tags,
  paid,
  userImage,
  userName,
  eventDate,
  location,
}) => {
  return (
    <CardContainer>
      <TitleSection>
        <Title>{title}</Title>
        <LinkContainer>
          <Link href={link} target="_blank">
            view event
            <LinkIcon src={LinkIconImage} alt="link" />
          </Link>
        </LinkContainer>
      </TitleSection>
      <Label $paid={paid}>
        <LabelDot $paid={paid} />
        {paid ? 'Paid' : 'Free'}
      </Label>
      <TagsContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagsContainer>

      <Description>{description}</Description>

      <Footer>
        <UserImage
          src={userImage ? userImage : UserIconImage}
          onError={e => (e.currentTarget.src = UserIconImage)}
          alt="User Avatar"
        />
        <UserInfo>
          <UserName>{userName}</UserName>
          <EventDate>{new Date(eventDate).toLocaleDateString()}</EventDate>
          <LocationContainer>
            <LocationIconImg
              src={MapPinIconImage}
              alt="Location icon"
            />
            <Location>{location}</Location>
          </LocationContainer>
        </UserInfo>
      </Footer>
    </CardContainer>
  );
};

export default Card;
