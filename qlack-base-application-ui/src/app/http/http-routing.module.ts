import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HttpViewComponent} from "./http-view/http-view.component";

const routes: Routes = [
  {path: "", component: HttpViewComponent, data: {breadcrumb: ""}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HttpRoutingModule {
}
