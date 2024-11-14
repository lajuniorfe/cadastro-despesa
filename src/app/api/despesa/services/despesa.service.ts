import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDespesaResponse } from '../dtos/responses/despesa.response';
import { IDespesaRequest } from '../dtos/requests/despesa.request';
import { environment } from '../../../../environments/environments';
import { IListarDespesasMesRequest } from '../dtos/requests/listar-despesas-mes.request';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  private readonly apiUrl = environment.apiUrl;
  private readonly apiUrlDados = environment.apiUrlDados;

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

  obterListaDespesasMes(
    mes: number,
    ano: number
  ): Observable<IListarDespesasMesRequest[]> {
    return this.http.get<IListarDespesasMesRequest[]>(
      `${this.apiUrlDados}/despesas/${mes}/${ano}`
    );
  }

  obterDadosGraficoDespesaCategoria(data: string): Observable<any> {
    const encodedData = encodeURIComponent(data);
    return this.http.get<any>(
      `${this.apiUrlDados}/despesas/grafico-categoria?data=${encodedData}`
    );
  }
}
