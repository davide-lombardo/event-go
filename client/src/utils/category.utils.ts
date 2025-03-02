import { EventCategory } from '../types/event.model';
import {
  ArtIcon,
  BusinessIcon,
  EducationIcon,
  HealthIcon,
  MusicIcon,
  SportsIcon,
  TechIcon,
} from './icons.utils';

export const categoryIcons: Record<EventCategory, JSX.Element> = {
  [EventCategory.Music]: MusicIcon,
  [EventCategory.Sports]: SportsIcon,
  [EventCategory.Tech]: TechIcon,
  [EventCategory.Art]: ArtIcon,
  [EventCategory.Education]: EducationIcon,
  [EventCategory.Health]: HealthIcon,
  [EventCategory.Business]: BusinessIcon,
};

export const categoryColors = {
  [EventCategory.Music]: 'var(--color-category-music)',
  [EventCategory.Sports]: 'var(--color-category-sports)',
  [EventCategory.Art]: 'var(--color-category-art)',
  [EventCategory.Education]: 'var(--color-category-education)',
  [EventCategory.Health]: 'var(--color-category-health)',
  [EventCategory.Business]: 'var(--color-category-business)',
  [EventCategory.Tech]: 'var(--color-category-tech)',
};
