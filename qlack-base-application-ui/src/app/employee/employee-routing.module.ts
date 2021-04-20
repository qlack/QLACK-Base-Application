import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from "./employee.component";
import {EmployeeEditComponent} from "./employee-edit.component";

const routes: Routes = [
  {path: '', component: EmployeeComponent},
  {path: ':id', component: EmployeeEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
