import { CartaoService } from './../../api/cartao/services/cartao.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DespesaService } from '../../api/despesa/services/despesa.service';
import { IDespesaResponse } from '../../api/despesa/dtos/responses/despesa.response';
import { IDespesaRequest } from '../../api/despesa/dtos/requests/IDespesasRequest';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ICartaoResponse } from '../../api/cartao/dtos/responses/cartao.response';
import { CategoriaService } from '../../api/categoria/services/categoria.service';
import { ICategoriaResponse } from '../../api/categoria/dtos/responses/categoria.responses';
import { TipoDespesaService } from '../../api/tipo-despesa/services/tipo-despesa.service';
import { ITipoDespesaResponse } from '../../api/tipo-despesa/dtos/responses/tipo-despesa.response';
import { TipoPagamentoService } from '../../api/tipo-pagamento/services/tipo-pagamento.service';
import { ITipoPagamentoResponse } from '../../api/tipo-pagamento/dtos/responses/tipo-pagamento.response';
import { CalendarModule } from 'primeng/calendar';
import { LoadingComponent } from '../loading/loading.component';
@Component({
  selector: 'app-cadastro-despesa',
  standalone: true,
  imports: [
    InputNumberModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FormsModule,
    ProgressSpinnerModule,
    CommonModule,
    ToastModule,
    CalendarModule,
    LoadingComponent,
  ],
  providers: [MessageService],
  templateUrl: './cadastro-despesa.component.html',
  styleUrls: [],
})
export class CadastroDespesaComponent {
  cadastroForm!: FormGroup;
  listaCategorias: ICategoriaResponse[] | undefined;
  listaTipoDespesa: ITipoDespesaResponse[] | undefined;
  listaPagamentos: ITipoPagamentoResponse[] | undefined;
  listaParcelas: any = [
    { quantidade: '1X', valor: 1 },
    { quantidade: '12X', valor: 12 },
  ];
  listaCartoes: ICartaoResponse[] | undefined;
  carregando: boolean = false;
  despesaCadastrar: IDespesaRequest | undefined;
  carregandoInformacoes: boolean = true;
  exibirOpcoesCartao: boolean = false;

  constructor(
    private readonly despesaServico: DespesaService,
    private messageService: MessageService,
    private cartaoService: CartaoService,
    private categoriaServico: CategoriaService,
    private tipoDespesaService: TipoDespesaService,
    private tipoPagamentoServico: TipoPagamentoService
  ) {}

  async ngOnInit() {
    this.iniciarFormulario();
    await this.buscarAtributosIniciais();
    this.carregandoInformacoes = false;
  }

  iniciarFormulario() {
    this.cadastroForm = new FormGroup({
      valor: new FormControl(),
      categoria: new FormControl(''),
      descricao: new FormControl(''),
      pagamento: new FormControl(''),
      parcela: new FormControl(''),
      cartao: new FormControl(''),
      tipoDespesa: new FormControl(''),
      data: new FormControl(''),
    });
  }

  async buscarAtributosIniciais(): Promise<void> {
    this.buscarListaCartao();
    this.buscarListaCategoria();
    this.buscarListaTipoDespesa();
    this.buscarListaTipoPagamento();
  }
  getPagamentoControl() {
    return this.cadastroForm.get('pagamento');
  }

  onPagamentoChange(pagamentoEscolhido: any) {
    if (pagamentoEscolhido.nome === 'Cartão de Crédito') {
      this.exibirOpcoesCartao = true;
    } else {
      this.exibirOpcoesCartao = false;
    }
  }
  cadastrarDespesa() {
    this.carregando = true;
    const request = this.montarDespesaRequest();

    this.despesaServico.cadastrarDespesa(request).subscribe({
      next: (response: IDespesaResponse) => {
        console.log('Despesa cadastrada com sucesso:', response);
      },
      error: (erro) => {
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao cadastrar despesa!',
        });

        console.error('Erro ao cadastrar despesa:', erro);
      },
      complete: () => {
        this.carregando = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Despesa Cadastrada!',
        });
        this.cadastroForm.reset();
        this.exibirOpcoesCartao = false;
      },
    });
  }

  buscarListaCartao() {
    this.cartaoService.buscarCartoes().subscribe({
      next: (response: ICartaoResponse[]) => {
        this.listaCartoes = response;
      },
      error: (erro) => {
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar cartões!',
        });
      },
    });
  }

  buscarListaCategoria() {
    this.categoriaServico.obterCategoriasDespesas().subscribe({
      next: (response: ICategoriaResponse[]) => {
        this.listaCategorias = response;
      },
      error: (erro) => {
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar categorias!',
        });
      },
    });
  }

  buscarListaTipoDespesa() {
    this.tipoDespesaService.obterTipoDespesa().subscribe({
      next: (response: ITipoDespesaResponse[]) => {
        this.listaTipoDespesa = response;
      },
      error: (erro) => {
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar tipo despesa!',
        });
      },
    });
  }

  buscarListaTipoPagamento() {
    this.tipoPagamentoServico.obterTipoPagamento().subscribe({
      next: (response: ITipoPagamentoResponse[]) => {
        this.listaPagamentos = response;
      },
      error: (erro) => {
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar tipo despesa!',
        });
      },
    });
  }

  buscarDespesa() {
    this.despesaServico.obterDespesas().subscribe({
      next: (response) => {
        console.log('retornado algo', response);
      },
      error: (erro) => {
        this.carregando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao cadastrar despesa!',
        });

        console.error('Erro ao cadastrar despesa:', erro);
      },
      complete: () => {
        this.carregando = false;
        console.log('Requisição concluída.');
      },
    });
  }

  montarDespesaRequest(): IDespesaRequest {
    this.despesaCadastrar = {
      idCategoria: this.cadastroForm.get('categoria')?.value.id,
      idTipoPagamento: this.cadastroForm.get('pagamento')?.value.id,
      idTipoDespesa: this.cadastroForm.get('tipoDespesa')?.value.id,
      descricao: this.cadastroForm.get('descricao')?.value,
      valor: this.cadastroForm.get('valor')?.value,
      idCartao: this.cadastroForm.get('cartao')?.value.id || null,
      parcela: this.cadastroForm.get('parcela')?.value.valor,
      data: new Date(this.cadastroForm.get('data')?.value).toISOString(),
    };

    return this.despesaCadastrar;
  }
}
