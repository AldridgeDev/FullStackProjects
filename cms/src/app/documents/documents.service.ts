import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DocumentService {
  documents: Document[] = [];
  currentId: number;
  selectedDocumentEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: Http) {
    this.initDocuments();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (document === null || document === undefined) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    const documentsListClone: Document[]  = this.documents.slice();
    this.storeDocuments();
  }

  getMaxId() {
    let maxId: number = 0;
    for (let document of this.documents) {
      let currentId = +document.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(
    originalDocument: Document,
    newDocument: Document) {
    if (originalDocument === undefined ||
        originalDocument === null ||
        newDocument === undefined ||
        newDocument === null) {
          return;
        }

    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  initDocuments(){
    this.http.get('https://fullstackproject-366.firebaseio.com/documents.json')
      .map(
        (response:Response) => {
          const documentsReturned: Document[] = response.json();
          return documentsReturned;
        }
      )
      .subscribe(
        (documentsReturned: Document[]) => {
          this.documents = documentsReturned;
          this.maxDocumentId = this.getMaxId();
          const documentsListClone = this.documents.slice();
          this.documentListChangedEvent.next(documentsListClone);
        }
      );
  }

  storeDocuments(){
    const jsonDocs = JSON.stringify(this.documents);
    this.http.put('https://fullstackproject-366.firebaseio.com/documents.json', jsonDocs)
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  }
