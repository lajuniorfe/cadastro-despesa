import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICartaoResponse } from '../dtos/responses/cartao.response';

@Injectable({
  providedIn: 'root',
})
export class CartaoService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  buscarCartoes(): Observable<ICartaoResponse[]> {
    return this.http.get<ICartaoResponse[]>(`${this.apiUrl}/cartao/`);
  }
}
