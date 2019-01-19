import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatButtonModule, MatTableModule, MatIconModule } from '@angular/material';
import { DocumentService } from '../document.services';
import { LoaderService } from '../loader.services';
import { IconImportService } from 'mat-icon-import';
import { Documents } from '../Documents';
@Component({
  selector: 'app-component',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})

export class DocumentComponent implements OnInit {
  constructor(private http: Http, private documentService: DocumentService, private router: Router, private dialog: MatDialog,
  private _loaderService: LoaderService ) { }
  public path = 'http://localhost:17904/api/values';

  documents: Array<Documents> = new Array<Documents>();
  isDisabled = false;
  date = new Date();

  ngOnInit(): void {
    this.Get();

  }
  delete(document_ID: number): void {
    this.documentService.delete(document_ID).then(data => this.Get());
  }

 async Get() {
    await this.documentService.getDocuments(this.path).then(r => (this.documents = r)).then(e =>
      sessionStorage.getItem('Token') === e
      );
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/detail/' + id]);

  }
  gotoAdd(): void {
    this.router.navigate(['/add/']);
  }
  gotoEdit(id: number): void {
    this.router.navigate(['/edit/' + id]);
  }

}



