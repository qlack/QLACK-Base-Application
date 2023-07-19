import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: "app-ok-cancel-modal",
  templateUrl: "./ok-cancel-modal.component.html",
  styleUrls: []
})
export class OkCancelModalComponent {

  constructor(public dialogRef: MatDialogRef<OkCancelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public reload(): void {
    window.location.reload();
  }

}
