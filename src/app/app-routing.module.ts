import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './Login/login';
import { DocumentComponent } from './Document_component/document.component';
import { DocumentAllComponent } from './Document/documentall.component';
import { Enumform } from './enumform';
import { AuthGuard } from './authguard';

const routes: Routes = [
  {
    path: 'home',
    component: LoginFormComponent
},
{
    path: 'add',
    canActivate: [ AuthGuard ],
    component: DocumentAllComponent,
    data: {
        title: 'add',
        action: Enumform.Add
    }
},
{
    path: 'detail/:document_ID',
    canActivate: [ AuthGuard ],
    component: DocumentAllComponent,
    data: {
        title: 'det',
        action: Enumform.View
    }
},
{
    path: 'edit/:document_ID',
    canActivate: [ AuthGuard ],
    component: DocumentAllComponent,
    data: {
        title: 'edit',
        action: Enumform.Edit
    }
},

{
    path: 'login',
    canActivate: [ AuthGuard ],
    component: DocumentComponent
},

{
    path: 'form-all',
    component: DocumentAllComponent
},

 { path: '', redirectTo: '/home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
