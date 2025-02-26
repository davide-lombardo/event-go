import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import UserIconImage from '/src/assets/user.svg';
import MapPinIconImage from '/src/assets/map-pin.svg';
import { useUserContext } from '../context/UserContext';
import { EventCategory, EventData } from '../types/event.model';
import EventModal from './dialogs/AddEvent';
import { useEventContext } from '../context/EventContext';
import ConfirmDelete from './dialogs/ConfirmDelete';
import { formatDateCustom } from '../utils/date.utils';
import { categoryColors, categoryIcons } from '../utils/category.utils';

interface CardProps {
  title: string;
  eventId: string;
  link: string;
  description: string;
  paid: boolean;
  userImage: string;
  userName: string;
  eventDate: string;
  location: string;
  category: string;
  latitude: number;
  longitude: number;
  isListView?: boolean;
}

const useEllipsisTooltip = (ref: React.RefObject<HTMLParagraphElement>) => {
  const [isEllipsed, setIsEllipsed] = useState(false);

  useEffect(() => {
    if (ref.current) {
      setIsEllipsed(ref.current.scrollHeight > ref.current.clientHeight);
    }
  }, [ref]);

  return isEllipsed;
};

const CardContainer = styled.div<{ $isListView: boolean }>`
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  width: ${props => (props.$isListView ? 'auto' : '25rem')};
  margin: var(--20px);
  transition: transform 0.3s ease;
  box-shadow: var(--shadow-elevation-medium);
  display: ${props => (props.$isListView ? 'flex' : 'block')};
  flex-direction: ${props => (props.$isListView ? 'row' : 'column')};
  align-items: ${props => (props.$isListView ? 'center' : 'flex-start')};
  justify-content: ${props => (props.$isListView ? 'space-between' : 'unset')};

  @media (max-width: 500px) {
    width: auto;
    min-width: 20rem;
    max-width: 25rem;
  }

  // Gradient Border
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

  // Inner container to hold actual content
  > * {
    position: relative;
    border-radius: calc(var(--border-radius) - 5px);
    display: ${props => (props.$isListView ? 'flex' : 'block')};
    flex-direction: ${props => (props.$isListView ? 'column' : 'row')};
    align-items: ${props => (props.$isListView ? 'flex-start' : 'center')};
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const TitleSection = styled.div<{ $isListView: boolean }>`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: var(--20px);
  padding-bottom: 0;
  gap: var(--10px);
  padding-bottom: ${props => (props.$isListView ? 'var(--20px)' : '0')};
  width: ${props => (props.$isListView ? '50%' : '100%')};
`;

const Title = styled.span`
  font-size: var(--font-size-medium);
  color: var(--color-heading);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  margin: 0;
  max-width: 18rem;

  @media (max-width: 500px) {
    max-width: 10rem;
  }
`;

const Label = styled.span<{ $paid: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: var(--font-size-small);
  font-weight: bold;
  color: ${props =>
    props.$paid ? 'var(--color-pink)' : 'var(--color-green-light)'};
`;

const LabelDot = styled.span<{ $paid: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 5px;
  background-color: ${props =>
    props.$paid ? 'var(--color-pink)' : 'var(--color-green-light)'};
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  padding: var(--10px) var(--20px);
`;

const CategoryTag = styled.span<{ $category: EventCategory }>`
  color: ${props => categoryColors[props.$category] || 'transparent'};
  border: ${props => `1px solid ${categoryColors[props.$category]}`};
  background-color: transparent;
  font-size: var(--font-size-small);
  padding: var(--5px) var(--10px);
  border-radius: 100px;
  display: flex;
  align-items: center;
`;

const CategoryIcon = styled.img`
  height: 1em;
  width: auto;
  margin-right: var(--5px);
`;

const Description = styled.p<{ $isListView: boolean }>`
  padding: var(--20px);
  font-size: var(--font-size-small);
  line-height: 1.5;
  max-height: ${props => (props.$isListView ? 'auto' : '4.5em')};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${props => (props.$isListView ? 'none' : '3')};
  -webkit-box-orient: vertical;
`;

const Footer = styled.div`
  padding: var(--20px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`;

const UserImage = styled.img`
  width: var(--30px);
  height: var(--30px);
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserName = styled.span`
  font-size: 0.7rem;
  color: var(--font-color-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const EventDate = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-primary);
`;

const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Location = styled.span`
  font-size: var(--font-size-small);
  color: var(--color-grey-7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

const AdminActions = styled.div<{ $isListView: boolean }>`
  display: flex;
  flex-direction: ${props => (props.$isListView ? 'row' : 'unset')};
  justify-content: flex-end;
  gap: 10px;
  padding: var(--10px) var(--20px);
`;

const ActionButton = styled.button`
  background-color: var(--color-gray-8);
  color: var(--color-gray-1);
  border: none;
  padding: var(--5px) var(--10px);
  border-radius: var(--border-radius);
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary);
  }

  &:focus {
    outline-offset: 0.3rem;
  }
`;

const Card: React.FC<CardProps> = React.memo(
  ({
    title,
    eventId,
    link,
    description,
    paid,
    userImage,
    userName,
    eventDate,
    location,
    latitude,
    longitude,
    category,
    isListView = false,
  }) => {
    const { deleteEvent } = useEventContext();
    const { user, role } = useUserContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalEventData, setModalEventData] = useState<EventData | null>(
      null
    );
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    const titleRef = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const locationRef = useRef<HTMLSpanElement>(null);

    const isEllipsed = useEllipsisTooltip(descriptionRef);

    const isEventCreator = user?.username === userName;

    const handleEdit = () => {
      setModalEventData({
        id: eventId,
        name: title,
        location,
        latitude,
        longitude,
        description,
        link,
        paid,
        userImage,
        userName,
        eventDate,
        category,
      });
      setIsModalOpen(true);
    };

    const handleDelete = async () => {
      setIsDeleteConfirmOpen(true);
    };

    const confirmDelete = async () => {
      try {
        await deleteEvent(eventId);
        setIsDeleteConfirmOpen(false);
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    };

    const closeDeleteModal = () => {
      setIsDeleteConfirmOpen(false);
    };

    const closeModal = () => {
      setIsModalOpen(false);
      setModalEventData(null);
    };

    const saveEvent = async (updatedEventData: EventData) => {
      if (updatedEventData && updatedEventData.id) {
        try {
          closeModal();
        } catch (error) {
          console.error('Error updating event:', error);
        }
      }
    };

    return (
      <>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CardContainer $isListView={isListView}>
            <TitleSection $isListView={isListView}>
              <Title ref={titleRef} title={title}>
                {title}
              </Title>
              <Label $paid={paid}>
                <LabelDot $paid={paid} />
                {paid ? 'Paid' : 'Free'}
              </Label>
            </TitleSection>
            <LabelContainer>
              <CategoryTag $category={category as EventCategory}>
                <CategoryIcon
                  src={categoryIcons[category as EventCategory]}
                  alt=""
                />
                {category}
              </CategoryTag>
            </LabelContainer>
            {!isListView && description && (
              <Description
                ref={descriptionRef}
                title={isEllipsed ? description : ''}
                $isListView={isListView}
              >
                {description}
              </Description>
            )}
            {!isListView && (
              <Footer>
                <UserInfo>
                  <UserImage
                    src={userImage ? userImage : UserIconImage}
                    onError={e => (e.currentTarget.src = UserIconImage)}
                    alt="User Avatar"
                  />
                  <UserName title={userName}>@{userName}</UserName>
                </UserInfo>

                <EventInfo>
                  <EventDate>{formatDateCustom(eventDate)}</EventDate>
                  <LocationContainer>
                    <img src={MapPinIconImage} alt="" width={14} height={14} />
                    <Location ref={locationRef} title={location}>
                      {location}
                    </Location>
                  </LocationContainer>
                </EventInfo>
              </Footer>
            )}

            {(role === 'admin' || isEventCreator) && (
              <AdminActions $isListView={isListView}>
                <ActionButton onClick={handleEdit}>Edit</ActionButton>
                <ActionButton onClick={handleDelete}>Delete</ActionButton>
              </AdminActions>
            )}
          </CardContainer>
        </a>

        {isModalOpen && modalEventData && (
          <EventModal
            eventData={modalEventData}
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={saveEvent}
          />
        )}

        <ConfirmDelete
          isOpen={isDeleteConfirmOpen}
          message="Are you sure you want to delete this event?"
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
      </>
    );
  }
);

export default Card;
