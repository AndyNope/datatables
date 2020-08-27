import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

declare function startBootstrapToolTip(): any;
@Component({
  selector: 'app-bootstrap-page',
  templateUrl: './bootstrap-page.component.html',
  styleUrls: ['./bootstrap-page.component.css']
})
export class BootstrapPageComponent implements OnInit {
  public elements = JSON.parse(localStorage.elements);
  public elementsStore = this.elements;
  public innerWidth: number = Math.round(window.innerWidth);
  public innerHeight: number = Math.round(window.innerHeight);
  public filtered = [];
  start: number;
  end: number;
  @ViewChild('td') td;

  constructor(private elRef: ElementRef) {
    this.start = 0;
    this.end = 13;
  }

  /**
   * Show the id of an element
   * @param id is the id of the element
   */
  showId(id: number): void {
    alert('ID: ' + this.elements[id - 1].position);
  }

  /**
   * This function use a filter to find specific data
   * @param filterValue is the value to filter
   */
  applyFilter(filterValue: string): void {
    if (filterValue.length > 2) {
      this.filtered = [];
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.elements.forEach(element => {
        if (this.findKeyWord(filterValue.toString(), element)) {
          this.filtered.push(element);
        }
      });
      this.elements = this.filtered;
    } else {
      this.elements = this.elementsStore;
    }
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
      let data = this.elements;
      data = this.elements;
      loadedData = this.getTableData(this.start, this.end);
      if (loadedData.length > 0) {
        data.push(loadedData[0]);
      }
      this.elements = data;
      this.updateIndex();
    }
  }

  /**
   * Get this Array range
   * @param start Start of the Range
   * @param end End of the Range
   */
  getTableData(start: number, end: number): any {
    return this.elementsStore.filter((value, index) => index >= start && index < end);
  }

  /**
   * Sort the Array by name
   */
  sortByName(): void {
    const data = this.elements;
    data.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    this.elements = data;
  }

  /**
   * Sort the Array by weight
   */
  sortByWeight(): void {
    const data = this.elements;
    data.sort((a, b) => a.weight - b.weight);
    this.elements = data;
  }

  /**
   * Sort the Array by id
   */
  sortById(): void {
    console.log('sort');
    const data = this.elements;
    data.sort((a, b) => a.position - b.position);
    this.elements = data;
  }

  /**
   * Sort the Array by symbol
   */
  sortBySymbol(): void {
    const data = this.elements;
    data.sort((a, b) => {
      return a.name.localeCompare(b.symbol);
    });
    this.elements = data;
  }

  /**
   * Search a keyword from an array
   * @return a boolean
   */
  findKeyWord(keyword: string, toCompare: any): boolean {
    const name: string = toCompare.name.toLowerCase();
    let weight: string = toCompare.weight.toString();
    weight = weight.replace('.', ''); // Remove dots
    const symbol: string = toCompare.symbol.toLowerCase();
    if (
      name.includes(keyword) ||
      weight.includes('/' + keyword + '/gi') ||
      symbol.indexOf('/' + keyword + '/gi') !== -1
    ) {
      return true;
    }
    return false;
  }

  /**
   * set the next range
   */
  updateIndex(): void {
    this.start = this.end;
    this.end = this.start + 1;
  }

  ngOnInit(): void {
    console.log(Math.round(this.innerHeight / 80));
    this.elements = this.getTableData(0, Math.round(this.innerHeight / 80));
    startBootstrapToolTip();
  }

}
