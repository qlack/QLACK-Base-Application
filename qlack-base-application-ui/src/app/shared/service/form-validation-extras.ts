import {AbstractControl, ValidationErrors, Validators} from '@angular/forms';

export class FormValidationExtras {

  // Matcher for changing password fields.
  static MatchPassword(control: AbstractControl) {
    const oldPassword = control.get('oldPassword').value;
    const newPassword1 = control.get('newPassword1').value;
    const newPassword2 = control.get('newPassword2').value;

    if (newPassword1 && newPassword2) {
      if (newPassword1 !== newPassword2 || oldPassword === newPassword1) {
        control.get('newPassword1').setErrors({MatchPassword: true});
        control.get('newPassword2').setErrors({MatchPassword: true});
      } else {
        control.get('newPassword1').setErrors(null);
        control.get('newPassword2').setErrors(null);
      }
    } else {
      control.get('newPassword1').setErrors(null);
      control.get('newPassword2').setErrors(null);
    }
  }

  // A matcher for an email when the email field is optional.
  static MatchOptionalEmail(control: AbstractControl): ValidationErrors {
    if (!control.value || control.value === '') {
      return null;
    }

    return Validators.email(control);
  }
}
