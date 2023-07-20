import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {I18nViewComponent} from "./i18-view/i18n-view.component";

const routes: Routes = [
  {path: "", component: I18nViewComponent, data: {breadcrumb: ""}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class I18nRoutingModule {
}
