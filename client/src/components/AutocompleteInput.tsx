import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Libraries, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';

const libraries: Libraries = ["places"];

interface AutocompleteInputProps {
  initialValue?: string;
  placeholder?: string;
  onLocationChange: (location: string, lat: number, lng: number) => void;
}

const Input = styled.input`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid var(--color-gray-10);
  border-radius: var(--border-radius-sm);
  outline: none;
  transition: border-color 0.2s;
  min-width: 100%;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
`;

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder = "Enter a location",
  initialValue = '',
  onLocationChange,
}) => {
  const [location, setLocation] = useState({location: initialValue, lat: 0, lng: 0});

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
    libraries: libraries,
  });

  useEffect(() => {
    setLocation({location: initialValue, lat: 0, lng: 0});
  }, [initialValue]);

  const handlePlaceChange = () => {
    const places = searchBoxRef.current?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const newLocation = place.formatted_address || place.name || '';
      const newLat = place.geometry?.location?.lat() || 0;
      const newLng = place.geometry?.location?.lng() || 0;

      setLocation({ location: newLocation, lat: newLat, lng: newLng });
      onLocationChange(newLocation, newLat, newLng);
    }
  };


  return isLoaded ? (
    <StandaloneSearchBox onLoad={ref => (searchBoxRef.current = ref)} onPlacesChanged={handlePlaceChange}>
      <Input type="text" value={location.location} placeholder={placeholder} onChange={e => setLocation({ ...location, location: e.target.value })}/>
    </StandaloneSearchBox>
  ) : (
    <Input type="text" placeholder="Loading..." disabled />
  );
};

export default AutocompleteInput;