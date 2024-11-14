import { Component, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenuModule, ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class HeaderComponent {
  itensMenu: MenuItem[] = [];
  isCollapsed: boolean = false;
  @Output() exibicaoMenuLateral = new EventEmitter<boolean>();

  ngOnInit() {
    this.itensMenu = [
      {
        label: 'Home',
        icon: 'pi pi-plus',
        routerLink: '/',
      },
      {
        label: 'Sobre',
        icon: 'pi pi-plus',
        routerLink: '',
      },
      {
        label: 'Serviços',
        icon: 'pi pi-plus',
        routerLink: '',
      },
      {
        label: 'Contato',
        icon: 'pi pi-plus',
        routerLink: '',
      },
    ];
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.exibicaoMenuLateral.emit(this.isCollapsed);
  }
}
