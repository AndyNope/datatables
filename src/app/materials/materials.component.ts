import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { EditDialogComponent } from '../shared/modal/edit/edit.dialog.component';
import { AddDialogComponent } from '../shared/modal/add/add.dialog.component';
import { ElementService } from '../shared/services/element.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html'
})
export class MaterialsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'edit'];
  public myDataArray: MatTableDataSource<any>;
  private paginator: MatPaginator;
  private sort: MatSort;
  pageEvent: PageEvent;
  pageIndex = 1;
  pageSize = 5;
  length = 5;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  constructor(
    private dialog: MatDialog,
    private elementService: ElementService
  ) {
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

  /**
   * Edit element
   * @param id is to identify the corect element
   */
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
  public getServerData(event?: PageEvent): any {
    console.log(event);
    this.elementService.getElements(event).subscribe(
      response => {
        console.log(response);
        if (response.error) {
          // handle error
        } else {
          this.myDataArray = response.elements;
          this.pageIndex = response.pageIndex;
          this.pageSize = response.pageSize;
          this.length = response.length;
        }
      },
      error => {
        // handle error
      }
    );
    return event;
  }

  ngOnInit(): void {
    this.myDataArray.sort = this.sort;
    console.log();
  }
}
