import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../shared/model/periodic-element.model';


declare function startDataTablejs(): any;

@Component({
  selector: 'app-data-table-js',
  templateUrl: './data-table-js.component.html'
})
export class DataTableJSComponent implements OnInit {

  elements: PeriodicElement = JSON.parse(localStorage.elements);

  constructor() {
  }

  showId(id: number): void {
    alert('ID: ' + this.elements[id - 1].position);
  }

  ngOnInit(): void {
    startDataTablejs();
  }

}
