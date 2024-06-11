import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { title } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = "INF354Assignment3";
  @ViewChild('sidenav', {static:true}) sidenav!: MatSidenav;

  toggleSidenav(){
    this.sidenav.toggle();
  }

}
