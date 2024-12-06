



/*  getNotesData(): void {
    this.noteService.getNotes().subscribe((data: any) => {
      if (this.userType === 'teacher') {
        this.notes = data.Notes;
        this.isLoading = false;
      } else {
        console.log('Data asignaturas:', data.apuntesAsignaturas);

        // Iterar sobre las asignaturas de cada alumno
        for (let studentId in data.apuntesAsignaturas) {
          // Si quieres recorrer los apuntes de asignaturas para cada estudiante
          const apuntesAlumno = data.apuntesAsignaturas[studentId];

          apuntesAlumno.forEach((apunte: any) => {
            this.notes.push(apunte);
          });
        }
        for (let studentId in data.apuntesInstrumentos) {
          // Si quieres recorrer los apuntes de asignaturas para cada estudiante
          const apuntesAlumno = data.apuntesInstrumentos[studentId];

          apuntesAlumno.forEach((apunte: any) => {
            this.notes.push(apunte);
          });
        }

        this.isLoading = false;
      }

      console.log('Data notes:', data);
    });
  } */
