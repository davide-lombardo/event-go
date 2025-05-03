import { EventData, EventFilters } from '../types/event.model';
import axiosInstance from '../utils/axiosInstance';

export default class EventsService {
  public async getEvents(
    filters: EventFilters, 
    page: number = 1, 
    pageSize: number = 10
  ): Promise<{
    events: EventData[]; 
    pagination: {
      total: number;
      page: number;
      pageSize: number;
      totalPages: number;
    }
  }> {
    try {
      const response = await axiosInstance.get(`/api/events`, {
        params: {
          page,
          pageSize,
          location: filters.location || '',
          date: filters.date || 'all',
          categories: filters.categories || [],
        },
      });

      return {
        events: response.data.data,
        pagination: response.data.pagination
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  public async addEvent(eventData: EventData): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    try {
      await axiosInstance.post(`/api/events`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error adding event:', error);
      throw error;
    }
  }


  public async updateEvent(eventData: EventData): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    try {
      await axiosInstance.put(`/api/events/${eventData.id}`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  public async deleteEvent(eventId: string): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    try {
      await axiosInstance.delete(`/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }
}
