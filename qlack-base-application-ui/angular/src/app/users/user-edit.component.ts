import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QFormsService} from '@eurodyn/forms';
import {UserService} from './user.service';
import {MatDialog} from '@angular/material/dialog';
import {BaseComponent} from '../shared/component/base-component';
import {UtilityService} from '../shared/service/utility.service';
import {OkCancelModalComponent} from '../shared/component/display/ok-cancel-modal/ok-cancel-modal.component';
import {FileService} from '../services/file.service';
import {TranslateService} from '@ngx-translate/core';
import {QLACKTypescriptFormValidationService} from '@qlack/form-validation';

@Component({
  selector: 'app-user',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends BaseComponent implements OnInit {
  form: FormGroup;
  id: string;
  hide1 = true;
  hide2 = true;
  isEdit = false;
  imageURL: string;
  persistedPassword: string;

  constructor(private fb: FormBuilder, private userService: UserService,
              private route: ActivatedRoute,
              private qForms: QFormsService, private router: Router, private dialog: MatDialog,
              private utilityService: UtilityService, private fileService: FileService, private validationService: QLACKTypescriptFormValidationService, private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = (this.id !== '0');

    // Setup the form.
    this.form = this.fb.group({
      id: ['0'],
      email: [{value: '', disabled: this.isEdit}, [Validators.required]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      status: ['', [Validators.required, Validators.maxLength(1024)]],
      password: ['', this.isEdit ? null : Validators.required],
      repeatPassword: ['', this.isEdit ? null : Validators.required],
      extraInfo: this.fb.group({
        age: [0, Validators.required],
        weight: [0, Validators.required],
      })
    });

    // Fill-in the form with data if editing an existing item.
    if (this.isEdit) {
      this.userService.get(this.id).subscribe(onNext => {
        this.form.patchValue(onNext);
        this.persistedPassword = onNext.password;

      });
    }
  }

  save() {
    let formPassword = this.form.controls['password'].value;
    if (this.persistedPassword === formPassword || formPassword === this.form.controls['repeatPassword'].value) {
      this.form.controls['repeatPassword'].setValue(null);
      this.userService.save(this.qForms.cleanupForm(this.form)).subscribe(onNext => {
        this.utilityService.popupSuccess(
          this.isEdit ? "User updated successfully." : "User created successfully.");
        this.router.navigate(["/users"]);
      }, error => {

        if (error.status == 400) {
          let validationErrors = error.error;
          if (error.error) {
            this.translateService.use('en');
            this.validationService.validateForm(this.form, validationErrors, this.translateService);
          } else {
            this.utilityService.popupError("Something went wrong");
          }
        } else {
          this.utilityService.popupError(error.error);
        }
      });
    } else {
      this.utilityService.popupError("Passwords do not match.");
    }
  }

  delete() {
    this.dialog.open(OkCancelModalComponent, {
      data: {
        title: 'Delete User',
        question: 'Do you really want to delete this user?',
        buttons: {
          ok: true, cancel: true, reload: false
        }
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(this.id).subscribe(onNext => {
          this.utilityService.popupSuccess('User successfully deleted.');
          this.router.navigate(['users']);
        });
      }
    });
  }
}
