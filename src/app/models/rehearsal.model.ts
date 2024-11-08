import { Event } from './event.model';

export interface Rehearsal extends Event {
  id: number;
  place: string;
  date: string; // Formato ISO 8601 para la fecha
  hour: string;
}
