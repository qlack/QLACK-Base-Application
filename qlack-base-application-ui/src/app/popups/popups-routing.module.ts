import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PopupsComponent} from "./popups.component";

const routes: Routes = [
  {path: '', component: PopupsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupsRoutingModule {
}
