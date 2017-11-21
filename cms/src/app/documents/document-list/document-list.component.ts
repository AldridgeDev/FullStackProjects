import { Component, OnInit, EventEmitter, Output, Injectable, OnDestroy } from '@angular/core';
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
  private subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentList: Document[]) => {
          this.documents = documentList
        }
    );
}

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


}
