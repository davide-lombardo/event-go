import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { EventData, EventFilters } from '../types/event.model';
import EventsService from '../services/events.service';
import toast from 'react-hot-toast';

interface EventContextProps {
  events: EventData[];
  loading: boolean;
  fetchEvents: (filters?: EventFilters) => Promise<void>;
  addEvent: (event: EventData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateEvent: (updatedData: EventData) => Promise<void>;
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

export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async (
    filters: EventFilters = { location: '', date: '' }
  ) => {
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

  const updateEvent = async (updatedData: EventData) => {
    try {
      await eventsService.updateEvent(updatedData);
      toast.success('Event is successfully updated.');
      await fetchEvents();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await eventsService.deleteEvent(eventId);
      toast.success('Event is successfully deleted.');

      await fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        fetchEvents,
        addEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
