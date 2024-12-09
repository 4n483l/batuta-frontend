// URL del backend Laravel
const API_URL = 'http://127.0.0.1:8000/api';
const API_URL_PDF = 'http://127.0.0.1:8000/storage';

export const API_ROUTES = {
  auth: API_URL,
  navbar: `${API_URL}/navbar`,
  users: `${API_URL}/users`,
  students: `${API_URL}/students`,
  concerts: `${API_URL}/concerts`,
  rehearsals: `${API_URL}/rehearsals`,
  subjects: `${API_URL}/subjects`,
  instruments: `${API_URL}/instruments`,
  tuitions: `${API_URL}/tuitions`,
  exams: `${API_URL}/exams`,
  courses: `${API_URL}/courses`,
  notes: `${API_URL}/notes`,
  teacherSubjects: `${API_URL}/teacher/subjects`,
  teacherInstruments: `${API_URL}/teacher/instruments`,
  subjectInstrumet: `${API_URL}/notes/subjectInstrument`,
  pdf: `${API_URL_PDF}`,
};
