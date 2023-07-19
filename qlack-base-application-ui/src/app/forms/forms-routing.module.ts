import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FormViewComponent} from "./form-view/form-view.component";

const routes: Routes = [
  {path: "", component: FormViewComponent, data: {breadcrumb: ""}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {
}
