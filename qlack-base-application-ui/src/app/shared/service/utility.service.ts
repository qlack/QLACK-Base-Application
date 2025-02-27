import {Injectable} from "@angular/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Injectable({
  providedIn: "root"
})
export class UtilityService {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  /**
   * Display a success message.
   * @param message The message to display.
   */
  popupSuccess(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 5000,
      verticalPosition: "top",
      panelClass: "bg-green-800"
    });
  }

  /**
   * Display an error message.
   * @param message The message to display.
   */
  popupError(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 10000,
      verticalPosition: "top",
      panelClass: "bg-red-800"
    });
  }

  /**
   * Display an info message.
   * @param message The message to display.
   */
  popupInfo(message: string) {
    this.snackBar.open(message, "CLOSE", {
      duration: 10000,
      verticalPosition: "top",
      panelClass: "bg-blue-800"
    });
  }

}
