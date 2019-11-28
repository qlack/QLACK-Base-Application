import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OkCancelModalComponent} from './ok-cancel-modal/ok-cancel-modal.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {BooleanCheckboxComponent} from './boolean-checkbox/boolean-checkbox.component';
import {TextModalComponent} from './text-modal/text-modal.component';

@NgModule({
  declarations: [
    OkCancelModalComponent,
    BooleanCheckboxComponent,
    TextModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  entryComponents: [OkCancelModalComponent],
  exports: [
    BooleanCheckboxComponent
  ]
})
export class DisplayModule {
}
