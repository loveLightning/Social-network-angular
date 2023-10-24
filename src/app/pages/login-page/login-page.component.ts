import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  aSub: Subscription;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  get inputs() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.snackbarService.open('Now you can sign in');
      } else if (params['accessDenied']) {
        this.snackbarService.open('The access is denied');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  onSubmit(): void {
    const loginInput = this.loginForm.value;

    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.disable();
    this.isLoading = true;

    this.authService.login(loginInput).subscribe({
      next: ({ data }) => {
        if (data?.login.accessToken) {
          this.storageService.setAccessToken(data?.login.accessToken);
        }

        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loginForm.enable();
        this.isLoading = false;
        this.snackbarService.open(err);
      }
    });
    this.isLoading = false;
  }
}
