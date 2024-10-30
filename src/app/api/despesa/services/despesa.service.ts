import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDespesaResponse } from '../dtos/responses/despesa.response';
import { IDespesaRequest } from '../dtos/requests/IDespesasRequest';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  obterDespesas(): Observable<IDespesaResponse[]> {
    return this.http.get<IDespesaResponse[]>(`${this.apiUrl}/despesa/`);
  }

  cadastrarDespesa(despesa: IDespesaRequest): Observable<IDespesaResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<IDespesaResponse>(
      `${this.apiUrl}/despesa/`,
      despesa,
      {
        headers,
      }
    );
  }
}
