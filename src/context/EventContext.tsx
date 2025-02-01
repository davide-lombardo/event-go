import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';
import { EventData, EventFilters } from '../types/event.model';
import EventsService from '../services/events.service';
import toast from 'react-hot-toast';

interface EventContextProps {
  events: EventData[];
  loading: boolean;
  fetchEvents: (filters?: EventFilters, page?: number, pageSize?: number) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  addEvent: (event: EventData) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;
  updateEvent: (updatedData: EventData) => Promise<void>;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
  
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

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
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<EventFilters>({ location: '', date: '' });

  const fetchEvents = async (
    filters: EventFilters = { location: '', date: '' },
    page: number = 1,
    pageSize: number = 10,
  ) => {
    setLoading(true);
    setFilters(filters);
    try {
      const { events: fetchedEvents, pagination } = await eventsService.getEvents(filters, page, pageSize);
      setEvents(fetchedEvents);
      setPagination(pagination);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchNextPage = useCallback(async () => {
    if (pagination.page < pagination.totalPages) {
      await fetchEvents(filters, pagination.page + 1, pagination.pageSize);
    }
  }, [fetchEvents, pagination]);

  const addEvent = async (event: EventData) => {
    await eventsService.addEvent(event);
    await fetchEvents();
  };

  const updateEvent = async (updatedData: EventData) => {
    try {
      await eventsService.updateEvent(updatedData);
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

  const contextValue = useMemo(() => ({
    events,
    loading,
    fetchEvents,
    fetchNextPage,
    pagination,
    addEvent,
    updateEvent,
    deleteEvent,
  }), [events, loading]);

  return (
    <EventContext.Provider
      value={contextValue}
    >
      {children}
    </EventContext.Provider>
  );
};
