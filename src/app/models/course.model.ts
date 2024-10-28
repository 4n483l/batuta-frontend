import { Event } from './event.model';

export interface Course extends Event {
  subject: string;
  teacher: string;
  classroom: string;
}
