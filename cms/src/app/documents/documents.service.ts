import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class DocumentService {
  documents: Document[] = [];
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
    this.documentChangedEvent.emit(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;
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

    const pos = this.documents.indexOf(newDocument);
    if (pos < 0) {
      return;
    }
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
          this.documentListChangedEvent.next(this.documents.slice());
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
