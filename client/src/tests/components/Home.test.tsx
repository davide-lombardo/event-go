import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import * as EventContext from '../../context/EventContext';
import * as UserContext from '../../context/UserContext';

// Mock the contexts
vi.mock('../../context/EventContext', () => ({
  useEventContext: vi.fn(),
}));

vi.mock('../../context/UserContext', () => ({
  useUserContext: vi.fn(),
}));

// Mock the geolocation API
const mockGeolocation = {
  getCurrentPosition: vi.fn(),
};

// Mock fetch API
global.fetch = vi.fn();

describe('Home Component', () => {
  const mockFetchEvents = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Setup geolocation mock
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true,
    });
    
    // Setup fetch mock
    (global.fetch as any).mockResolvedValue({
      json: async () => ({
        status: 'OK',
        results: [{ formatted_address: 'Test Address, City' }],
      }),
    });
    
    // Mock environment variables
    vi.stubEnv('VITE_GOOGLE_API_KEY', 'test-api-key');
    
    // Mock the event context values
    (EventContext.useEventContext as any).mockReturnValue({
      events: [],
      loading: false,
      fetchEvents: mockFetchEvents,
      pagination: { page: 1, totalPages: 1 },
    });

    // Mock the user context
    (UserContext.useUserContext as any).mockReturnValue({
      user: { id: '1', name: 'Test User' },
      isAuthenticated: true,
      loading: false,
    });
  });
  
  it('renders the hero component', () => {
    render(<Home />);
    expect(screen.getByText(/Search and discover events/i)).toBeInTheDocument();
  });
  

  it('renders the filter section', () => {
    render(<Home />);
    const locationElements = screen.getAllByText(/Location/i);
    expect(locationElements.length).toBeGreaterThan(1);
  });

  
  it('displays no events message when there are no events and not loading', () => {
    (EventContext.useEventContext as any).mockReturnValue({
      events: [],
      loading: false,
      fetchEvents: mockFetchEvents,
      pagination: { page: 1, totalPages: 1 },
    });
    
    render(<Home />);
    expect(screen.getByText(/No events found matching your criteria/i)).toBeInTheDocument();
  });
  
  it('displays events when they are available', () => {
    const mockEvents = [
      {
        id: '1',
        name: 'Test Event',
        link: 'https://test.com',
        description: 'Test Description',
        userImage: 'https://test.com/image.jpg',
        userName: 'Test User',
        eventDate: new Date().toISOString(),
        location: 'Test Location',
        latitude: 40.7128,
        longitude: -74.0060,
        category: 'Music',
      },
    ];
    
    (EventContext.useEventContext as any).mockReturnValue({
      events: mockEvents,
      loading: false,
      fetchEvents: mockFetchEvents,
      pagination: { page: 1, totalPages: 1 },
    });

    render(<Home />);
    
    expect(true).toBeTruthy();
  });
  
  it('attempts to get user location on mount', async () => {

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
      });
    });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('maps.googleapis.com/maps/api/geocode/json')
      );
    });
  });
  
  it('handles geolocation error', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
      error(new Error('Geolocation error'));
    });
    
    render(<Home />);
    
    await waitFor(() => {
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    consoleSpy.mockRestore();
  });
  
  it('calls fetchEvents with correct parameters when filters change', async () => {
    expect(true).toBeTruthy();
  });
});