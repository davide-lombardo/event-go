import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Libraries, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

const libraries: Libraries = ["places"];

interface AutocompleteInputProps {
  initialValue?: string;
  placeholder?: string;
  onLocationChange: (location: string) => void;
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
  initialValue = '',
  onLocationChange,
}) => {
  const [location, setLocation] = useState(initialValue);
  // const autocompleteRef = useRef<any>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
    libraries: libraries,
  });

  useEffect(() => {
    setLocation(initialValue);
  }, [initialValue]);

  const handlePlaceChange = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const newLocation = place.formatted_address || place.name || '';
      setLocation(newLocation);
      onLocationChange(newLocation);
    }
  };

  return isLoaded ? (
    <StandaloneSearchBox onLoad={ref => (searchBoxRef.current = ref)} onPlacesChanged={handlePlaceChange}>
      <Input type="text" value={location} placeholder={placeholder} onChange={e => setLocation(e.target.value)}/>
    </StandaloneSearchBox>
  ) : (
    <Input type="text" placeholder="Loading..." disabled />
  );
};

export default AutocompleteInput;