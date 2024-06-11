import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private dataService: DataService, private _snackBar: MatSnackBar) { }

  // ngOnInit(): void {
  // }

  Login() {
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const errMessage = (<HTMLInputElement>document.getElementById('LoginErr'));

    this.dataService.Login(email, password).subscribe((result: any) =>
      localStorage.setItem('Token', JSON.stringify(result))
    )

    setTimeout(() => {
      var token = localStorage.getItem("Token");
      if (token) {
        var obj = JSON.parse(token);
        var myuser = obj.user

        if (email == myuser) {
          this.router.navigate(['/store']);
          
        }
        else {
          errMessage.innerHTML = 'Incorrect email / password!';
        }
      }
      else {
        errMessage.innerHTML = 'Invalid Login or email!';
      }
    }, 2000);

  }
}
