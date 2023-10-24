import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  aSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
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

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(): void {
    const registerInput = this.registerForm.value;

    if (this.registerForm.invalid) {
      return;
    }

    this.registerForm.disable();

    this.aSub = this.authService.register(registerInput).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        });
      },
      error: (err) => {
        console.log(err);

        this.snackbarService.open(err);
        this.registerForm.enable();
      }
    });
  }
}
