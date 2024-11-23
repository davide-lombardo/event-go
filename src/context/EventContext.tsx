import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EventData, EventFilters } from '../types/event.model';
import EventsService from '../services/events.service';

interface EventContextProps {
  events: EventData[];
  loading: boolean;
  fetchEvents: (filters?: EventFilters) => Promise<void>;
  addEvent: (event: EventData) => Promise<void>;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

// Initialize EventService
const eventsService = new EventsService();

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async (filters: EventFilters = { location: '', date: '' }) => {
    setLoading(true);
    try {
      console.log('Fetching events with filters:', filters);
      const fetchedEvents = await eventsService.getEvents(filters);
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (event: EventData) => {
    await eventsService.addEvent(event);
    await fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, fetchEvents, addEvent, loading }}>
      {children}
    </EventContext.Provider>
  );
};