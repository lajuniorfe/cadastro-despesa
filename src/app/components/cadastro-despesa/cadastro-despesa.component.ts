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
  ],
  providers: [MessageService],
  templateUrl: './cadastro-despesa.component.html',
  styleUrls: [],
})
export class CadastroDespesaComponent {
  cadastroForm!: FormGroup;
  listaCategorias: ICategoriaResponse[] | undefined;
  listaTipoDespesa: ITipoDespesaResponse[] | undefined;
  listaPagamentos: any = [{ nome: 'Pix' }, { nome: 'Cartão de crédito' }];
  listaParcelas: any = [{ quantidade: '1X' }, { quantidade: '12X' }];
  listaCartoes: ICartaoResponse[] | undefined;
  carregando: boolean = false;
  despesaCadastrar: IDespesaRequest = {
    descricao: '',
    valor: 0,
    categoria: '',
    formaPagamento: '',
  };
  exibir: boolean = false;
  exibirOpcoesCartao: boolean = false;

  constructor(
    private readonly despesaServico: DespesaService,
    private messageService: MessageService,
    private cartaoService: CartaoService,
    private categoriaServico: CategoriaService,
    private tipoDespesaService: TipoDespesaService
  ) {}

  ngOnInit() {
    this.iniciarFormulario();
    this.buscarAtributosIniciais();
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
    });
  }

  buscarAtributosIniciais() {
    this.buscarListaCartao();
    this.buscarListaCategoria();
    this.buscarListaTipoDespesa();
  }
  getPagamentoControl() {
    return this.cadastroForm.get('pagamento');
  }

  onPagamentoChange(algo: any) {
    if (algo.value.nome === 'Cartão de crédito') {
      this.exibirOpcoesCartao = true;
    } else {
      this.exibirOpcoesCartao = false;
    }
  }
  cadastrarDespesa() {
    this.despesaCadastrar.categoria =
      this.cadastroForm.get('categoria')?.value.nome;

    this.despesaCadastrar.formaPagamento =
      this.cadastroForm.get('pagamento')?.value.nome;

    this.despesaCadastrar.descricao = this.cadastroForm.get('descricao')?.value;

    this.despesaCadastrar.valor = this.cadastroForm.get('valor')?.value;

    this.carregando = true;

    this.despesaServico.cadastrarDespesa(this.despesaCadastrar).subscribe({
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
        console.log('Requisição concluída.');
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
}
