import {NgModule} from "@angular/core";
import {ActivatedRouteSnapshot, RouterModule, Routes} from "@angular/router";
import {EmployeeListComponent} from "./employee-list/employee-list.component";
import {EmployeeEditComponent} from "./employee-edit/employee-edit.component";
import {AppConstants} from "../app.constants";

const routes: Routes = [
  {path: "", component: EmployeeListComponent, data: {breadcrumb: ""}},
  {
    path: ":id", component: EmployeeEditComponent,
    data: {
      breadcrumb: (route: ActivatedRouteSnapshot) => {
        if (route.params.id === AppConstants.NEW_RECORD_ID) {
          return "Create new employee";
        } else {
          return "Edit employee " + route.params.id;
        }
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
