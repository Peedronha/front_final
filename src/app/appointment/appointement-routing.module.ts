import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VisitListComponent} from './appointment-list/visit-list.component';
import {VisitEditComponent} from './appointment-edit/visit-edit.component';
import {VisitAddComponent} from './appointment-add/visit-add.component';

const visitRoutes: Routes = [
  {path: 'visits', component: VisitListComponent},
  {path: 'visits/add', component: VisitAddComponent},
  {path: 'visits/:id/edit', component: VisitEditComponent}

];


@NgModule({
  imports: [
    RouterModule.forChild(visitRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppointementRoutingModule {
}
