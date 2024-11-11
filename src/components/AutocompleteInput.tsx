import React, { useRef } from 'react';
import styled from 'styled-components';
import { Libraries, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

const libraries: Libraries = ["places"];

interface AutocompleteInputProps {
  placeholder?: string;
  onPlaceSelected: (address: string) => void;
}

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

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder = "Enter a location",
  onPlaceSelected,
}) => {
  const autocompleteRef = useRef<any>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
    libraries: libraries,
  });

  const handlePlaceChange = () => {
    const address = autocompleteRef.current?.getPlaces()[0].formatted_address;
    onPlaceSelected(address || '');
  };

  return isLoaded ? (
    <StandaloneSearchBox onLoad={ref => (autocompleteRef.current = ref)} onPlacesChanged={handlePlaceChange}>
      <Input type="text" placeholder={placeholder} />
    </StandaloneSearchBox>
  ) : (
    <Input type="text" placeholder="Loading..." disabled />
  );
};

export default AutocompleteInput;