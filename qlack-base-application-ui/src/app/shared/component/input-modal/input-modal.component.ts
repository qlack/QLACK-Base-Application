import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-input-modal",
  templateUrl: "./input-modal.component.html",
  styleUrls: []
})
export class InputModalComponent {

  constructor(public dialogRef: MatDialogRef<InputModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public reload(): void {
    window.location.reload();
  }

}
