import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroDespesaComponent } from './components/cadastro-despesa/cadastro-despesa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CadastroDespesaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cadatro-despesa';
}
