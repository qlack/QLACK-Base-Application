import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PopupViewComponent} from "./popup-view/popup-view.component";

const routes: Routes = [
  {path: "", component: PopupViewComponent, data: {breadcrumb: ""}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupsRoutes {
}
