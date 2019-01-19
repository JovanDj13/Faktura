import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MatDialogModule, MatInputModule, MatButton, MatIconModule } from '@angular/material';
import { Enumform } from '../enumform';
import { DocumentService } from '../document.services';
import { Documents, DocumentsDetails } from '../Documents';

@Component({

    selector: 'app-all',
    styleUrls: ['documentall.component.css'],
    templateUrl: './documentall.component.html',
})

export class DocumentAllComponent implements OnInit {
    [x: string]: any;
    document: Documents = new Documents();
    newAttribute: any = {};
    documentDetails: DocumentsDetails = new DocumentsDetails();

    public documentUrl = 'http://localhost:17904/api/values';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    isDisabled = false;
    isHiddenSave = false;
    options: number;
    constructor(
        private documentService: DocumentService,
        private route: ActivatedRoute,
        private location: Location,
        private dialog: MatDialog,

    ) {
        if (<Enumform>this.route.snapshot.data['action'] === Enumform.Edit) { this.isDisabled = false; this.options = 1; }
        if (<Enumform>this.route.snapshot.data['action'] === Enumform.View) {
            this.isDisabled = true; this.isHiddenSave = true;
            this.options = 2;
        }
        if (<Enumform>this.route.snapshot.data['action'] === Enumform.Add) { this.isDisabled = false; this.options = 3; }

    }
    ngOnInit(): void {
        if (<Enumform>this.route.snapshot.data['action'] === Enumform.Edit) { this.fill(); }
        if (<Enumform>this.route.snapshot.data['action'] === Enumform.View) { this.fill(); }
    }

    addFieldValue() {
        this.document.document_Details.push(this.newAttribute);
        this.newAttribute.sum = this.newAttribute.price * this.newAttribute.quantity;
        this.document.sum = this.document.sum + this.newAttribute.sum;
        this.newAttribute = {};
    }

    deleteFieldValue(index) {
        this.document.document_Details.splice(index, 1);
    }

    optionsMethod(d: Documents): void {
        if (this.options === 1) { this.confirmEdit(d.document_ID); }
        if (this.options === 2) { this.visible = true; }
        if (this.options === 3) { this.confirmADD(); }
    }
    fill(): void {
        this.route.paramMap
            .switchMap((params: ParamMap) => this.documentService.getDocument(+params.get('document_ID')))
            .subscribe(document => this.document = document);
            this.document.document_Details.push(this.newAttribute);

    }

    add(): void {
            this.documentService.create(this.document, this.headers, this.documentUrl);
            console.log('dsad', this.document);
            this.document.document_Details.push(this.newAttribute);
    }
    goBack(): void {
        this.location.back();
    }
    load() {
        location.reload();
    }
}
