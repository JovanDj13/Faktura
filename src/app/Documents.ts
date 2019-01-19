export class Documents {

    document_ID: number;
    documentDate: Date;
    documentNumber: number;
    sum: number;
    document_Details: Array<DocumentsDetails> = [];
    constructor() {
        this.document_ID = 0;
        this.documentDate = new Date();
        this.documentNumber = 0;
        this.sum = 0;
        this.document_Details = [];
    }
}

export class DocumentsDetails {

    document_Details_ID: number;
    document_ID: number;
    name: string;
    quantity: number;
    price: number;
    sum: number;
    ordinalNumber: number;

    constructor(document_ID = null) {
        this.document_Details_ID = 0;
        this.document_ID = document_ID;
        this.name = null;
        this.quantity = 0;
        this.price = 0;
        this.sum = 0;
        this.ordinalNumber = 0;
    }
}
