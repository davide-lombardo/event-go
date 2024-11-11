import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { addEventToFirestore, getEventsFromFirestore } from '../config/firebase';
import { EventData } from '../types/event.model';

interface EventContextProps {
  events: EventData[];
  fetchEvents: () => Promise<void>;
  addEvent: (event: EventData) => Promise<void>;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventData[]>([]);

  const fetchEvents = async () => {
    const fetchedEvents = await getEventsFromFirestore();
    setEvents(fetchedEvents);
  };

  const addEvent = async (event: EventData) => {
    await addEventToFirestore(event);
    await fetchEvents(); // Re-fetch events after adding a new one
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, fetchEvents, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};