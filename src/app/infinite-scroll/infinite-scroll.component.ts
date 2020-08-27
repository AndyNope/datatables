import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { PeriodicElement } from '../shared/model/periodic-element.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA: PeriodicElement[] = JSON.parse(localStorage.elements);
  filteredDatas: PeriodicElement[];
  public dataSource: MatTableDataSource<PeriodicElement>;
  public innerWidth: number = Math.round(window.innerWidth);
  public innerHeight: number = Math.round(window.innerHeight);
  filter = '';
  filtermax = 0;
  start: number;
  end: number;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  constructor() {
    this.start = 0;
    this.end = 10;
  }

  /**
   * This function enable to sort and use the paginator at the same time.
   */
  setDataSourceAttributes(): void {
    this.dataSource.sort = this.sort;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.start = 0;
    this.end = Math.round(this.innerHeight / 70);
    this.dataSource = new MatTableDataSource(this.getTableData(this.start, this.end));
    console.log('resize');
  }

  /**
   * Check on Scroll if it's on limit
   * @param e wait for a scroll action
   */
  onTableScroll(e: { target: { offsetHeight: any; scrollHeight: any; scrollTop: any; }; }): void {
    const tableViewHeight = e.target.offsetHeight; // viewport
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation > limit) {
      let loadedData;
      let data = this.dataSource.data;
      if (this.filter.length > 2) {
        data = this.filteredDatas;
        loadedData = this.getTableDataFiltered(this.start, this.end);
        if (data.length > this.filtermax) {
          data.push(loadedData[0]);
        }
      } else {
        data = this.dataSource.data;
        loadedData = this.getTableData(this.start, this.end);
        if (loadedData.length > 0) {
          data.push(loadedData[0]);
        }
      }

      this.dataSource = new MatTableDataSource(data);
      this.updateIndex();
      this.setDataSourceAttributes();
    }
  }

  /**
   * Get this Array range
   * @param start Start of the Range
   * @param end End of the Range
   */
  getTableData(start: number, end: number): any {
    return this.ELEMENT_DATA.filter((value, index) => index >= start && index < end);
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
    this.start = this.end;
    this.end = this.start + 1;
  }

  /**
   * Show the id of an element
   * @param id is the id of the element
   */
  showId(id: number): void {
    alert(this.ELEMENT_DATA[id - 1].position);
  }

  /**
   * This function use a filter to find specific data
   * @param filterValue is the value to filter
   */
  applyFilter(filterValue: string): void {
    this.filter = filterValue;
    if (this.filter.length > 2) {
      this.start = 0;
      this.end = 9;
      this.filter = this.filter.trim(); // Remove whitespace
      this.filter = this.filter.toLowerCase(); // Datasource defaults to lowercase matches
      const toFilter = new MatTableDataSource(this.ELEMENT_DATA);
      toFilter.filter = this.filter;
      this.filteredDatas = toFilter.filteredData;
      this.filtermax = toFilter.filteredData.length;
      this.dataSource = this.getTableDataFiltered(this.start, this.end);
    } else {
      this.start = 0;
      this.end = 9;
      this.dataSource.filter = '';
      this.dataSource = new MatTableDataSource(this.getTableData(this.start, this.end));
    }
    this.setDataSourceAttributes();
  }


  ngOnInit(): void {
    console.log(Math.round(this.innerHeight / 70));
    this.dataSource = new MatTableDataSource(this.getTableData(this.start, Math.round(this.innerHeight / 70)));
    this.updateIndex();
  }
}
