import { Component, OnInit, ViewChild, HostListener, ElementRef, ViewContainerRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PeriodicElement } from '../shared/model/periodic-element.model';
import { ElementService } from '../shared/services/element.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  filteredDatas: PeriodicElement[];
  public dataSource: MatTableDataSource<PeriodicElement>;
  public elementsStore = this.dataSource;
  public innerWidth: number = Math.round(window.innerWidth);
  public innerHeight: number = Math.round(window.innerHeight);
  fragment: PeriodicElement[];
  filter = '';
  filtermax = 0;
  start: number;
  end: number;
  private sort: MatSort;

  @ViewChild('table-container', { read: ViewContainerRef }) tableContainer: ElementRef;

  constructor(private elementService: ElementService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.initData();
  }

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes(): void {
    if (this.dataSource !== undefined) {
      this.dataSource.sort = this.sort;
    }
  }

  scroll(x: number, y: number): void {
    console.log('scrollTop');
    document.querySelector('#table-container').scrollTo(0, 0);
  }

  /**
   * Check on Scroll if it's on limit
   * @param e wait for a scroll action
   */
  onTableScroll(e: { target: { offsetHeight: any; scrollHeight: any; scrollTop: any; }; }): void {
    const tableViewHeight = e.target.offsetHeight; // viewport
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const buffer = 10;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    // console.log(this.tableContainer.nativeElement.value);
    if (Math.round(scrollLocation) > limit) {
      let loadedData: any[];
      let data = this.dataSource.data;
      if (this.filter.length > 2) {
        data = this.filteredDatas;
        loadedData = this.getTableDataFiltered(this.start, this.end);
        if (data.length > this.filtermax) {
          data.push(loadedData[0]);
        }
      } else {
        data = this.dataSource.data;
        console.log('Start: ' + this.start);
        loadedData = this.getTableData(this.start, this.end);
        if (loadedData !== undefined) {
          loadedData.forEach(element => {
            console.log(element);
            data.push(element);
            this.dataSource = new MatTableDataSource(data);
          });
        }
      }
      this.setDataSourceAttributes();
      this.updateIndex();
    }
  }

  /**
   * Get this Array range
   * @param start Start of the Range
   * @param end End of the Range
   */
  getTableData(start: number, end: number): any {
    this.elementService.getElementsFragment(this.start, this.end).subscribe(
      response => {
        // console.log(response);
        if (response.error) {
          // handle error
        } else {
          this.fragment = response;
        }
      },
      error => {
        // handle error
      }
    );
    return this.fragment;
  }

  /**
   * Get range of filtered array
   * @param start Start of the Range
   * @param end End of the Range
   */
  getTableDataFiltered(start: number, end: number): any {
    return this.filteredDatas.filter((value, index) => index >= start && index < end);
  }

  /**
   * set the next range
   */
  updateIndex(): void {
    console.log('updated');
    this.start = this.end;
    this.end = this.start + 20;
  }

  /**
   * Show the id of an element
   * @param id is the id of the element
   */
  showId(id: number): void {
    alert(this.dataSource.data[id - 1].position);
  }

  /**
   * This function use a filter to find specific data
   * @param filterValue is the value to filter
   */
  applyFilter(filterValue: string): void {
    this.filter = filterValue;
    console.log(this.filter.length);
    if (this.filter.length > 2) {
      this.elementsStore = this.dataSource;
      this.filter = this.filter.trim(); // Remove whitespace
      this.filter = this.filter.toLowerCase(); // Datasource defaults to lowercase matches
      const toFilter = new MatTableDataSource(this.fragment);
      toFilter.filter = this.filter;
      this.filteredDatas = toFilter.filteredData;
      this.filtermax = toFilter.filteredData.length;
      this.dataSource = this.getTableDataFiltered(this.start, this.end);
    } else {
      this.dataSource.filter = '';
      this.dataSource = this.elementsStore;
    }
  }

  initData(): void {
    this.start = 0;
    this.end = Math.round(this.innerHeight / 30);
    this.elementService.getElementsFragment(this.start, this.end).subscribe(
      response => {
        console.log(response);
        if (response.error) {
          // handle error
        } else {
          this.dataSource = new MatTableDataSource(response);
          this.elementsStore = this.dataSource;
          this.updateIndex();
        }
      },
      error => {
        // handle error
      }
    );
  }

  ngOnInit(): void {
    this.initData();
  }
}
