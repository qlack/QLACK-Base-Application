import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FormEditComponent} from "./form-edit/form-edit.component";

const routes: Routes = [
  {path: "", component: FormEditComponent, data: {breadcrumb: ""}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutes {
}
