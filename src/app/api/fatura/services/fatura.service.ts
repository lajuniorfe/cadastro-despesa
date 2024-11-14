import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListarFaturasRequest } from '../dtos/requests/listar-faturas.request';

@Injectable({
  providedIn: 'root',
})
export class FaturaService {
  private readonly apiUrl = environment.apiPython;

  constructor(private readonly http: HttpClient) {}

  buscarFaturasData(
    mes: number,
    ano: number
  ): Observable<IListarFaturasRequest[]> {
    return this.http.get<IListarFaturasRequest[]>(
      `${this.apiUrl}/faturas/${mes}/${ano}`
    );
  }
}