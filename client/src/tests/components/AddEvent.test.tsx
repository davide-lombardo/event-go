import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventModal from '../../components/dialogs/AddEvent';
import { EventCategory, EventData } from '../../types/event.model';
import toast from 'react-hot-toast';


vi.mock('../../components/AutocompleteInput.tsx', () => ({
  default: ({ onLocationChange, initialValue, placeholder }: any) => (
    <input
      data-testid="location-input"
      id="location"
      value={initialValue || ''}
      onChange={(e) => onLocationChange(e.target.value, 40.7128, -74.0060)}
      placeholder={placeholder}
    />
  ),
}));

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
  success: vi.fn(),
  error: vi.fn(),
}));

vi.mock('../../context/EventContext.tsx', () => ({
  useEventContext: vi.fn(() => ({
    addEvent: vi.fn(),
    updateEvent: vi.fn(),
  })),
}));

vi.mock('../../context/UserContext.tsx', () => ({
  useUserContext: vi.fn(() => ({
    user: {
      photoURL: 'http://example.com/photo.jpg',
      username: 'testuser',
    },
  })),
}));

describe('EventModal Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();
  const mockEventData: EventData = {
    id: '1',
    name: 'Test Event',
    location: 'New York, NY',
    latitude: 40.7128,
    longitude: -74.006,
    description: 'Test Description',
    link: 'https://example.com',
    paid: false,
    userImage: 'http://example.com/photo.jpg',
    userName: 'testuser',
    eventDate: '2023-12-31',
    category: EventCategory.Music,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal when isOpen is true', () => {
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    expect(screen.getByText(/add new event/i)).toBeInTheDocument();
    expect(screen.getByTestId('location-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save event/i })).toBeInTheDocument();
  });

  it('renders the modal with initial event data when provided', () => {
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        eventData={mockEventData}
      />
    );

    expect(screen.getByDisplayValue(mockEventData.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockEventData.location)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockEventData.eventDate)).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const closeButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('validates the form and shows errors for invalid inputs', async () => {
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
  
    const saveButton = screen.getByRole('button', { name: /save event/i });
    fireEvent.click(saveButton);

    await waitFor(() => {
      const errorElements = screen.getAllByText(/name|date|location|link/i);
      expect(errorElements.length).toBeGreaterThan(0);
      
      expect(screen.getByText(/name/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    const mockDate = new Date();
    mockDate.setFullYear(mockDate.getFullYear() + 1);
    const futureDate = mockDate.toISOString().split('T')[0];
    
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );
  
    const nameInput = screen.getByPlaceholderText(/enter the name of the event/i);
    const dateInput = screen.getByPlaceholderText(/event date/i);
    const locationInput = screen.getByTestId('location-input');
    const linkInput = screen.getByPlaceholderText(/https:\/\/example.com/i);
    const saveButton = screen.getByRole('button', { name: /save event/i });
  
    // Fill all required fields
    fireEvent.change(nameInput, { target: { value: 'New Event' } });
    fireEvent.change(dateInput, { target: { value: futureDate } });
    fireEvent.change(locationInput, { target: { value: 'New York, NY' } });
    fireEvent.change(linkInput, { target: { value: 'https://example.com' } });
  
    fireEvent.click(saveButton);
  
    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
        name: 'New Event',
        location: 'New York, NY',
        latitude: 40.7128, 
        longitude: -74.006,
        link: 'https://example.com',
        eventDate: futureDate,
      }));
      expect(toast.success).toHaveBeenCalledWith('Event is successfully added.');
    });
  });

  it('handles location change', () => {
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const locationInput = screen.getByTestId('location-input');
    fireEvent.change(locationInput, { target: { value: 'San Francisco, CA' } });

    expect(locationInput).toHaveValue('San Francisco, CA');
  });

  it('handles category change', () => {
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: EventCategory.Tech } });

    expect(categorySelect).toHaveValue(EventCategory.Tech);
  });

  it('handles payment type change', () => {
    render(
      <EventModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const paidRadio = screen.getByLabelText(/paid/i);
    fireEvent.click(paidRadio);

    expect(paidRadio).toBeChecked();
  });
});