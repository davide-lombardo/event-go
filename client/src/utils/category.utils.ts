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

export const categoryColorPalette = {
  [EventCategory.Music]: {
    base: 'var(--color-category-music)',
    light: 'var(--color-category-music-light)',
    dark: 'var(--color-category-music-dark)',
  },
  [EventCategory.Sports]: {
    base: 'var(--color-category-sports)',
    light: 'var(--color-category-sports-light)',
    dark: 'var(--color-category-sports-dark)',
  },
  [EventCategory.Art]: {
    base: 'var(--color-category-art)',
    light: 'var(--color-category-art-light)',
    dark: 'var(--color-category-art-dark)',
  },
  [EventCategory.Education]: {
    base: 'var(--color-category-education)',
    light: 'var(--color-category-education-light)',
    dark: 'var(--color-category-education-dark)',
  },
  [EventCategory.Health]: {
    base: 'var(--color-category-health)',
    light: 'var(--color-category-health-light)',
    dark: 'var(--color-category-health-dark)',
  },
  [EventCategory.Business]: {
    base: 'var(--color-category-business)',
    light: 'var(--color-category-business-light)',
    dark: 'var(--color-category-business-dark)',
  },
  [EventCategory.Tech]: {
    base: 'var(--color-category-tech)',
    light: 'var(--color-category-tech-light)',
    dark: 'var(--color-category-tech-dark)',
  },
};
