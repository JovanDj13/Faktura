import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginView } from '../LoginView';
import { Headers } from '@angular/http';
import { AppComponent } from '../app.component';
import { DocumentService } from '../document.services';
import { DocumentComponent } from '../Document_component/document.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})

export class LoginFormComponent implements OnInit {

    constructor(
        private router: Router, private documentServices: DocumentService,
        private appComponent: AppComponent, private D_component: DocumentComponent) { }
    public tokenUrlh = 'http://localhost:17904/api/token';
    private loginView: LoginView = new LoginView();
    private response = new Response();
    public logout: string;
    private headers = new Headers({ 'Content-Type': 'application/json' });

    ngOnInit() {
        this.appComponent.visible = true;

    }

    gotoWelcome(): void {
        this.router.navigate(['/login']);
        this.appComponent.visible = false;
    }

    login(loginView: LoginView): void {
        if (this.chechFields(this.loginView)) {
            this.documentServices.openSnackBar('Popunite sva polja!', '');
        } else {
            this.documentServices.create(JSON.stringify(this.loginView), this.headers, this.tokenUrlh).catch((response: any) => {
                this.response = response;
                if (this.response.status === 400) {
                    this.documentServices.openSnackBar('Unesite ispravne podatke!', '');
                }
            })
                .then(r => {
                    sessionStorage.setItem('Token', 'bearer ' + r._body.slice(1, -1));
                    this.gotoWelcome();
                });
        }
    }

    chechFields(loginView: LoginView): boolean {
        if (loginView.userName == null || loginView.password == null) {
            return true;
        } else { return false; }
    }

    canActivate() { }
}
