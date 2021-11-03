import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SensitiveComponent} from "./sensitive.component";

const routes: Routes = [
  {path: "", component: SensitiveComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SensitiveRoutingModule {
}
