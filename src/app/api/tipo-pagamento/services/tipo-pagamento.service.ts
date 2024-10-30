import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITipoPagamentoResponse } from '../dtos/responses/tipo-pagamento.response';

@Injectable({
  providedIn: 'root',
})
export class TipoPagamentoService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  obterTipoPagamento(): Observable<ITipoPagamentoResponse[]> {
    return this.http.get<ITipoPagamentoResponse[]>(
      `${this.apiUrl}/tipopagamento/`
    );
  }
}
