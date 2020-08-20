import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { InfiniteScrollModule} from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BootrapPageComponent } from './bootrap-page/bootrap-page.component';
import { MaterialsComponent } from './materials/materials.component';
import { DataTableJSComponent } from './data-table-js/data-table-js.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { InfiniteScrollComponent } from './materials/infinite-scroll/infinite-scroll.component';
import { EditDialogComponent } from './shared/modal/edit/edit.dialog.component';
import { AddDialogComponent } from './shared/modal/add/add.dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BootrapPageComponent,
    MaterialsComponent,
    NavigatorComponent,
    DataTableJSComponent,
    InfiniteScrollComponent,
    EditDialogComponent,
    AddDialogComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    ScrollingModule,
    MatPaginatorModule,
    MatDialogModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
