export interface EventData {
  id: string;
  name: string;
  location: string;
  description: string;
  link: string;
  tags: string[];
  paid: boolean;
  userImage: string
  userName: string;
  eventDate: string;
}

export interface EventFilters {
  location: string;
  date: 'all' | 'today' | 'tomorrow' | 'weekend' | '';
}