export interface Tuition {
  name?: string;
  lastName?: string;
  dni?: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  birthDate?: string;
  email: string;
  subjects?: {
    musicalLanguage: boolean;
    musicalGarden: boolean;
    choir: boolean;
    instrument: string; // Tipo de instrumento seleccionado
  };
}
