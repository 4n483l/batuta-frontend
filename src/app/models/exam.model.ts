import { Event } from './event.model';

export interface Exam extends Event {
  subject: string;
  teacher: string;
  classroom: string;
}
