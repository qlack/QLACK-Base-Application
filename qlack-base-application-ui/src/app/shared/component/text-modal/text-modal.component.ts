import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-text-modal",
  templateUrl: "./text-modal.component.html",
  styleUrls: ["./text-modal.component.scss"]
})
export class TextModalComponent {

  constructor(public dialogRef: MatDialogRef<TextModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public reload(): void {
    window.location.reload();
  }

}
