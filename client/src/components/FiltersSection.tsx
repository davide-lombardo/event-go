import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EventFilters } from '../types/event.model';
import AutocompleteInput from './AutocompleteInput';
import Button from './Button';

interface FilterProps {
  onFilterChange: (filters: EventFilters) => void;
  initialLocation: string;
};

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

const Select = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: var(--color-blue);
  }
`;

const FilterSection = ({ onFilterChange, initialLocation }: FilterProps) => {
  const [filters, setFilters] = useState<EventFilters>({
    location: { searchText: '', lat: 0, lng: 0 },
    date: '',
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: { searchText: initialLocation, lat: 0, lng: 0 },
    }));
  }, [initialLocation]);

  const handleLocationChange = (location: string, lat: number, lng: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      location: { searchText: location, lat, lng },
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, date: value as EventFilters['date'] }));
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleClear = () => {
    const clearedFilters: EventFilters = { location: {searchText: '', lat: 0, lng: 0}, date: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };



  return (
    <FilterWrapper>
      <InputsWrapper>
        <AutocompleteInput
          initialValue={filters.location.searchText}
          onLocationChange={handleLocationChange}
          placeholder="Enter a location"
        />
        
        <Select
          value={filters.date}
          onChange={handleDateChange}
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="weekend">This Weekend</option>
        </Select>
      </InputsWrapper>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="submit" onClick={handleApply}>
          Apply
        </Button>

        <Button onClick={handleClear} variant={'danger'}>
          Clear
        </Button>
      </div>
    </FilterWrapper>
  );
};

export default FilterSection;
