// URL del backend Laravel
const API_URL = 'http://127.0.0.1:8000/api';

export const API_ROUTES = {
  auth: API_URL,
  concerts: '${API_URL}/concerts',
  rehearsals: '${API_URL}/rehearsals',
  subjects: '${API_URL}/subjects',
  instruments: '${API_URL}/subjects/instruments',
  tuitions: '${API_URL}/tuitions',
  exams: '${API_URL}/exams',
  courses: '${API_URL}/courses',
  notes: '${API_URL}/notes',
};
