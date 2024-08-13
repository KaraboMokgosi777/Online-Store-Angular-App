import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl, NgModel, FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { user } from '../shared/users';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

export class AppModule { }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})

export class RegisterComponent{
  constructor(
    private DataService: DataService,
    private router: Router,
    private _snackBar: MatSnackBar,
    ) {}

  // ngOnInit(): void {
   
  // }
  registerUser(){
    const email = (<HTMLInputElement>document.getElementById('email')).value;
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const emailErr = (<HTMLInputElement>document.getElementById('emailErr'));
    const passErr =  (<HTMLInputElement>document.getElementById('passErr'));

    if(email == ""){
      emailErr.style.display = "block";
    }
    else if (password == ""){
      passErr.style.display = "block"; 
    }
    else{
      //add or register the user
      this.DataService.addUser(email, password,).subscribe(() => {
        this.router.navigate(['/login']);
        this._snackBar.open("Registered Successfully", "OK");
      });     
      emailErr.style.display = "none";
      passErr.style.display = "none"; 
    }  
  }
}
