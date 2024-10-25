import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { ICategoriaResponse } from '../dtos/responses/categoria.responses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obterCategoriasDespesas(): Observable<ICategoriaResponse[]> {
    return this.http.get<ICategoriaResponse[]>(`${this.apiUrl}/categoria/`);
  }
}
