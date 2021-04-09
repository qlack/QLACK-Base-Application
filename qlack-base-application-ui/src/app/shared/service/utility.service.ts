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
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'bg-green'
    });
  }

  /**
   * Display an error message.
   * @param message The message to display.
   */
  popupError(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'bg-red'
    });
  }

  /**
   * Display an info message.
   * @param message The message to display.
   */
  popupInfo(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: 'bg-blue'
    });
  }

}
