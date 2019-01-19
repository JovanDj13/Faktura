import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Documents } from './Documents';
import 'rxjs/add/operator/filter';
@Injectable()
export class DocumentService {
    constructor(private http: Http, private ruter: ActivatedRoute, private ruterr: Router) { }

    public invoiceUrl = 'http://localhost:17904/api/values';

    _error = new FormControl('', [Validators.required]);

    headers: Headers;
    RequestOptions;
    openSnackBar(arg0: string, arg1: string): any {
        throw new Error('Method not implemented.');
    }
    getDocument(document_ID: number): Promise<any> {
        const url = `${this.invoiceUrl}/${document_ID}`;
        this.appendOptions(this.headers);
        return this.http.get(url, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    delete(document_ID: number): Promise<void> {
        const url = `${this.invoiceUrl}/${document_ID}`;
        this.appendOptions(this.headers);
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .catch(this.handleError);
    }
    getDocuments(invoiceUrl): Promise<any> {
        this.appendOptions(this.headers);
        return this.http.get(invoiceUrl, {headers: this.headers})
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    create(documents: any, headers, invoiceUrl): Promise<any> {
        this.appendOptions(this.headers);
        return this.http
            .post(invoiceUrl, documents, {headers: this.headers})
            .toPromise()
            .catch(this.handleError);
    }
    update(updDocument: Documents): Promise<Document> {
        const url = `${this.invoiceUrl}/${updDocument.document_ID}`;
        this.appendOptions(this.headers);
        return this.http
            .put(url, JSON.stringify(updDocument), {headers: this.headers})
            .toPromise()
            .then(() => updDocument)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);

    }
      appendOptions(headers: Headers) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Authorization', sessionStorage.getItem('Token'));
    }
}


