import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventCategory, EventFilters } from '../types/event.model';
import AutocompleteInput from './AutocompleteInput';
import Button from './shared/Button';
import Select from './shared/Select';
import { categoryIcons } from '../utils/category.utils';
import { SearchIcon } from '../utils/icons.utils';

interface FilterProps {
  onFilterChange: (filters: EventFilters) => void;
  initialLocation: string;
  getUserLocation: () => Promise<GeolocationPosition>;
  fetchEventsNearUser: (lat: number, lng: number) => Promise<string>;
}

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: var(--10px);
  margin-bottom: var(--20px);
  margin-top: var(--20px);

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  gap: var(--10px);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: var(--20px);
  margin-top: var(--20px);
  justify-content: center;
  max-width: 90vw;
`;

const CategoryButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 3px solid
    ${props => (props.$isSelected ? 'var(--color-primary)' : 'transparent')};
  cursor: pointer;
  min-width: 90px;
  max-width: 90px;
  padding: var(--10px);

  background: radial-gradient(
    ellipse at 50% 100px,
    rgba(250, 247, 244, 0.3),
    rgba(250, 247, 244, 1)
  );
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-elevation-medium);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }

  @media (pointer: coarse) {
    &:active {
      transform: translateY(-5px);
    }
  }
`;

const IconWrapper = styled.div`
  color: var(--color-gray-10);

  svg {
    width: 24px;
    height: 24px;
  }
`;

const CategoryText = styled.span`
  font-size: 0.9rem;
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;

  @media (max-width: 900px) {
    margin-top: 10px;
  }
`;

const FilterSection = ({
  onFilterChange,
  initialLocation,
  getUserLocation,
  fetchEventsNearUser,
}: FilterProps) => {
  const [filters, setFilters] = useState<EventFilters>({
    location: { searchText: '', lat: 0, lng: 0 },
    date: '',
    categories: [],
  });

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      location: { searchText: initialLocation, lat: 0, lng: 0 },
    }));
  }, [initialLocation]);

  const handleLocationChange = (location: string, lat: number, lng: number) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      location: { searchText: location, lat, lng },
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      date: value as EventFilters['date'],
    }));
  };

  const handleCategoryToggle = (category: EventCategory) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      categories: prevFilters.categories.includes(category)
        ? prevFilters.categories.filter(c => c !== category)
        : [...prevFilters.categories, category],
    }));
  };

  const handleFindNearMe = async () => {
    try {
      const position = await getUserLocation();
      const { latitude, longitude } = position.coords;
      const location = await fetchEventsNearUser(latitude, longitude);
      setFilters(prevFilters => ({
        ...prevFilters,
        location: {
          searchText: location,
          lat: latitude,
          lng: longitude,
        },
      }));
    } catch (error) {
      console.error('Error getting user location:', error);
      alert(
        'Unable to access your location. Please check your browser permissions.'
      );
    }
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  return (
    <>
      <FilterWrapper>
        <InputsWrapper>
          <InputGroup>
            <Label htmlFor="location">Location</Label>
            <AutocompleteInput
              id='location'
              initialValue={filters.location.searchText}
              onLocationChange={handleLocationChange}
              placeholder="Enter a location"
              handleFindNearMe={handleFindNearMe}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="date">Date</Label>
            <Select id="date" value={filters.date} onChange={handleDateChange}>
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="weekend">This Weekend</option>
            </Select>
          </InputGroup>
        </InputsWrapper>

        <ButtonsWrapper>
          <Button
            type="submit"
            variant="primary"
            onClick={handleApply}
            label="Search Events"
            icon={SearchIcon}
          >
            Search Events
          </Button>
        </ButtonsWrapper>
      </FilterWrapper>

      <CategoriesWrapper>
        {Object.values(EventCategory).map(category => (
          <CategoryButton
            key={category}
            $isSelected={filters.categories.includes(category)}
            onClick={() => handleCategoryToggle(category)}
          >
            <IconWrapper>
              {categoryIcons[category as EventCategory]}
            </IconWrapper>
            <CategoryText>{category}</CategoryText>
          </CategoryButton>
        ))}
      </CategoriesWrapper>
    </>
  );
};

export default FilterSection;
