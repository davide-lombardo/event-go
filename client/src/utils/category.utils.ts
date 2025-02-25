import { EventCategory } from '../types/event.model';
import MusicIcon from '../assets/music.svg';
import HealthIcon from '../assets/heart.svg';
import TechIcon from '../assets/code.svg';
import BusinessIcon from '../assets/briefcase.svg';
import EducationIcon from '../assets/book-open.svg';
import ArtIcon from '../assets/image.svg';
import SportsIcon from '../assets/award.svg';


export const categoryIcons: Record<EventCategory, string> = {
  [EventCategory.Music]: MusicIcon,
  [EventCategory.Sports]: SportsIcon,
  [EventCategory.Tech]: TechIcon,
  [EventCategory.Art]: ArtIcon,
  [EventCategory.Education]: EducationIcon,
  [EventCategory.Health]: HealthIcon,
  [EventCategory.Business]: BusinessIcon,
};