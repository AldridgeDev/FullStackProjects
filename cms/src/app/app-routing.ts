import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';;
import { MessagesComponent } from './messages/messages.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';

const app_Routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full'},
  { path: 'documents', component: DocumentsComponent, children: [
    { path: 'new', component: DocumentEditComponent},
    { path: ':id', component: DocumentDetailComponent},
    { path: ':id/edit', component: DocumentEditComponent}
  ] },
  { path: 'messages', component: MessagesComponent },
  { path: 'contacts', component: ContactsComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(app_Routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
