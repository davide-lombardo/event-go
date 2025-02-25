import { render, screen, fireEvent } from '@testing-library/react';
import FilterSection from '../../components/FiltersSection';
import { EventCategory } from '../../types/event.model';

// Mock the AutocompleteInput component
vi.mock('../../components/AutocompleteInput', () => ({
  default: ({ onLocationChange, initialValue, placeholder }: any) => (
    <input
      data-testid="location-input"
      id="location" // Add ID to match the label's 'for' attribute
      value={initialValue || ''}
      onChange={(e) => onLocationChange(e.target.value, 40.7128, -74.0060)}
      placeholder={placeholder}
    />
  ),
}));

describe('FilterSection Component', () => {
  const mockOnFilterChange = vi.fn();
  const initialLocation = 'New York, NY';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // it('renders with all filter elements', () => {
  //   render(
  //     <FilterSection 
  //       onFilterChange={mockOnFilterChange} 
  //       initialLocation={initialLocation} 
  //     />
  //   );

  //   // Check for location label
  //   expect(screen.getByText(/location/i)).toBeInTheDocument();
  //   expect(screen.getByTestId('location-input')).toBeInTheDocument();
    
  //   // Check for date label and select
  //   expect(screen.getByText(/date/i)).toBeInTheDocument();
  //   expect(screen.getByRole('combobox')).toBeInTheDocument();
    
  //   // Check for buttons
  //   expect(screen.getByRole('button', { name: /apply/i })).toBeInTheDocument();
  //   expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    
  //   // Check for all category buttons
  //   Object.values(EventCategory).forEach(category => {
  //     expect(screen.getByText(category)).toBeInTheDocument();
  //   });
  // });

  it('sets initial location from props ', () => {
    render(
      <FilterSection 
        onFilterChange={mockOnFilterChange} 
        initialLocation={initialLocation} 
      />
    );
    
    const locationInput = screen.getByTestId('location-input');
    expect(locationInput).toHaveValue(initialLocation);
  });

  it('handles location change', async () => {
    render(
      <FilterSection 
        onFilterChange={mockOnFilterChange} 
        initialLocation={initialLocation} 
      />
    );
    
    const locationInput = screen.getByTestId('location-input');
    fireEvent.change(locationInput, { target: { value: 'San Francisco, CA' } });
    
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      location: { 
        searchText: 'San Francisco, CA', 
        lat: 40.7128, 
        lng: -74.0060 
      }
    }));
  });

  it('handles date selection', () => {
    render(
      <FilterSection 
        onFilterChange={mockOnFilterChange} 
        initialLocation={initialLocation} 
      />
    );
    
    const dateSelect = screen.getByRole('combobox');
    fireEvent.change(dateSelect, { target: { value: 'today' } });
    
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      date: 'today'
    }));
  });

  it('handles category selection', () => {
    render(
      <FilterSection 
        onFilterChange={mockOnFilterChange} 
        initialLocation={initialLocation} 
      />
    );
    
    // Select a category
    const musicCategory = screen.getByText(EventCategory.Music);
    fireEvent.click(musicCategory);
    
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      categories: [EventCategory.Music]
    }));
  });

  it('handles multiple category selection and deselection', () => {
    render(
      <FilterSection 
        onFilterChange={mockOnFilterChange} 
        initialLocation={initialLocation} 
      />
    );
    
    // Select two categories
    const musicCategory = screen.getByText(EventCategory.Music);
    const techCategory = screen.getByText(EventCategory.Tech);
    
    fireEvent.click(musicCategory);
    fireEvent.click(techCategory);
    
    // Deselect one category
    fireEvent.click(musicCategory);
    
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      categories: [EventCategory.Tech]
    }));
  });

  it('handles clear button click', () => {
    render(
      <FilterSection 
        onFilterChange={mockOnFilterChange} 
        initialLocation={initialLocation} 
      />
    );
    
    // Make some selections first
    const musicCategory = screen.getByText(EventCategory.Music);
    fireEvent.click(musicCategory);
    
    const dateSelect = screen.getByRole('combobox');
    fireEvent.change(dateSelect, { target: { value: 'weekend' } });
    
    // Then clear them
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      location: { searchText: '', lat: 0, lng: 0 },
      date: '',
      categories: []
    });
  });

  it('applies all filters together', () => {
    render(
      <FilterSection 
        onFilterChange={mockOnFilterChange} 
        initialLocation={initialLocation} 
      />
    );
    
    // Set location
    const locationInput = screen.getByTestId('location-input');
    fireEvent.change(locationInput, { target: { value: 'Seattle, WA' } });
    
    // Set date
    const dateSelect = screen.getByRole('combobox');
    fireEvent.change(dateSelect, { target: { value: 'tomorrow' } });
    
    // Select categories
    const sportsCategory = screen.getByText(EventCategory.Sports);
    const artCategory = screen.getByText(EventCategory.Art);
    fireEvent.click(sportsCategory);
    fireEvent.click(artCategory);
    
    // Apply filters
    const applyButton = screen.getByRole('button', { name: /apply/i });
    fireEvent.click(applyButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      location: { searchText: 'Seattle, WA', lat: 40.7128, lng: -74.0060 },
      date: 'tomorrow',
      categories: [EventCategory.Sports, EventCategory.Art]
    });
  });
});