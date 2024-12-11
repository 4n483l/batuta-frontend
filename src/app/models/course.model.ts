import { Event } from './event.model';
import { Subject } from './subject.model';
import { Instrument } from './instrument.model';

export interface Course extends Event {
  id: number;
  subject?: Subject | string | null;
  instrument?: Instrument | string | null;
  date: string;
  hour: string;
  classroom: string;
  user_id: string;
}

