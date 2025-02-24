import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventCategory, EventFilters } from '../types/event.model';
import AutocompleteInput from './AutocompleteInput';
import Button from './Button';

interface FilterProps {
  onFilterChange: (filters: EventFilters) => void;
  initialLocation: string;
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

const Select = styled.select`
  padding: 0.95rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-primary-dark);
  }
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
  min-width: 80px;
  max-width: 80px;
  padding: var(--10px);

  background: radial-gradient(ellipse at 50% 100px, rgba(250, 247, 244, 0.3), rgba(250, 247, 244, 1));
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-elevation-medium);
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: var(--color-gray-6);
  }
`;

const CategoryText = styled.span`
  font-size: 0.9rem;
  text-align: center;
`;

const CategoryIcon = styled.span`
  font-size: 1.5rem;
`;

const categoryIcons: Record<EventCategory, string> = {
  [EventCategory.Music]: '🎵',
  [EventCategory.Sports]: '⚽',
  [EventCategory.Tech]: '💻',
  [EventCategory.Art]: '🎨',
  [EventCategory.Education]: '📚',
  [EventCategory.Health]: '🌿',
  [EventCategory.Business]: '💼',
};

const FilterSection = ({ onFilterChange, initialLocation }: FilterProps) => {
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
  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleClear = () => {
    const clearedFilters: EventFilters = {
      location: { searchText: '', lat: 0, lng: 0 },
      date: '',
      categories: [],
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <>
      <FilterWrapper>
        <InputsWrapper>
          <InputGroup>
            <Label htmlFor="location">Location</Label>
            <AutocompleteInput
              initialValue={filters.location.searchText}
              onLocationChange={handleLocationChange}
              placeholder="Enter a location"
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="date">Date</Label>
            <Select value={filters.date} onChange={handleDateChange}>
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="weekend">This Weekend</option>
            </Select>
          </InputGroup>
        </InputsWrapper>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <Button type="submit" variant='primary' onClick={handleApply}>
            Apply
          </Button>

          <Button onClick={handleClear} variant={'outline'}>
            Clear
          </Button>
        </div>
      </FilterWrapper>

      <CategoriesWrapper>
        {Object.values(EventCategory).map(category => (
          <CategoryButton
            key={category}
            $isSelected={filters.categories.includes(category)}
            onClick={() => handleCategoryToggle(category)}
          >
            <CategoryIcon>{categoryIcons[category]}</CategoryIcon>
            <CategoryText>{category}</CategoryText>
          </CategoryButton>
        ))}
      </CategoriesWrapper>
    </>
  );
};

export default FilterSection;
