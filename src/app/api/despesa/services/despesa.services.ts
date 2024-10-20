import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDespesaResponse } from '../dtos/responses/IDespesasResponse';
import { IDespesaRequest } from '../dtos/requests/IDespesasRequest';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  private readonly apiUrl = 'https://api.exemplo.com/pagamentos';

  constructor(private http: HttpClient) {}

  obterDespesas(): Observable<IDespesaResponse[]> {
    return this.http.get<IDespesaResponse[]>(this.apiUrl);
  }

  cadastrarDespesa(despesa: IDespesaRequest): Observable<IDespesaResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<IDespesaResponse>(this.apiUrl, despesa, { headers });
  }
}
