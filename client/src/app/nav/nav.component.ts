import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

export type LoginModel = {
  username: string;
  password: string;
};

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private accountService = inject(AccountService);

  loggedIn = false;
  model: LoginModel = {
    username: '',
    password: ''
  };

  login() {
    console.log('got model -> ', this.model);

    this.accountService.login(this.model)
      .subscribe({
        next: response => {
          console.log('got response -> ', response);
          this.loggedIn = true;
        },
        error: (error) => {
          console.error(error);
        }
      });
  }
}
