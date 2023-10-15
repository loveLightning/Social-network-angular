import { Component, Input } from '@angular/core';

type ButtonTypes = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
type PurposeTypes = 'submit' | 'button';
type SizeTypes = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text?: string;
  @Input() size: SizeTypes = 'md';
  @Input() purpose?: PurposeTypes = 'button';
  @Input() disabled? = false;
  @Input() label?: string | undefined;
  @Input() variant: ButtonTypes = 'primary';

  getStyles(): string {
    const colors = {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500'
    };

    const sizes = {
      lg: 'font-bold py-2 px-4 rounded',
      md: 'font-semibold py-1 px-3 rounded',
      sm: 'font-semibold py-0.5 px-2 rounded'
    };

    return `text-white inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
      colors[this.variant]
    } ${sizes[this.size]} `;
  }
}
