import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { User } from './_models/User';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  imports: [NavComponent, HomeComponent],
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
