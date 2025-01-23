import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginModel } from '../_models/User';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);

  model: LoginModel = {
    username: '',
    password: ''
  };

  login() {
    this.accountService.login(this.model)
      .subscribe({
        next: response => {
          console.log('got response -> ', response);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  logout() {
    this.accountService.logout();
  }
}
