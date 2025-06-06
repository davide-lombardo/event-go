import * as React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import FilterSection from '../components/FiltersSection';
import { Hero } from '../components/Hero';
import { useEventContext } from '../context/EventContext';
import { EventFilters } from '../types/event.model';
import Pagination from '../components/Pagination';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Skeleton from '../components/Skeleton';
import { GridIcon, ListIcon } from '../utils/icons.utils';


const EventListWrapper = styled.div<{ $isListView: boolean }>`
  display: ${props => (props.$isListView ? 'flex' : 'grid')};
  flex-direction: ${props => (props.$isListView ? 'column' : 'unset')};
  grid-template-columns: ${props =>
    props.$isListView ? '1fr' : 'repeat(2, 1fr)'};
  justify-items: center;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;

  &.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    grid-template-columns: 1fr;
    height: auto;
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const NoEventsMessage = styled.div`
  font-size: 1.2rem;
  color: var(--color-gray-7);
  text-align: center;
  margin-top: var(--50px);
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 1rem 1rem 0 0;
  user-select: none;

  @media (max-width: 700px) {
    justify-content: center;
    margin-right: 0;
  }
`;

const SwitchLabels = styled.div`
  display: flex;
  position: relative;
  background-color: var(--color-gray-2);
  border-radius: 30px;
  height: 36px;
  width: 200px;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SwitchLabel = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${props => (props.$active ? '600' : '400')};
  color: ${props =>
    props.$active ? 'var(--color-white)' : 'var(--color-gray-10)'};
  transition: color 0.3s ease;
  z-index: 1;
`;

const Slider = styled.div<{ $isListView: boolean }>`
  position: absolute;
  height: 36px;
  width: 50%;
  border-radius: 30px;
  background-color: var(--color-primary, #3b82f6);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  transform: translateX(${props => (props.$isListView ? '0' : '100%')});
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const ViewIcon = styled.div<{ $isActive: boolean }>`
  display: flex;
  margin-right: 6px;
  width: 1rem;
  color: ${props => (props.$isActive ? 'var(--color-white)' : 'var(--color-gray-10)')};
`;

function Home() {
  const heroSubtitle = 'Easily find concerts, workshops, and unique experiences happening nearby. EventGo connects you with the best your city has to offer.';

  const { events, loading, fetchEvents, pagination } = useEventContext();
  const [isListView, setIsListView] = useState(false);
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

  const fetchEventsNearUser = async (lat: number, lng: number) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();

      let location = '';
      if (data.status === 'OK' && data.results.length > 0) {
        location = data.results[0].formatted_address;
        setUserLocation(location);
      } else {
        throw new Error('Unable to retrieve address from coordinates');
      }

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
      return location;
    } catch (error) {
      console.error('Error fetching events:', error);
      return '';
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const toggleView = () => {
    setIsListView(prev => !prev);
  };

  const eventsToDisplay = useMemo(
    () => (events?.length > 0 ? events : []),
    [events]
  );
  const isEmptyState = useMemo(
    () => loading || eventsToDisplay.length === 0,
    [loading, eventsToDisplay]
  );

  return (
    <React.Fragment>
      <Hero subtitle={heroSubtitle} />
      <FilterSection
        onFilterChange={handleFilterChange}
        initialLocation={userLocation}
        getUserLocation={getUserLocation}
        fetchEventsNearUser={fetchEventsNearUser}
      />

      {eventsToDisplay.length > 0 && (
        <>
          <h2
            style={{
              textAlign: 'center',
              marginTop: '5rem',
              color: 'var(--color-gray-8)',
              flexGrow: 1,
            }}
          >
            Available Events
          </h2>
          <SwitchContainer>
            <SwitchLabels>
              <Slider $isListView={isListView} />

              <SwitchLabel $active={isListView}>
                <HiddenRadio
                  type="radio"
                  name="viewMode"
                  checked={isListView}
                  onChange={() => toggleView()}
                />
                <ViewIcon $isActive={isListView}>{ListIcon}</ViewIcon> List View
              </SwitchLabel>

              <SwitchLabel $active={!isListView}>
                <HiddenRadio
                  type="radio"
                  name="viewMode"
                  checked={!isListView}
                  onChange={() => toggleView()}
                />
                <ViewIcon $isActive={!isListView}>{GridIcon}</ViewIcon> Grid View
              </SwitchLabel>
            </SwitchLabels>
          </SwitchContainer>
        </>
      )}

      <EventListWrapper
        className={!loading && isEmptyState ? 'empty-state' : ''}
        $isListView={isListView}
      >
        {loading ? (
          <Skeleton isListView={isListView}/>
        ) : eventsToDisplay.length > 0 ? (
          eventsToDisplay.map(event => (
            <Card
              key={event.id}
              eventId={event.id}
              title={event.name}
              link={event.link}
              description={event.description}
              userImage={event.userImage}
              userName={event.userName}
              eventDate={event.eventDate}
              location={event.location}
              latitude={event.latitude}
              longitude={event.longitude}
              category={event.category}
              isListView={isListView}
            />
          ))
        ) : (
          <NoEventsMessage>
            No events found matching your criteria.
          </NoEventsMessage>
        )}
      </EventListWrapper>
      {events?.length > 0 && (
        <Pagination hasMore={pagination.page < pagination.totalPages} />
      )}
    </React.Fragment>
  );
}

export default Home;
