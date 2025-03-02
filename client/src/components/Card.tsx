import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../context/UserContext';
import { EventCategory, EventData } from '../types/event.model';
import EventModal from './dialogs/AddEvent';
import { useEventContext } from '../context/EventContext';
import ConfirmDelete from './dialogs/ConfirmDelete';
import { formatDateCustom } from '../utils/date.utils';
import { categoryColors, categoryIcons } from '../utils/category.utils';
import { DeleteIcon, EditIcon, MapPinIcon } from '../utils/icons.utils';
import UserAvatar from './UserInfo';

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
  flex-direction: ${props => (props.$isListView ? 'column' : 'column')};
  align-items: ${props => (props.$isListView ? 'stretch' : 'flex-start')};
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
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardContentWrapper = styled.div<{ $isListView: boolean }>`
  position: relative;
  border-radius: calc(var(--border-radius) - 5px);
  display: ${props => (props.$isListView ? 'flex' : 'block')};
  flex-direction: ${props => (props.$isListView ? 'row' : 'column')};
  align-items: ${props => (props.$isListView ? 'center' : 'flex-start')};
  justify-content: ${props => (props.$isListView ? 'space-between' : 'unset')};
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

const CategoryIconWrapper = styled.div<{ $category: EventCategory }>`
  height: 1em;
  width: 1em;
  margin-right: var(--5px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => categoryColors[props.$category] || 'currentColor'};

  & > svg {
    width: 100%;
    height: 100%;
  }
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

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const EventDate = styled.span`
  font-size: var(--font-size-small);
  color: var(--font-color-muted);
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

const AdminActions = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: var(--10px) var(--20px);
  width: 100%;
  z-index: 1;

  @media (max-width: 500px) {
    flex-direction: row;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-gray-8);
  color: var(--color-gray-1);
  border: none;
  padding: var(--5px) var(--10px);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: var(--color-primary);
  }

  &:focus {
    outline-offset: 0.3rem;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
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
    const showAdminActions = role === 'admin' || isEventCreator;

    const handleEdit = () => {
      console.log('Edit button clicked');
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

    const handleDelete = () => {
      console.log('Delete button clicked');
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
        <CardContainer $isListView={isListView}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <CardContentWrapper $isListView={isListView}>
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
                  <CategoryIconWrapper $category={category as EventCategory}>
                    {categoryIcons[category as EventCategory]}
                  </CategoryIconWrapper>
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
                 <UserAvatar userName={userName} userImage={userImage} forceDefaultIcon={true}/>

                  <EventInfo>
                    <EventDate>{formatDateCustom(eventDate)}</EventDate>
                    <LocationContainer>
                    <IconWrapper>{MapPinIcon}</IconWrapper>
                      <Location ref={locationRef} title={location}>
                        {location}
                      </Location>
                    </LocationContainer>
                  </EventInfo>
                </Footer>
              )}
            </CardContentWrapper>
          </a>

          {showAdminActions && (
            <AdminActions theme={{ $isListView: isListView }}>
              <ActionButton onClick={handleEdit}>
                <IconWrapper>{EditIcon}</IconWrapper>
                Edit
              </ActionButton>
              <ActionButton onClick={handleDelete}>
                <IconWrapper>{DeleteIcon}</IconWrapper>
                Delete
              </ActionButton>
            </AdminActions>
          )}
        </CardContainer>

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
