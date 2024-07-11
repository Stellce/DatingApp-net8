import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user.model';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  user = signal<User | null>(null);

  login(user: {username: string, password: string}) {
    return this.http.post<User>(this.baseUrl + 'account/login', user).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.set(user);
        }
      })
    );
  }
  
  register(user: {username: string, password: string}) {
    return this.http.post<User>(this.baseUrl + 'account/register', user).pipe(
      map(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.set(user);
        }
        return user;
      })
    );
  }
  
  logout() {
    localStorage.removeItem('user');
    this.user.set(null);
  }
}
