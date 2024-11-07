import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [ProgressSpinnerModule, DialogModule],
  templateUrl: './loading.component.html',
  styleUrls: [],
})
export class LoadingComponent {}
