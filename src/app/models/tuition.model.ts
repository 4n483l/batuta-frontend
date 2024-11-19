export interface Tuition {
  name?: string;
  lastName?: string;
  dni?: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  birthDate?: string;
  email: string;
  subjects: number[];
}

export interface Instrument {
  id: number;
  name: string;
  
}

export interface Subject {
  id: number;
  name: string;
  level: string;

}
