import { Component, inject, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { RegisterModel } from '../_models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService);
  private toaster = inject(ToastrService);

  cancelRegister = output<boolean>();
  model: RegisterModel = {
    username: '',
    password: '',
  };
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    });
  }

  register() {
    if (!this.model.username || !this.model.password) {
      throw new Error('Username and password are required');
    }

    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log('-> register response: ', response);
        this.cancel();
      },
      error: (error) => this.toaster.error(error.error),
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
