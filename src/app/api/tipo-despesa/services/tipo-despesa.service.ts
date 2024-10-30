import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipoDespesaResponse } from '../dtos/responses/tipo-despesa.response';

@Injectable({
  providedIn: 'root',
})
export class TipoDespesaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  obterTipoDespesa(): Observable<ITipoDespesaResponse[]> {
    return this.http.get<ITipoDespesaResponse[]>(`${this.apiUrl}/tipodespesa/`);
  }
}
