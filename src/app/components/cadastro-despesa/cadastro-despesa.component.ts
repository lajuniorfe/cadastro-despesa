import { Component } from '@angular/core';
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
import { DespesaService } from '../../api/despesa/services/despesa.services';
import { IDespesaResponse } from '../../api/despesa/dtos/responses/IDespesasResponse';
import { IDespesaRequest } from '../../api/despesa/dtos/requests/IDespesasRequest';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
  listaCategorias: any = [{ nome: 'Lazer' }, { nome: 'Alimentação' }];
  listaPagamentos: any = [{ nome: 'Pix' }, { nome: 'Cartão de crédito' }];
  listaParcelas: any = [{ quantidade: '1X' }, { quantidade: '12X' }];
  carregando: boolean = false;
  despesaCadastrar: IDespesaRequest = {
    descricao: '',
    valor: 0,
    categoria: '',
    formaPagamento: '',
  };
  exibir: boolean = false;

  constructor(
    private readonly despesaServico: DespesaService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.cadastroForm = new FormGroup({
      valor: new FormControl(0),
      categoria: new FormControl(''),
      descricao: new FormControl(''),
      pagamento: new FormControl(''),
      parcela: new FormControl(''),
    });
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
}
