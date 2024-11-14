import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { FaturasListaComponent } from '../../components/faturas/faturas-lista/faturas-lista.component';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ListaGastosComponent } from '../../components/lista-gastos/lista-gastos.component';
import { GraficoDespesasCategoriasComponent } from '../../components/graficos/grafico-despesas-categorias/grafico-despesas-categorias.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PanelModule,
    FaturasListaComponent,
    TagModule,
    ButtonModule,
    ListaGastosComponent,
    GraficoDespesasCategoriasComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: [],
})
export class DashboardComponent {
  despesaAtual: number = 8000;
  despesaPrevista: number = 5000;
  receita: number = 6500;
  saldo: number = 0;

  ngOnInit() {
    this.saldo = this.receita - this.despesaAtual;
  }
}
