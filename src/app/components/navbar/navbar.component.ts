import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = null;

  constructor(public login: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data: any)=>{
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    })
  }

  public logout()
  {
    this.login.logout();
    window.location.reload();
    // this.login.loginStatusSubject.next(false);
  }

}
