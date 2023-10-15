import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    public errorService: ErrorService
  ) {}

  get inputs() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required
      ]),
      fullname: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  onSubmit(): void {
    const registerInput = this.registerForm.value;

    console.log(this.registerForm.controls.fullname.errors);
    if (this.registerForm.valid) {
      this.authService.register(registerInput).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          this.errorService.handle(err);
          console.log(err);
        }
      });
    }
  }
}
