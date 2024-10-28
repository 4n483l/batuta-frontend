// src/app/models/event.model.ts
export interface Event {
    id: number;
    date: string; // formato: "YYYY-MM-DD"
    hour: string;
    place?: string; // Propiedad opcional
}
