import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventData } from '../../types/event.model';
import toast from 'react-hot-toast';
import Button from '../Button';
import { useEventContext } from '../../context/EventContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import AutocompleteInput from '../AutocompleteInput';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: EventData) => void;
  eventData?: EventData; // Optional prop for editing
}

interface ModalOverlayProps {
  $isOpen: boolean;
}

const ModalOverlay = styled.div<ModalOverlayProps>`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  width: 500px;
  max-width: 90%;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;

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
    color: black;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: black;

  &:hover {
    color: var(--color-primary);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  min-width: 100%;

  &:focus {
    border-color: var(--color-blue);
  }
`;

const Label = styled.label<{ required?: boolean }>`
  font-size: 1rem;
  color: black;
  &::after {
    content: ${({ required }) => (required ? "' *'" : '')};
    color: red;
    margin-left: 4px;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  color: black;

  input[type='radio'] {
    accent-color: var(
      --color-primary
    ); /* Add primary color or any preferred color */
    margin-right: 0.5rem;
  }

  &:hover {
    color: var(--color-primary);
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  resize: none;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-blue);
  }
`;

const ErrorText = styled.span`
  color: red;
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
}) => {
  const { addEvent } = useEventContext();
  const [user] = useAuthState(auth);

  const [loading, setLoading] = useState(false);

  const [eventData, setEventData] = useState<EventData>({
    id: Date.now().toString(),
    name: '',
    location: '',
    description: '',
    link: '',
    tags: [],
    paid: false,
    userImage: '',
    userName: '',
    eventDate: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    date: '',
    location: '',
    link: '',
  });

  // Reset state when modal is opened with new data
  useEffect(() => {
    if (isOpen) {
      setEventData(
        initialEventData || {
          id: Date.now().toString(),
          name: '',
          location: '',
          description: '',
          link: '',
          tags: [],
          paid: false,
          userImage: '',
          userName: '',
          eventDate: '',
        }
      );
    }
  }, [isOpen, initialEventData]);

  const validateInput = () => {
    const newErrors = {
      name: '',
      date: '',
      location: '',
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
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData(prevData => ({
      ...prevData,
      paid: e.target.value === 'paid',
    }));
  };

  const handleLocationChange = (location: string) => {
    setEventData(prevData => ({ ...prevData, location }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput()) {
      setLoading(true);
      const eventToSave = {
        ...eventData,
        userImage: user?.photoURL || '',
        userName: user?.displayName || 'Anonymous',
      };

      try {
        await addEvent(eventToSave);
        toast.success('Event is successfully added.');
        onClose();
      } catch (error) {
        console.error('Failed to add event:', error);
        toast.error(`Failed to add event: ${error || 'Unknown error'}`);
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
          <Label htmlFor="name" required>
            Event Name
          </Label>
          <Input
            name="name"
            placeholder="Enter the name of the event"
            value={eventData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <ErrorText>{errors.name}</ErrorText>}

          <Label htmlFor="date" required>
            Event Date
          </Label>
          <Input
            type="date"
            name="eventDate"
            placeholder="Event Date"
            value={eventData.eventDate}
            onChange={handleChange}
            required
          />
          {errors.date && <ErrorText>{errors.date}</ErrorText>}

          <Label htmlFor="location" required>
            Location
          </Label>
          <AutocompleteInput
            placeholder="Enter the location of the event"
            onPlaceSelected={handleLocationChange}
          />

          {/* {errors.location && <ErrorText>{errors.location}</ErrorText>} */}

          <Label htmlFor="description">Description</Label>
          <TextArea
            name="description"
            placeholder="Add a brief description of the event"
            value={eventData.description}
            onChange={handleChange}
            rows={4}
          />

          <Label htmlFor="link" required>
            Event link
          </Label>
          <Input
            name="link"
            type="url"
            placeholder="https://example.com"
            value={eventData.link}
            onChange={handleChange}
            required
          />
          {errors.link && <ErrorText>{errors.link}</ErrorText>}

          <Label>Payment Type</Label>
          <RadioGroup>
            <RadioLabel>
              <input
                type="radio"
                name="paid"
                value="free"
                checked={!eventData.paid}
                onChange={handleRadioChange}
              />
              Free
            </RadioLabel>
            <RadioLabel>
              <input
                type="radio"
                name="paid"
                value="paid"
                checked={eventData.paid}
                onChange={handleRadioChange}
              />
              Paid
            </RadioLabel>
          </RadioGroup>

          <ButtonRow>
            <Button onClick={onClose} variant={'danger'}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>Save Event</Button>
          </ButtonRow>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventModal;
