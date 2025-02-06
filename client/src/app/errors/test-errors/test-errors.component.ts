import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.css',
})
export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  private httpClient = inject(HttpClient);
  validationErrors: string[] = [];

  get400Error() {
    this.httpClient.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get401Error() {
    this.httpClient.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get404Error() {
    this.httpClient.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get500Error() {
    this.httpClient.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get400ValidationError() {
    this.httpClient.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
        this.validationErrors = error;
      },
    });
  }
}
