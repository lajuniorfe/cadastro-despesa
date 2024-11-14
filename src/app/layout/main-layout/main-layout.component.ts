import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ButtonModule, RouterOutlet, MenuModule, HeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: [],
})
export class MainLayoutComponent {
  isCollapsed: boolean = false;
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'New', icon: 'pi pi-plus' },
      { label: 'Search', icon: 'pi pi-search' },
      {
        label: 'Incluir Despesa',
        icon: 'pi pi-plus',
        routerLink: 'cadastro',
      },
      { label: 'Cadastrar Cartão', icon: 'pi pi-plus' },
      { label: 'Cadastrar Categoria', icon: 'pi pi-plus' },
    ];
  }

  toggleSidebar(evento: boolean) {
    this.isCollapsed = evento;
  }
}
