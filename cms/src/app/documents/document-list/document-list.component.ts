import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  document: Document[]= [
    new Document(
    '001',
    'Shannon',
    'test description',
    'test url'),

    new Document(
    '002',
    'David',
    'test description',
    'test url'),

    new Document(
    '003',
    'Carol',
    'test description',
    'test url'),

    new Document(
    '004',
    'Julian',
    'test description',
    'test url'),
  ]

  constructor() { }

  ngOnInit() {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
