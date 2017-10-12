import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[]= [
    new Document(
    '001',
    'Shannon',
    'test description',
    'http://www.google.com'),

    new Document(
    '002',
    'David',
    'test description',
    'http://www.msn.com'),

    new Document(
    '003',
    'Carol',
    'test description',
    'http://www.lds.org'),

    new Document(
    '004',
    'Julian',
    'test description',
    'http://www.live.com')
  ]

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
