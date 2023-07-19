import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {OkCancelModalComponent} from "./ok-cancel-modal/ok-cancel-modal.component";
import {TextModalComponent} from "./text-modal/text-modal.component";
import {InputModalComponent} from "./input-modal/input-modal.component";
import {FieldErrorComponent} from "./field-error/field-error.component";
import {TitlelisePipe} from "./titlelise/titlelise.pipe";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    BreadcrumbComponent,
    OkCancelModalComponent,
    TextModalComponent,
    InputModalComponent,
    FieldErrorComponent,
    TitlelisePipe,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
    FontAwesomeModule,
  ],
  exports: [
    FieldErrorComponent,
    TitlelisePipe,
    BreadcrumbComponent,
  ]
})
export class ComponentsModule {
}
