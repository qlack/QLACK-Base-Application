import {Component, Inject} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-input-modal",
    templateUrl: "./input-modal.component.html",
    styleUrls: [],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatInput, MatDialogActions, NgIf]
})
export class InputModalComponent {

  constructor(public dialogRef: MatDialogRef<InputModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public reload(): void {
    window.location.reload();
  }

}
