import {Component, Inject} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { CdkScrollable } from "@angular/cdk/scrolling";
import { NgIf } from "@angular/common";

@Component({
    selector: "app-ok-cancel-modal",
    templateUrl: "./ok-cancel-modal.component.html",
    styleUrls: [],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions, NgIf]
})
export class OkCancelModalComponent {

  constructor(public dialogRef: MatDialogRef<OkCancelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public reload(): void {
    window.location.reload();
  }

}
