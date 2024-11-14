import { Routes } from '@angular/router';
import { CadastroDespesaComponent } from './components/cadastro-despesa/cadastro-despesa.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'cadastro',
    component: CadastroDespesaComponent,
  },
  { path: '**', redirectTo: '' },
];
