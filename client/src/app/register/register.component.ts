import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { RegisterModel } from '../_models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toaster = inject(ToastrService);

  cancelRegister = output<boolean>();
  model: RegisterModel = {
    username: '',
    password: '',
  };

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
