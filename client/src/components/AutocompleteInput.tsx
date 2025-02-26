import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Libraries, StandaloneSearchBox, useJsApiLoader } from '@react-google-maps/api';
import MapPinIconImage from '/src/assets/map-pin.svg';

const libraries: Libraries = ["places"];

interface AutocompleteInputProps {
  initialValue?: string;
  placeholder?: string;
  onLocationChange: (location: string, lat: number, lng: number) => void;
  handleFindNearMe?: () => void;
  showMapPinIcon?: boolean;
}

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{ $fullWidth: boolean }>`
  padding: ${props => (props.$fullWidth ? '0.8rem' : '0.8rem 0.8rem 0.8rem 3rem')};
  font-size: 1rem;
  border: 1px solid var(--color-gray-10);
  border-radius: var(--border-radius-sm);
  outline: none;
  transition: border-color 0.2s;
  width: 100%;

  &:focus {
    box-shadow: 0 0 0 2px var(--color-primary);
  }
`;

const MapPinButton = styled.button`
  position: absolute;
  left: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;

  img {
    width: 16px;
  }

  &:hover {
    opacity: 0.5;
  }
`;

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  placeholder = "Enter a location",
  initialValue = '',
  onLocationChange,
  handleFindNearMe,
  showMapPinIcon = true
}) => {
  const [location, setLocation] = useState({ location: initialValue, lat: 0, lng: 0 });

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
    libraries: libraries,
  });

  useEffect(() => {
    setLocation({ location: initialValue, lat: 0, lng: 0 });
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

  const handleMapPinClick = () => {
    if (handleFindNearMe) {
      handleFindNearMe();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLocation = e.target.value;
    setLocation({
      location: newLocation,
      lat: newLocation ? location.lat : 0,
      lng: newLocation ? location.lng : 0
    });
    onLocationChange(newLocation, newLocation ? location.lat : 0, newLocation ? location.lng : 0);
  };

  return isLoaded ? (
    showMapPinIcon ? (
      <InputWrapper>
        <StandaloneSearchBox onLoad={ref => (searchBoxRef.current = ref)} onPlacesChanged={handlePlaceChange}>
          <Input
            type="text"
            value={location.location}
            placeholder={placeholder}
            onChange={handleInputChange}
            $fullWidth={false}
          />
        </StandaloneSearchBox>
        <MapPinButton onClick={handleMapPinClick}>
          <img src={MapPinIconImage} alt="Map Pin" />
        </MapPinButton>
      </InputWrapper>
    ) : (
      <StandaloneSearchBox onLoad={ref => (searchBoxRef.current = ref)} onPlacesChanged={handlePlaceChange}>
        <Input
          type="text"
          value={location.location}
          placeholder={placeholder}
          onChange={handleInputChange}
          $fullWidth={true}
        />
      </StandaloneSearchBox>
    )
  ) : (
    <Input type="text" placeholder="Loading..." disabled $fullWidth={!showMapPinIcon}/>
  );
};

export default AutocompleteInput;
