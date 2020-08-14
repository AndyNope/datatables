import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from './periodic-element.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html'
})
export class MaterialsComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Zathin', weight: 78, symbol: 'IV' },
    { position: 11, name: 'Bamity', weight: 81, symbol: 'Sr' },
    { position: 12, name: 'Voyatouch', weight: 57, symbol: 'III' },
    { position: 13, name: 'Zoolab', weight: 62, symbol: 'Jr' },
    { position: 14, name: 'Holdlamis', weight: 80, symbol: 'Jr' },
    { position: 15, name: 'Tres-Zap', weight: 89, symbol: 'Jr' },
    { position: 16, name: 'Sonair', weight: 95, symbol: 'II' },
    { position: 17, name: 'Fintone', weight: 84, symbol: 'Jr' },
    { position: 18, name: 'Solarbreeze', weight: 91, symbol: 'IV' },
    { position: 19, name: 'Tresom', weight: 42, symbol: 'II' },
    { position: 20, name: 'Fix San', weight: 22, symbol: 'IV' },
    { position: 21, name: 'Ronstring', weight: 81, symbol: 'IV' },
    { position: 22, name: 'Namfix', weight: 32, symbol: 'III' },
    { position: 23, name: 'Opela', weight: 11, symbol: 'Sr' },
    { position: 24, name: 'Bamity', weight: 22, symbol: 'III' },
    { position: 25, name: 'Zamit', weight: 6, symbol: 'Sr' },
    { position: 26, name: 'Kanlam', weight: 82, symbol: 'IV' },
    { position: 27, name: 'Bytecard', weight: 92, symbol: 'Sr' },
    { position: 28, name: 'Domainer', weight: 91, symbol: 'III' },
    { position: 29, name: 'Namfix', weight: 86, symbol: 'II' },
    { position: 30, name: 'Kanlam', weight: 27, symbol: 'IV' },
    { position: 31, name: 'Zoolab', weight: 41, symbol: 'Sr' },
    { position: 32, name: 'Span', weight: 38, symbol: 'II' }
  ];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  public myDataArray: MatTableDataSource<any>;

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor() {
    if (!localStorage) {
      localStorage.elements = JSON.stringify(this.ELEMENT_DATA);
    }
    this.myDataArray = new MatTableDataSource(JSON.parse(localStorage.elements));
  }

  setDataSourceAttributes(): void {
    this.myDataArray.paginator = this.paginator;
    this.myDataArray.sort = this.sort;
  }

  ngOnInit(): void {
    this.myDataArray.sort = this.sort;
  }
}
