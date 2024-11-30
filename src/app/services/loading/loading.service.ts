// src/app/shared/loading.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.loadingSubject.asObservable();

  constructor() {}

  // Método para activar la carga
  setLoading(state: boolean): void {
    this.loadingSubject.next(state);
  }
}
