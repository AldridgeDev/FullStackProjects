import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() selectedFeature = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(selectedEvent: string) {
    this.selectedFeature.emit(selectedEvent);
  }

}
