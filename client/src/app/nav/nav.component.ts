import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginModel } from '../_models/User';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  private router = inject(Router);
  private toaster = inject(ToastrService);

  accountService = inject(AccountService);

  model: LoginModel = {
    username: '',
    password: ''
  };

  login() {
    this.accountService.login(this.model)
      .subscribe({
        next: () => this.router.navigateByUrl('/members'),
        error: error => this.toaster.error(error.error)
      });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
