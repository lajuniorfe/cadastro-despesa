import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DespesaService } from '../../api/despesa/services/despesa.service';

@Component({
  selector: 'app-lista-gastos',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './lista-gastos.component.html',
  styleUrls: [],
})
export class ListaGastosComponent {
  listaGastos: any = [];

  constructor(private readonly despesaService: DespesaService) {}

  ngOnInit() {
    this.buscarListaDespesaMes();
  }

  buscarListaDespesaMes() {
    this.despesaService.obterListaDespesasMes(11, 2024).subscribe({
      next: (response) => {
        this.listaGastos = response;
      },
      error: (erro) => {
        console.log(erro);
      },
      complete: () => {},
    });
  }

  formatarData(dataString: string) {
    const data = new Date(dataString);

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).slice(-2);

    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  }
}
