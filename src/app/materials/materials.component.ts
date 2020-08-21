import { Component, OnInit, ViewChild } from '@angular/core';
import { PeriodicElement } from '../shared/model/periodic-element.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { EditDialogComponent } from '../shared/modal/edit/edit.dialog.component';
import { AddDialogComponent } from '../shared/modal/add/add.dialog.component';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html'
})
export class MaterialsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
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

  constructor(private dialog: MatDialog) {
    this.myDataArray = new MatTableDataSource(JSON.parse(localStorage.elements));
  }

  /**
   * This function use a filter to find specific data
   * @param filterValue is the value to filter
   */
  applyFilter(filterValue: string): void {
    if (filterValue.length > 2) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.myDataArray.filter = filterValue;
    } else {
      this.myDataArray.filter = '';
    }
  }

  /**
   * Add a new element
   */
  addElement(): void {
    const dialogRef = this.dialog.open(AddDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.myDataArray = new MatTableDataSource(JSON.parse(localStorage.elements));
        this.myDataArray.paginator = this.paginator;
        this.myDataArray.paginator.lastPage();
      } else if (result === 'error') {
        alert('Etwas ist schiefgelaufen.');
      }
    });
  }

  editElement(id: number): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        id,
      }
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.myDataArray = new MatTableDataSource(JSON.parse(localStorage.elements));
        this.myDataArray.paginator = this.paginator;
      } else if (result === 'error') {
        alert('Etwas ist schiefgelaufen.');
      }
    });
  }

  /**
   * This function enable to sort and use the paginator at the same time.
   */
  setDataSourceAttributes(): void {
    this.myDataArray.paginator = this.paginator;
    this.myDataArray.sort = this.sort;
  }

  ngOnInit(): void {
    this.myDataArray.sort = this.sort;
  }
}
