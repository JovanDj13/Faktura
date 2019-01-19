// AuthGuard
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DocumentService } from './document.services';

@Injectable()
export class AuthGuard implements CanActivate {
constructor(private router: Router,  private documentService: DocumentService) {}

canActivate(
next: ActivatedRouteSnapshot,
state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> |
boolean {
    if (sessionStorage.getItem('Token')) {
        return true;
   } else {
       this.router.navigateByUrl('/home');
      this.documentService.openSnackBar('Please Login to Continue', '');
   }
}
}
