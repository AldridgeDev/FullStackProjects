import { Component, OnInit } from '@angular/core';
import { Messages } from './messages.service';

@Component({
  selector: 'cms-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  providers: [Messages]
})
export class MessagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
