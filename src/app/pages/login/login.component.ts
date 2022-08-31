import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: LoginService, private snack: MatSnackBar, private router: Router) { }

  loginData = {
    username: '',
    password: '',
  };

  ngOnInit(): void {
  }

  formSubmit() {
    console.log("Login button clicked");

    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open('Username is required..!!', '', {
        duration: 3000,
      });
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open('Password is required..!!', '', {
        duration: 3000,
      });
      return;
    }

    //Request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log("Success");
        console.log(data);

        //Login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            console.log(user);

            //Redirect  ...ADMIN: admin-dashboard
            //Redirect  ...NORMAL: normal-dashboard
            
            if (this.login.getUserRole() == "ADMIN") {
              //Admin Dashboard
              // window.location.href='/admin';
              this.router.navigate(['admin']);
              this.login.loginStatusSubject.next(true);
            } else if (this.login.getUserRole() == "NORMAL") {
              //Normal user-dashoboard
              // window.location.href='/user-dashboard';
              this.router.navigate(['user-dashboard']);
              this.login.loginStatusSubject.next(true);
            } else {
              this.login.logout();
            }
          });
      },
      (error) => {
        console.log("Error !");
        console.log(error);
        this.snack.open("Invalid Details !! Try again,", '', {
          duration: 3000,
        });
      }
    );
  }

}
