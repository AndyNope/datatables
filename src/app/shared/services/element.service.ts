import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  constructor(private http: HttpClient) { }

  /**
   * Gets users
   * @returns users
   */
  getElements(pageEvent: PageEvent): Observable<any> {
    console.log(pageEvent);
    return this.http.get<any>('https://server.jam-the-band.com/controller.php?mode=getElementsPaginator&pageIndex=' + pageEvent.pageIndex + '&pageSize=' + pageEvent.pageSize + '&previousPageIndex=' + pageEvent.previousPageIndex);
  }

  getElementStart(pageSize: number): Observable<any> {
    return this.http.get<any>('https://server.jam-the-band.com/controller.php?mode=getElementsPaginator&pageIndex=0&pageSize=' + pageSize);
  }

  getElementsFragment(start: number, end: number): Observable<any> {
    return this.http.get<any>('https://server.jam-the-band.com/controller.php?mode=getElementsFragment&start=' + start + '&end=' + end, {});
  }
}
