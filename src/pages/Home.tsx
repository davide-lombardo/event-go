import * as React from 'react';

import styled from 'styled-components';
import Card from '../components/Card';
import FilterSection from '../components/FiltersSection';
import Hero from '../components/Hero';
import { useEventContext } from '../context/EventContext';
import Spinner from '../components/shared/Spinner';
import { EventFilters } from '../types/event.model';
import Pagination from '../components/Pagination';

const EventListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 20px;
  padding: 20px;
  width: 100%;

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
  const { events, loading, fetchEvents, lastVisible } = useEventContext();

  const handleFilterChange = (newFilters: EventFilters) => {
    console.log('New filters:', newFilters);

    fetchEvents({
      ...newFilters,
      location: newFilters.location.trim(),
    });
  };

  const eventsToDisplay = events.length > 0 ? events : [];
  const isEmptyState = loading || eventsToDisplay.length === 0;

  return (
    <React.Fragment>
      <Hero
        title="Welcome to EventGo"
        subtitle="Search and discover events happening near you. Explore upcoming events, and find both free and paid experiences tailored to your location."
      />
      <FilterSection onFilterChange={handleFilterChange} />
      <EventListWrapper className={isEmptyState ? 'empty-state' : ''}>
        {loading ? (
          <Spinner $size="15px" $gradient="var(--gradient-primary)" />
        ) : eventsToDisplay.length > 0 ? (
          console.log(eventsToDisplay),
          eventsToDisplay.map(event => (
            <Card
              key={event.id}
              eventId={event.id}
              title={event.name}
              link={event.link}
              description={event.description}
              tags={event.tags}
              paid={event.paid}
              userImage={event.userImage}
              userName={event.userName}
              eventDate={event.eventDate}
              location={event.location}
            />
          ))
        ) : (
          <NoEventsMessage>
            No events found matching your criteria.
          </NoEventsMessage>
        )}
      </EventListWrapper>
      {events.length > 0 && <Pagination hasMore={!!lastVisible} />}
    </React.Fragment>
  );
}

export default Home;
