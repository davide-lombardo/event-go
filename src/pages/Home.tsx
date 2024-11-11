import * as React from 'react';

import styled from 'styled-components';
import Card from '../components/Card';
import FilterSection from '../components/FiltersSection';
import { Filters } from '../types/filters.model';
import { EventData } from '../types/event.model';
import Hero from '../components/Hero';
import { useEventContext } from '../context/EventContext';

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
  const { events } = useEventContext();

  const [filters, setFilters] = React.useState<Filters>({
    location: '',
    dateFilter: '',
  });

  const [filteredEvents, setFilteredEvents] = React.useState<EventData[]>(events); 

  const updateFilteredEvents = (newFilters: Filters) => {
    // Filter events based on the location and date filters
    const filtered = events.filter(eventData => {
      const matchesLocation =
        !newFilters.location ||
        eventData.location?.includes(newFilters.location);
      const matchesDate =
        !newFilters.dateFilter || checkEventDate(eventData, newFilters.dateFilter);

      return matchesLocation && matchesDate;
    });

    // Set filtered events in state
    setFilteredEvents(filtered);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    updateFilteredEvents(newFilters);
  };

  const checkEventDate = (event: EventData, dateFilter: Filters['dateFilter']) => {
    const eventDate = new Date(event.eventDate);
    
    // Set time to 00:00:00 for both today and tomorrow
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Reset to midnight
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);  // Set tomorrow's date
    tomorrow.setHours(0, 0, 0, 0);  // Reset to midnight
  
    // Helper function to check if two dates are the same, ignoring time
    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };
  
    console.log("Event date:", eventDate);
    console.log("Today:", today);
    console.log("Tomorrow:", tomorrow);
  
    // Compare event date with today's and tomorrow's date
    if (dateFilter === 'today') {
      return isSameDay(eventDate, today);
    }
    if (dateFilter === 'tomorrow') {
      return isSameDay(eventDate, tomorrow);
    }
    if (dateFilter === 'weekend') {
      return eventDate.getDay() === 6 || eventDate.getDay() === 0;  // Check if weekend (Saturday or Sunday)
    }
    return true;  // If no filter, return true for all dates
  };

  const eventsToDisplay = filteredEvents.length > 0 ? filteredEvents : events;
  console.log("Filtered events state:", filteredEvents);
  console.log("Events to display:", eventsToDisplay);  // Log events to display

  return (
    <React.Fragment>
      <Hero
        title="Welcome to Event Go"
        subtitle="Seach and discover events happening in your location"
      />
      <FilterSection onFilterChange={handleFilterChange} />
      <EventListWrapper>
        {eventsToDisplay.length > 0 ? (
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
