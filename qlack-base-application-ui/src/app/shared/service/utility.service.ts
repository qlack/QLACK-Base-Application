import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  /**
   * Display a success message.
   * @param message The message to display.
   */
  popupSuccess(message: string) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'snackbar-green'
    });
  }

  /**
   * Display an error message.
   * @param message The message to display.
   */
  popupError(message: string) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 10000,
      verticalPosition: 'top',
      panelClass: 'snackbar-red'
    });
  }

  /**
   * Display an info message.
   * @param message The message to display.
   */
  popupInfo(message: string) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 10000,
      verticalPosition: 'top',
      panelClass: 'snackbar-blue'
    });
  }

}
