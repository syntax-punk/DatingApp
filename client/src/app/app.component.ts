import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  httpClient = inject(HttpClient);
  private accountService = inject(AccountService);

  title = 'DatingApp';
  users: any;

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString)
      return;

    const user = JSON.parse(userString) as User;
    this.accountService.currentUser.set(user);
  }

  getUsers() {
    this.httpClient.get('https://localhost:5001/api/users').subscribe({
      next: respose => this.users = respose,
      error: (error) => console.error(error),
      complete: () => console.log('Request completed')
    });
  }
}
