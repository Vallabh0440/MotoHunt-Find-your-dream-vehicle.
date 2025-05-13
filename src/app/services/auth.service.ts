import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  setUserr(arg0: null) {
    throw new Error('Method not implemented.');
  }
    
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

//   Update login state
  login(username: string) {
    this.loggedInSubject.next(true);
    this.userSubject.next( username );
  }

  setLoggedIn(value: boolean) {
    this.loggedInSubject.next(value);
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  // Update logout state
  logout() {
    this.loggedInSubject.next(false);
    this.userSubject.next(null);
  }
}
