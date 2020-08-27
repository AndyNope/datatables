import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaterialsComponent } from './materials/materials.component';
import { BootstrapPageComponent } from './bootstrap-page/bootstrap-page.component';
import { DataTableJSComponent } from './data-table-js/data-table-js.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';



const appRoutes: Routes = [
    { path: '', component: MaterialsComponent },
    { path: 'infinit', component: InfiniteScrollComponent },
    { path: 'bootstrap', component: BootstrapPageComponent },
    { path: 'datatableJS', component: DataTableJSComponent },
    { path: '**', redirectTo: '/' }
];

/**
 * Ng module
 */
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: []
})
export class AppRoutingModule {

}
