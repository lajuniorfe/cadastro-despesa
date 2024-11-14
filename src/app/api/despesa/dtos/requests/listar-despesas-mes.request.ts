import { Data } from '@angular/router';

export interface IListarDespesasMesRequest {
  descricao: string;
  pagamento: string;
  valor: number;
  data: Data;
  categoria: string;
  parcelas: number;
}
