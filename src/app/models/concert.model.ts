
import { Event } from './event.model';

export interface Concert extends Event {
  id: number;
  title: string;
  place: string;
  date: string; // Formato ISO 8601 para la fecha
  hour: string;
}
