
export interface Tuition {
  firstName: string;
  lastName: string;
  birthDate: string;
  address: string;
  email: string;
  phone: string;
  subjects: {
    musicalLanguage: boolean;
    musicalGarden: boolean;
    choir: boolean;
    instrument: string;  // Tipo de instrumento seleccionado
  };
}
