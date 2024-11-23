import React, { useState } from 'react';
import styled from 'styled-components';
import { EventFilters } from '../types/event.model';
import AutocompleteInput from './AutocompleteInput';

type FilterProps = {
  onFilterChange: (filters: EventFilters) => void;
};

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--10px);
  margin-bottom: var(--20px);
  margin-top: var(--20px);
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

const FilterSection = ({ onFilterChange }: FilterProps) => {
  const [location, setLocation] = useState('');
  const [date, setDateFilter] = useState<EventFilters['date']>('today');

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDate = event.target.value as EventFilters['date'];
    setDateFilter(selectedDate);
    onFilterChange({ location, date: selectedDate });
  };

  const handleLocationChange = (location: string) => {
    setLocation(location);
    onFilterChange({ location, date });
  };

  return (
    <FilterWrapper>
      <AutocompleteInput
        placeholder="Enter a location"
        onPlaceSelected={handleLocationChange}
      />
      <Select value={date} onChange={handleDateChange}>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="weekend">This Weekend</option>
      </Select>
    </FilterWrapper>
  );
};

export default FilterSection;
