import * as React from 'react';

import styled from 'styled-components';
import Card from '../components/Card';
import FilterSection from '../components/FiltersSection';
import { Filters } from '../types/filters.model';
import Hero from '../components/Hero';
import { useEventContext } from '../context/EventContext';
import Spinner from '../components/shared/Spinner';

const EventListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const NoEventsMessage = styled.div`
  font-size: 1.2rem;
  color: #555;
  text-align: center;
  margin-top: 50px;
`;
function Home() {
  const { events, loading  } = useEventContext();

  const handleFilterChange = (newFilters: Filters) => {
    console.log("New filters:", newFilters);
  };

  const eventsToDisplay = events.length > 0 ? events : [];

  return (
    <React.Fragment>
      <Hero
        title="Welcome to Event Go"
        subtitle="Search and discover events happening near you. Explore upcoming events, and find both free and paid experiences tailored to your location."
      />
      {/* <FilterSection onFilterChange={handleFilterChange} /> */}
      <EventListWrapper>
        {loading ? (
          <Spinner $size="15px" $gradient="var(--gradient-primary)" />
        ) : eventsToDisplay.length > 0 ? (
          eventsToDisplay.map(event => (
            <Card
              key={event.id}
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
    </React.Fragment>
  );
}

export default Home;
