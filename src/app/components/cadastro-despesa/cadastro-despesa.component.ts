import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

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
  ],
  templateUrl: './cadastro-despesa.component.html',
  styleUrls: [],
})
export class CadastroDespesaComponent {
  cadastroForm!: FormGroup;
  listaCategorias: any = [{ nome: 'Lazer' }, { nome: 'Alimentação' }];
  listaPagamentos: any = [{ nome: 'Pix' }, { nome: 'Cartão de crédito' }];
  listaParcelas: any = [{ quantidade: 1 }, { quantidade: 12 }];

  ngOnInit() {
    this.cadastroForm = new FormGroup({
      value: new FormControl(0),
      categorias: new FormControl(''),
      descricao: new FormControl(''),
      pagamento: new FormControl(''),
      parcelas: new FormControl(''),
    });
  }
}
