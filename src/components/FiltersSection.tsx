import { useState } from 'react';
import styled from 'styled-components';
import { EventFilters } from '../types/event.model';
import AutocompleteInput from './AutocompleteInput';
import Button from './Button';

type FilterProps = {
  onFilterChange: (filters: EventFilters) => void;
};

const FilterWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: var(--10px);
  margin-bottom: var(--20px);
  margin-top: var(--20px);

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const InputsWrapper = styled.div`
  display: flex;
  gap: var(--10px);
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

  const handleSubmit = () => {
    onFilterChange({ location, date });
  };

  const handleClear = () => {
    setLocation('');
    setDateFilter('today');
    onFilterChange({ location: '', date: 'today' });
  };

  return (
    <FilterWrapper>
      <InputsWrapper>
        <AutocompleteInput
          placeholder="Enter a location"
          onPlaceSelected={setLocation}
        />
        <Select
          value={date}
          onChange={e => setDateFilter(e.target.value as EventFilters['date'])}
        >
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="weekend">This Weekend</option>
        </Select>
      </InputsWrapper>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button type="submit" onClick={handleSubmit}>
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
