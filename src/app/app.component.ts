import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from './document.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  visible = false;

  constructor( private router: Router, private documentServices: DocumentService ) { }
  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/home');
    this.visible = true;

     }

     gotoHome() {
       this.router.navigateByUrl('/login');
     }


  }





