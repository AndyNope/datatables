import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialsComponent } from './materials/materials.component';
import { BootrapPageComponent } from './bootrap-page/bootrap-page.component';
import { DataTableJSComponent } from './data-table-js/data-table-js.component';



const appRoutes: Routes = [
    { path: '', component: MaterialsComponent },
    { path: 'bootstrap', component: BootrapPageComponent },
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