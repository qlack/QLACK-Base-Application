import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {I18nComponent} from "./i18n.component";

const routes: Routes = [
  {path: '', component: I18nComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class I18nRoutingModule {
}
