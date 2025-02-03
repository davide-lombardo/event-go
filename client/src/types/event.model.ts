export interface EventData {
  id: string;
  name: string;
  location: string;
  description: string;
  link: string;
  paid: boolean;
  userImage: string
  userName: string;
  eventDate: string;
  category: string;
}

export interface EventFilters {
  location: string;
  date: 'all' | 'today' | 'tomorrow' | 'weekend' | '';
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