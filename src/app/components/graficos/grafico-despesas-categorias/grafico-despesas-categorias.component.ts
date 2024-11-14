import { Component } from '@angular/core';
import { DespesaService } from '../../../api/despesa/services/despesa.service';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-grafico-despesas-categorias',
  standalone: true,
  imports: [ChartModule, ButtonModule],
  templateUrl: './grafico-despesas-categorias.component.html',
  styleUrls: [],
})
export class GraficoDespesasCategoriasComponent {
  chartData: any;
  data: any;
  options: any;
  textColor: string = '#fff';
  constructor(private readonly despesaService: DespesaService) {}

  ngOnInit() {
    this.options = {
      plugins: {
        legend: {
          display: true,
          position: 'right',
          align: 'center',
          labels: {
            usePointStyle: true,
            color: this.textColor,
            font: {
              size: 14,
              weight: 'bold',
            },
            padding: 20,
          },
        },
      },
    };

    this.buscaDadosGraficoDespesaCategoria();
  }
  buscaDadosGraficoDespesaCategoria() {
    const currentDate = new Date();
    this.despesaService
      .obterDadosGraficoDespesaCategoria(this.formatarData(currentDate))
      .subscribe({
        next: (response) => {
          const backgroundColors = this.generateRandomColor();
          this.data = {
            labels: response.labels,
            datasets: [
              {
                data: response.values,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors,
              },
            ],
          };
        },
        error: (erro) => {},
        complete: () => {},
      });
  }

  formatarData(data: Date) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = String(data.getFullYear()).slice();
    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
  }

  generateRandomColor() {
    let colorArray: any[] = [
      '#FF6347', // Tom de vermelho
      '#32CD32', // Verde Lima
      '#EE82EE', // Violeta Claro
      '#FFD700', // Amarelo Ouro
      '#FFA500', // Laranja
      '#00BFFF', // Azul Claro
      '#FF1493', // Rosa Forte
      '#D2691E', // Tom de laranja mais suave
      '#FF4500', // Laranja Escuro
      '#9ACD32', // Verde Amarelado Claro
      '#00FA9A', // Verde Turquesa Claro
      '#FFFF00', // Amarelo Puro
      '#D8BFD8', // Lavanda Claro
      '#FF8C00', // Abóbora
      '#90EE90', // Verde Claro
      '#DA70D6', // Orquídea
      '#BA55D3', // Roxo Médio
      '#9370DB', // Roxo Claro
      '#8A2BE2', // Azul Violeta
      '#9400D3', // Violeta Escuro
      '#8B008B', // Magenta Escuro
      '#800080', // Roxo
      '#9B30FF', // Roxo Claro
      '#9932CC', // Roxo Escuro
      '#C71585', // Rosa Escuro
      '#FF00FF', // Magenta
      '#CD5C5C', // Tom de vermelho mais suave
      '#FF69B4', // Rosa Forte
      '#8B0000', // Vermelho Escuro
      '#A52A2A', // Marrom Vermelho
      '#800000', // Vermelho Escuro Puro
      '#FF6347', // Tom de vermelho mais suave
      '#FF4500', // Laranja Escuro
      '#FFD700', // Amarelo Ouro
      '#00FF7F', // Verde Limão Claro
      '#FF6347', // Tom de vermelho suave
      '#00FF7F', // Verde Claro
      '#FF1493', // Rosa Forte
      '#87CEEB', // Azul Céu Claro
    ];

    return colorArray;
  }
}
