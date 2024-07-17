import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    this.http.get('/api/account/current-user').subscribe((response) => {
      // console.log(response)
    });
  }
}
