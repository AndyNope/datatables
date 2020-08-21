import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../shared/model/periodic-element.model';


declare function startDataTablejs(): any;

@Component({
  selector: 'app-data-table-js',
  templateUrl: './data-table-js.component.html'
})
export class DataTableJSComponent implements OnInit {

  elements: PeriodicElement;

  constructor() {
    this.elements = JSON.parse(localStorage.elements);
  }

  ngOnInit(): void {
    setTimeout(() => {
      startDataTablejs();
    }, 0);
  }

}
