import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { User } from '../_models/user.model';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';
import { LikesService } from './likes.service';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  private likeService = inject(LikesService);
  private presenceService = inject(PresenceService);
  baseUrl = environment.apiUrl;
  user = signal<User | null>(null);
  roles = computed(() => {
    const user = this.user();
    if (user && user.token) {
      const role = JSON.parse(atob(user.token.split('.')[1])).role
      return Array.isArray(role) ? role : [role];
    }
    return [];
  });

  login(user: {username: string, password: string}) {
    return this.http.post<User>(this.baseUrl + 'account/login', user).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }
  
  register(user: {username: string, password: string}) {
    return this.http.post<User>(this.baseUrl + 'account/register', user).pipe(
      map(user => {
        if (user) {
          this.setCurrentUser(user);
        }
        return user;
      })
    );
  }
  
  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user.set(user);
    this.likeService.getLikeIds();
    this.presenceService.createHubConnection(user);
  }
  
  logout() {
    localStorage.removeItem('user');
    this.user.set(null);
    this.presenceService.stopHubConnection();
  }
}
