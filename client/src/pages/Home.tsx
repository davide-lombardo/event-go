import * as React from 'react';

import styled from 'styled-components';
import Card from '../components/Card';
import FilterSection from '../components/FiltersSection';
import { Hero } from '../components/Hero';
import { useEventContext } from '../context/EventContext';
import Spinner from '../components/shared/Spinner';
import { EventFilters } from '../types/event.model';
import Pagination from '../components/Pagination';
import { useCallback, useEffect, useMemo, useState } from 'react';

const EventListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
  margin-top: 5rem;

  /* Center the content when no events or loading */
  &.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr; /* Single column for empty state */
    height: auto; /* Auto height when no events */
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const NoEventsMessage = styled.div`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  margin-top: 50px;
`;
function Home() {
  const { events, loading, fetchEvents, pagination } = useEventContext();
  const [userLocation, setUserLocation] = useState<string>('');

  const handleFilterChange = useCallback(
    (newFilters: EventFilters) => {
      fetchEvents({
        ...newFilters,
        location: {
          searchText: newFilters.location.searchText.trim(),
          lat: newFilters.location.lat,
          lng: newFilters.location.lng,
        },
      });
    },
    [fetchEvents]
  );

  const getUserLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  };

  const getAddressFromCoordinates = async (
    lat: number,
    lng: number
  ): Promise<string> => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const data = await response.json();
    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].formatted_address;
    } else {
      throw new Error('Unable to retrieve address from coordinates');
    }
  };

  const fetchEventsNearUser = async (lat: number, lng: number) => {
    try {
      const location = await getAddressFromCoordinates(lat, lng);
      setUserLocation(location);
      const filters: EventFilters = {
        location: {
          searchText: location,
          lat,
          lng,
        },
        date: 'all',
        categories: [],
      };
      await fetchEvents(filters);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    const fetchUserLocationAndEvents = async () => {
      try {
        const position = await getUserLocation();
        const { latitude, longitude } = position.coords;
        await fetchEventsNearUser(latitude, longitude);
      } catch (error) {
        console.error('Error getting user location or fetching events:', error);
      }
    };

    fetchUserLocationAndEvents();
  }, []);

  const eventsToDisplay = useMemo(
    () => (events.length > 0 ? events : []),
    [events]
  );
  const isEmptyState = useMemo(
    () => loading || eventsToDisplay.length === 0,
    [loading, eventsToDisplay]
  );

  return (
    <React.Fragment>
      <Hero subtitle="Search and discover events happening near you. Explore upcoming events, and find both free and paid experiences tailored to your location." />
      <FilterSection
        onFilterChange={handleFilterChange}
        initialLocation={userLocation}
      />

      {eventsToDisplay.length > 0 && (
        <h2
          style={{
            textAlign: 'center',
            marginTop: '5rem',
            color: 'var(--color-gray-8)',
          }}
        >
          Available Events
        </h2>
      )}

      <EventListWrapper className={isEmptyState ? 'empty-state' : ''}>
        {loading ? (
          <Spinner $size="15px" $gradient="var(--gradient-primary)" />
        ) : eventsToDisplay.length > 0 ? (
          eventsToDisplay.map(event => (
            <Card
              key={event.id}
              eventId={event.id}
              title={event.name}
              link={event.link}
              description={event.description}
              paid={event.paid}
              userImage={event.userImage}
              userName={event.userName}
              eventDate={event.eventDate}
              location={event.location}
              latitude={event.latitude}
              longitude={event.longitude}
              category={event.category}
            />
          ))
        ) : (
          <NoEventsMessage>
            No events found matching your criteria.
          </NoEventsMessage>
        )}
      </EventListWrapper>
      {events.length > 0 && (
        <Pagination hasMore={pagination.page < pagination.totalPages} />
      )}
    </React.Fragment>
  );
}

export default Home;
