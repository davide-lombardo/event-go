import {
  collection,
  DocumentData,
  query,
  where,
  DocumentReference,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { EventData, EventFilters } from '../types/event.model';

export default class EventsService {
  private eventsRef = collection(db, 'events');
       
  getEventsFromFirestore = async (): Promise<EventData[]> => {
    try {
      const eventsCollection = collection(db, 'events');
      const snapshot = await getDocs(eventsCollection);

      // Map through documents, casting each document's data as EventData
      const eventsList = snapshot.docs.map(doc => ({
        ...(doc.data() as EventData),
        id: doc.id,
      }));
      return eventsList;
    } catch (error) {
      console.error('Error retrieving events:', error);
      return [];
    }
  };

  /**
   * Performs query and return a list of events
   * @param filters
   * @returns
   */
  public async getEvents(filters: EventFilters): Promise<EventData[]> {
    const { location, date } = filters;

    try {

      const eventsQueryClauses = [
        where('location', '==', location.toLowerCase()),
      ];
      const eventsQuery = query(this.eventsRef, ...eventsQueryClauses);
      const eventsQuerySnapshot = await getDocs(eventsQuery);

      const filteredEventsRefs: DocumentReference<DocumentData>[] = [];

      eventsQuerySnapshot.forEach(async document => {
        // const event = { ...(document.data() as EventData), id: document.id };

        if (date) {
          // const isOpenInRequiredDates = getDaysArray(dateStart, dateEnd).every(
          //   (day) => {
          //     if (!requiredTimeSlot)
          //       return openingDays[getWeekDayName(day, "it-IT")].length > 0;
          //     else {
          //       return isRequiredSlotCompatibleWithOpeningTime(
          //         day,
          //         requiredTimeSlot,
          //         openingDays
          //       );
          //     }
          //   }
          // );

          // isOpenInRequiredDates && filteredEventsRefs.push(document.ref);
          filteredEventsRefs.push(document.ref);
        } else {
          filteredEventsRefs.push(document.ref);
        }
      });

      let availableEvents: EventData[] = [];

      return availableEvents;
    } catch (error) {
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
}
