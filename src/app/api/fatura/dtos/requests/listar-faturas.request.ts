import { Data } from '@angular/router';

export interface IListarFaturasRequest {
  nome: string;
  valor: number;
  data_vencimento: Data;
  id_cartao: number;
  status: boolean;
}
