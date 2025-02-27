import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SensitiveViewComponent} from "./sensitive-view/sensitive-view.component";

const routes: Routes = [
  {path: "", component: SensitiveViewComponent, data: {breadcrumb: ""}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensitiveRoutes {
}
