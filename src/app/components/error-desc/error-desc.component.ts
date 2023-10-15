import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-desc',
  templateUrl: './error-desc.component.html',
  styleUrls: []
})
export class ErrorDescComponent {
  @Input() messageError: string | null = null;
}
