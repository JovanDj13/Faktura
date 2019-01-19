import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentService } from './document.services';
import {HttpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogRef, MatDialogModule,
  MatButtonModule, MatInputModule, MatButton, MatIconModule, MatSnackBarModule, MatPaginatorModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoaderService } from './loader.services';
import { LoginFormComponent } from './Login/login';
import { DocumentComponent } from './Document_component/document.component';
import { DocumentAllComponent } from './Document/documentall.component';
import { AuthGuard } from './authguard';
import { DocumentsPipe } from './pipe';
import { ComponentFixture } from '@angular/core/testing';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    DocumentAllComponent,
    DocumentComponent,
    DocumentsPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MatPaginatorModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    DocumentService,
    LoaderService,
    DocumentComponent,
    AuthGuard
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
