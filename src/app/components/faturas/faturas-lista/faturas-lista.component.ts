import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FaturaService } from '../../../api/fatura/services/fatura.service';
import { IListarFaturasRequest } from '../../../api/fatura/dtos/requests/listar-faturas.request';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-faturas-lista',
  standalone: true,
  imports: [TableModule, TagModule],
  templateUrl: './faturas-lista.component.html',
  styleUrls: [],
})
export class FaturasListaComponent {
  listaFaturas: IListarFaturasRequest[] = [];

  constructor(private readonly faturaService: FaturaService) {}

  ngOnInit() {
    this.buscarFaturasAtuais();
  }

  buscarFaturasAtuais() {
    this.faturaService.buscarFaturasData(11, 2024).subscribe({
      next: (response) => {
        this.listaFaturas = response;
        this.listaFaturas;
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
