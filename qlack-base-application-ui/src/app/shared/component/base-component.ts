import {AppConstants} from "../../app.constants";
import {inject} from '@angular/core';
import {LumberjackService} from '@ngworker/lumberjack';
import {FormGroup} from '@angular/forms';

export class BaseComponent {
  public readonly logger: LumberjackService = inject(LumberjackService);

  // Expose constants and settings to all components extending this class.
  constants = AppConstants;

  /**
   * Checks if the current user is logged in or not.
   * @returns {boolean}
   */
  isLoggedIn(): boolean {
    return localStorage.getItem(AppConstants.JWT_STORAGE_NAME) != null &&
      localStorage.getItem(AppConstants.JWT_STORAGE_NAME) !== undefined;
  }

  /**
   * Checks if a form field has an error, useful to display validation-blocks. This method checks
   * whether the field has already been touched or modified before returning 'true'. If you want
   * to check for field validity without the need for it to be touched or modified, use the
   * 'isValid' method below.
   * @param form The form to check.
   * @param fieldName The field name to check.
   */
  hasError(form: FormGroup, fieldName: string): boolean {
    if (form.get(fieldName)) {
      return form.get(fieldName)!.invalid
        && (form.get(fieldName)!.dirty || form.get(fieldName)!.touched);
    } else {
      return false;
    }
  }

  /**
   * Checks if a form field has a specific error, useful to display validation-blocks. This method
   * checks whether the field has already been touched or modified before returning 'true'. If you
   * want to check for field validity without the need for it to be touched or modified, use the
   * 'isValid' method below.
   * @param form The form to check.
   * @param fieldName The field name to check.
   * @param errorName The error name to check.
   */
  hasNamedError(form: FormGroup, fieldName: string, errorName: string): boolean {
    if (form.get(fieldName)) {
      return form.get(fieldName)!.invalid
        && (form.get(fieldName)!.dirty || form.get(fieldName)!.touched)
        && form.get(fieldName)!.hasError(errorName);
    } else {
      return false;
    }
  }
}
