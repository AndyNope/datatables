import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { BootrapPageComponent } from './bootrap-page/bootrap-page.component';
import { MaterialsComponent } from './materials/materials.component';
import { DataTableJSComponent } from './data-table-js/data-table-js.component';
import { NavigatorComponent } from './navigator/navigator.component';

@NgModule({
  declarations: [
    AppComponent,
    BootrapPageComponent,
    MaterialsComponent,
    NavigatorComponent,
    DataTableJSComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    ScrollingModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
