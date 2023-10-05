import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private auth: AuthService,private router:Router) {}
  error:string=''
  isEmail = true;
  formOp(authFrom: NgForm) {
    let email = authFrom.value.email;
    let password = authFrom.value.password;
    this.auth.login(email,password).subscribe()
  }
}
