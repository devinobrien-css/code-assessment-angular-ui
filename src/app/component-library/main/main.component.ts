import { Component } from '@angular/core';
import { DateBoxComponent } from '../../shared/components/date-box/date-box.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [DateBoxComponent],
  templateUrl: './main.component.html',
})
export class MainComponent {}
