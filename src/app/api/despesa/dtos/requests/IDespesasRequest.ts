import { ICartaoRequest } from '../../../cartao/dtos/requests/cartao.request';
import { ICategoriaRequest } from '../../../categoria/dtos/requests/categoria.request';
import { ITipoDespesaRequest } from '../../../tipo-despesa/dtos/requests/tipo-despesa.request';
import { TipoPagamamentoRequest } from '../../../tipo-pagamento/dtos/requests/tipo-pagamento.request';

export interface IDespesaRequest {
  Descricao: string;
  Valor: number;
  Categoria: ICategoriaRequest;
  TipoPagamento: TipoPagamamentoRequest;
  TipoDespesa: ITipoDespesaRequest;
  Cartao: ICartaoRequest;
  Parcela: number;
}
