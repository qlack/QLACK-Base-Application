import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FilesComponent} from "./files.component";
import {FilesUploadComponent} from "./files-upload.component";

const routes: Routes = [
  {path: "", component: FilesComponent},
  {path: "upload", component: FilesUploadComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilesRoutingModule {
}
