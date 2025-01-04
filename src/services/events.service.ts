import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  QueryConstraint,
  deleteDoc,
  doc,
  updateDoc,
  startAfter,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { EventData, EventFilters } from '../types/event.model';

export default class EventsService {
  private eventsRef = collection(db, 'events');

  public async getEvents(
    filters: EventFilters,
    lastVisible: QueryDocumentSnapshot<DocumentData> | null = null,
    pageSize: number = 10
  ): Promise<{events: EventData[]; lastVisible: any}> {
    const { location, date } = filters;

    try {
      const queryConstraints: QueryConstraint[] = [];

      // Filter by location if provided
      if (location) {
        queryConstraints.push(where('location', '==', location.trim()));
      }

      // Filter by date range if provided and not "all"
      if (date && date !== 'all') {
        const now = new Date();
        const todayStart = new Date(now.setHours(0, 0, 0, 0));
        const tomorrowStart = new Date(
          todayStart.getTime() + 24 * 60 * 60 * 1000
        );
        const weekendStart = new Date(
          todayStart.getTime() + (5 - todayStart.getDay()) * 24 * 60 * 60 * 1000
        ); // Friday
        const weekendEnd = new Date(
          todayStart.getTime() + (7 - todayStart.getDay()) * 24 * 60 * 60 * 1000
        ); // Sunday

        if (date === 'today') {
          queryConstraints.push(
            where('eventDate', '>=', todayStart.toISOString())
          );
          queryConstraints.push(
            where('eventDate', '<', tomorrowStart.toISOString())
          );
        } else if (date === 'tomorrow') {
          queryConstraints.push(
            where('eventDate', '>=', tomorrowStart.toISOString())
          );
          queryConstraints.push(
            where(
              'eventDate',
              '<',
              new Date(
                tomorrowStart.getTime() + 24 * 60 * 60 * 1000
              ).toISOString()
            )
          );
        } else if (date === 'weekend') {
          queryConstraints.push(
            where('eventDate', '>=', weekendStart.toISOString())
          );
          queryConstraints.push(
            where('eventDate', '<=', weekendEnd.toISOString())
          );
        }
      }

      queryConstraints.push(orderBy('eventDate', 'asc'));

      if (lastVisible) {
        queryConstraints.push(startAfter(lastVisible));
      }

      queryConstraints.push(limit(pageSize));

      const eventsQuery = query(this.eventsRef, ...queryConstraints);
      const snapshot = await getDocs(eventsQuery);

      const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

      const events = snapshot.docs.map(doc => ({
        ...(doc.data() as EventData),
        id: doc.id,
      }));

      return {events, lastVisible: lastVisibleDoc};
    } catch (error) {
      console.error('Error filtering events:', error);
      throw error;
    }
  }

  /**
   *
   * @param event
   * @returns the event id
   */
  public async addEvent(eventData: EventData): Promise<void> {
    try {
      await addDoc(this.eventsRef, eventData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete an event by its ID.
   * @param eventId - The ID of the event to be deleted.
   * @returns A promise that resolves when the event is deleted.
   */
  public async deleteEvent(eventId: string): Promise<void> {
    try {
      // Get a reference to the event document
      const eventDocRef = doc(this.eventsRef, eventId);

      // Delete the event document
      await deleteDoc(eventDocRef);

      console.log(`Event with ID ${eventId} has been deleted.`);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  /**
   * Update an event by its ID.
   * @param eventId - The ID of the event to be updated.
   * @param eventData - The new data for the event.
   * @returns A promise that resolves when the event is updated.
   */
  // Assuming eventData is of type EventData
  public async updateEvent(eventData: EventData): Promise<void> {
    try {
      const { id } = eventData;
      const eventDocRef = doc(this.eventsRef, id);

      // Overwrite the document entirely
      await updateDoc(eventDocRef, { eventData });

      console.log(`Event with ID ${id} has been updated.`);
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }
}
