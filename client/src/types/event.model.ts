export interface EventData {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  link: string;
  userImage: string
  userName: string;
  eventDate: string;
  category: string;
}

export interface EventFilters {
  location: {
    searchText: string;
    lat: number;
    lng: number;
  };
  date: 'all' | 'today' | 'tomorrow' | 'weekend' | '';
  categories: EventCategory[];
}

export enum EventCategory {
  Music = 'Music',
  Sports = 'Sports',
  Tech = 'Tech',
  Art = 'Art',
  Education = 'Education',
  Health = 'Health',
  Business = 'Business',
}