import { Component, OnInit, EventEmitter, Output, Injectable } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../documents.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  private subscription: Subscription; //check

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      )
  }

}
