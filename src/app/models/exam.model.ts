import { Event } from './event.model';

export interface Exam extends Event {
  id: number;
  subject?: string;
  instrument?: string;
  teacher?: string;
  date: string;
  hour: string;
  classroom: string;
}
