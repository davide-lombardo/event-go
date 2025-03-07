import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { EventCategory, EventData } from '../../types/event.model';
import toast from 'react-hot-toast';
import Button from '../shared/Button';
import { useEventContext } from '../../context/EventContext';
import AutocompleteInput from '../AutocompleteInput';
import { useUserContext } from '../../context/UserContext';
import { formatDate } from '../../utils/date.utils';
import Input from '../shared/Input';
import Select from '../shared/Select';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: EventData) => void;
  eventData?: EventData;
}

interface ModalOverlayProps {
  $isOpen: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--card-background-color);
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
  overflow: hidden;
`;

const ModalContent = styled.div`
  background: var(--color-white);
  padding: 2rem;
  width: 500px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: var(--border-radius);
  animation: fadeIn 0.3s ease-in-out;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

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
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--font-color-base);
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--color-gray-4);
  margin-top: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: var(--color-gray-10);

  &:hover {
    color: var(--color-primary);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--10px);
`;

const Label = styled.label<{ required?: boolean }>`
  font-size: 1rem;
  color: var(--color-gray-10);
  &::after {
    content: ${({ required }) => (required ? "' *'" : '')};
    color: var(--color-primary);
    margin-left: 4px;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid var(--color-gray-10);
  border-radius: var(--border-radius-sm);
  resize: none;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
`;

const ErrorText = styled.span`
  color: var(--color-danger);
  font-size: 0.875rem;
  margin-top: -8px;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventData: initialEventData,
  onSave,
}) => {
  const { addEvent, updateEvent } = useEventContext();
  const { user } = useUserContext();

  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState<EventData>({
    id: Date.now().toString(),
    name: '',
    location: '',
    latitude: 0,
    longitude: 0,
    description: '',
    link: '',
    userImage: '',
    userName: '',
    eventDate: '',
    category: EventCategory.Music,
  });

  const [errors, setErrors] = useState({
    name: '',
    date: '',
    location: '',
    latitude: '',
    longitude: '',
    link: '',
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  // Reset state when modal is opened with new data
  useEffect(() => {
    nameRef.current?.focus();

    if (initialEventData) {
      setEventData({
        ...initialEventData,
        eventDate: formatDate(initialEventData.eventDate),
      });
    } else {
      const data = {
        id: Date.now().toString(),
        name: '',
        location: '',
        latitude: 0,
        longitude: 0,
        description: '',
        link: '',
        userImage: '',
        userName: '',
        eventDate: '',
        category: EventCategory.Music,
      };
      setEventData(data);
    }
  }, [initialEventData, isOpen]);

  const validateInput = () => {
    const newErrors = {
      name: '',
      date: '',
      location: '',
      latitude: '',
      longitude: '',
      link: '',
    };

    const specialCharRegex = /^[a-zA-Z0-9 ]*$/;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(eventData.eventDate);

    if (eventData.name.length < 3 || eventData.name.length > 50) {
      newErrors.name = 'Name must be between 3 and 50 characters.';
    } else if (!specialCharRegex.test(eventData.name)) {
      newErrors.name = 'Name cannot contain special characters.';
    }

    if (eventData.eventDate && selectedDate < today) {
      newErrors.date = 'Date cannot be earlier than today.';
    }

    setErrors(newErrors);

    // Focus on the first input with an error
    if (newErrors.name) {
      nameRef.current?.focus();
    } else if (newErrors.date) {
      dateRef.current?.focus();
    } else if (newErrors.link) {
      linkRef.current?.focus();
    }

    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleLocationChange = (location: string, lat: number, lng: number) => {
    setEventData(prevData => ({
      ...prevData,
      location,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value as EventCategory;

    setEventData(prevData => ({ ...prevData, category: selectedCategory }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput()) {
      setLoading(true);
      const eventToSave = {
        ...eventData,
        userImage: user?.photoURL || '',
        userName: user?.username || 'Anonymous',
      };

      try {
        if (initialEventData) {
          await updateEvent(eventToSave);
          toast.success('Event is successfully updated.');
        } else {
          await addEvent(eventToSave);
          toast.success('Event is successfully added.');
        }
        onSave(eventToSave);
        onClose();
      } catch (error) {
        console.error('Failed to save event:', error);
        toast.error(`Failed to save event: ${error || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2 style={{ textAlign: 'center' }}>
            {initialEventData ? 'Edit Event' : 'Add New Event'}
          </h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <GroupContainer>
            <Label htmlFor="name" required>
              Event Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter the name of the event"
              value={eventData.name}
              onChange={handleChange}
              ref={nameRef}
              required
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}

            <Label htmlFor="event-date" required>
              Event Date
            </Label>
            <Input
              id='event-date'
              type="date"
              name="eventDate"
              placeholder="Event Date"
              value={eventData.eventDate}
              onChange={handleChange}
              ref={dateRef}
              required
            />
            {errors.date && <ErrorText>{errors.date}</ErrorText>}

            <Label htmlFor="location" required>
              Location
            </Label>
            <AutocompleteInput
              id='location'
              initialValue={eventData.location}
              placeholder="Enter the location of the event"
              onLocationChange={handleLocationChange}
              showMapPinIcon={false}
            />
            <Divider />
          </GroupContainer>

          <GroupContainer>
            <Label htmlFor="category" required>
              Category
            </Label>
            <Select
              id="category"
              name="category"
              value={eventData.category}
              onChange={handleCategoryChange}
            >
              {Object.values(EventCategory).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>

            <Label htmlFor="link" required>
              Event link
            </Label>
            <Input
              id='link'
              name="link"
              type="url"
              placeholder="https://example.com"
              value={eventData.link}
              onChange={handleChange}
              ref={linkRef}
              required
            />
            {errors.link && <ErrorText>{errors.link}</ErrorText>}

            <Label htmlFor="description">Description</Label>
            <TextArea
              id='description'
              name="description"
              placeholder="Add a brief description of the event"
              value={eventData.description}
              onChange={handleChange}
              rows={4}
            />
          </GroupContainer>

          <ButtonRow>
            <Button onClick={onClose} variant={'outline'} label="Cancel">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} label="Save Event">
              Save Event
            </Button>
          </ButtonRow>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
