import axios from 'axios';
import moxios from 'moxios';
import EventsService from '../../services/events.service';
import { EventData, EventCategory } from '../../types/event.model';

describe('EventsService', () => {
  const eventsService = new EventsService();

  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  // it('should fetch events', async () => {
  //   const filters: EventFilters = {
  //     location: { searchText: 'New York', lat: 40.7128, lng: -74.0060 },
  //     date: 'all',
  //     categories: [EventCategory.Music],
  //   };
  //   const page = 1;
  //   const pageSize = 10;

  //   const mockResponse = {
  //     data: {
  //       data: [
  //         {
  //           id: '1',
  //           name: 'Event 1',
  //           location: 'New York',
  //           latitude: 40.7128,
  //           longitude: -74.0060,
  //           description: 'Event 1 description',
  //           link: 'http://event1.com',
  //           paid: false,
  //           userImage: 'http://user1.image',
  //           userName: 'User 1',
  //           eventDate: '2023-10-01T10:00:00Z',
  //           category: EventCategory.Music,
  //         },
  //         {
  //           id: '2',
  //           name: 'Event 2',
  //           location: 'New York',
  //           latitude: 40.7128,
  //           longitude: -74.0060,
  //           description: 'Event 2 description',
  //           link: 'http://event2.com',
  //           paid: true,
  //           userImage: 'http://user2.image',
  //           userName: 'User 2',
  //           eventDate: '2023-10-01T14:00:00Z',
  //           category: EventCategory.Music,
  //         },
  //       ],
  //       pagination: {
  //         total: 2,
  //         page: 1,
  //         pageSize: 10,
  //         totalPages: 1,
  //       },
  //     },
  //   };

  //   moxios.stubRequest(`${eventsService['apiUrl']}/api/events`, {
  //     status: 200,
  //     response: mockResponse,
  //   });

  //   const result = await eventsService.getEvents(filters, page, pageSize);

  //   expect(result.events).toHaveLength(2);
  //   expect(result.pagination.total).toBe(2);
  // }, 20000);

  // it('should add an event', async () => {
  //   const eventData: EventData = {
  //     id: '3',
  //     name: 'Event 3',
  //     location: 'Los Angeles',
  //     latitude: 34.0522,
  //     longitude: -118.2437,
  //     description: 'Event 3 description',
  //     link: 'http://event3.com',
  //     paid: true,
  //     userImage: 'http://user3.image',
  //     userName: 'User 3',
  //     eventDate: '2023-10-02T10:00:00Z',
  //     category: EventCategory.Sports,
  //   };
  //   const token = 'fake-token';

  //   vi.spyOn(localStorage, 'getItem').mockReturnValue(token);

  //   moxios.stubRequest(`${eventsService['apiUrl']}/api/events`, {
  //     status: 201,
  //     response: {},
  //   });

  //   await eventsService.addEvent(eventData);

  //   const request = moxios.requests.mostRecent();
  //   expect(request.config.headers?.Authorization).toBe(`Bearer ${token}`);
  // });

  // it('should update an event', async () => {
  //   const eventData: EventData = {
  //     id: '1',
  //     name: 'Updated Event',
  //     location: 'New York',
  //     latitude: 40.7128,
  //     longitude: -74.0060,
  //     description: 'Updated Event description',
  //     link: 'http://updatedevent.com',
  //     paid: false,
  //     userImage: 'http://updateduser.image',
  //     userName: 'Updated User',
  //     eventDate: '2023-10-01T10:00:00Z',
  //     category: EventCategory.Music,
  //   };
  //   const token = 'fake-token';

  //   vi.spyOn(localStorage, 'getItem').mockReturnValue(token);

  //   moxios.stubRequest(`${eventsService['apiUrl']}/api/events/1`, {
  //     status: 200,
  //     response: {},
  //   });

  //   await eventsService.updateEvent(eventData);

  //   const request = moxios.requests.mostRecent();
  //   expect(request.config.headers?.Authorization).toBe(`Bearer ${token}`);
  // });

  // it('should delete an event', async () => {
  //   const eventId = '1';
  //   const token = 'fake-token';

  //   vi.spyOn(localStorage, 'getItem').mockReturnValue(token);

  //   moxios.stubRequest(`${eventsService['apiUrl']}/api/events/1`, {
  //     status: 204,
  //     response: {},
  //   });

  //   await eventsService.deleteEvent(eventId);

  //   const request = moxios.requests.mostRecent();
  //   expect(request.config.headers?.Authorization).toBe(`Bearer ${token}`);
  // });

  it('should throw an error if no token is found', async () => {
    const eventData: EventData = {
      id: '1',
      name: 'Event 1',
      location: 'New York',
      latitude: 40.7128,
      longitude: -74.0060,
      description: 'Event 1 description',
      link: 'http://event1.com',
      paid: false,
      userImage: 'http://user1.image',
      userName: 'User 1',
      eventDate: '2023-10-01T10:00:00Z',
      category: EventCategory.Music,
    };

    vi.spyOn(localStorage, 'getItem').mockReturnValue(null);

    await expect(eventsService.addEvent(eventData)).rejects.toThrow('No token found');
    await expect(eventsService.updateEvent(eventData)).rejects.toThrow('No token found');
    await expect(eventsService.deleteEvent('1')).rejects.toThrow('No token found');
  });
});
