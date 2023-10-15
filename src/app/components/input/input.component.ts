import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() formControl: FormControl;
  @Input() type: string;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() disabled: boolean;
}
