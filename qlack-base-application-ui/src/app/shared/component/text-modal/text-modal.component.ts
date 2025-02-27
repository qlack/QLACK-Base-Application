import {Component, Inject} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from "@angular/material/dialog";
import { CdkScrollable } from "@angular/cdk/scrolling";

@Component({
    selector: "app-text-modal",
    templateUrl: "./text-modal.component.html",
    styleUrls: ["./text-modal.component.scss"],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatDialogActions]
})
export class TextModalComponent {

  constructor(public dialogRef: MatDialogRef<TextModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public reload(): void {
    window.location.reload();
  }

}
