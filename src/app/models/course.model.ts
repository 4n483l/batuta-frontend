import { Event } from './event.model';

export interface Course extends Event {
  subject: string;
  instrument: string;
  user: string;
  classroom: string;
}
