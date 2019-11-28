import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QFormsService} from '@eurodyn/forms';
import {UserService} from './user.service';
import {MatDialog} from '@angular/material/dialog';
import {BaseComponent} from '../shared/component/base-component';
import {UtilityService} from '../shared/service/utility.service';
import {OkCancelModalComponent} from '../shared/component/display/ok-cancel-modal/ok-cancel-modal.component';

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

  constructor(private fb: FormBuilder, private userService: UserService,
              private route: ActivatedRoute,
              private qForms: QFormsService, private router: Router, private dialog: MatDialog,
              private utilityService: UtilityService) {
    super();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = (this.id !== '0');

    // Setup the form.
    this.form = this.fb.group({
      id: [null],
      email: [{value: '', disabled: this.isEdit}, [Validators.required, Validators.email]],
      newPassword1: [{value: '', disabled: false}, [Validators.maxLength(1024)]],
      newPassword2: [{value: '', disabled: false}, [Validators.maxLength(1024)]],
      password: [],
      status: [{value: '', disabled: false}, [Validators.required, Validators.maxLength(1024)]],
      firstname: [{value: '', disabled: false}, [Validators.maxLength(1024)]],
      lastname: [{value: '', disabled: false}, [Validators.maxLength(1024)]]
    });

    // Fill-in the form with data if editing an existing item.
    if (this.id) {
      this.userService.get(this.id).subscribe(onNext => {
        this.form.patchValue(onNext);
      });
    }
  }

  save() {
    if (this.form.controls['newPassword1'].value === this.form.controls['newPassword2'].value) {
      this.form.controls['password'].setValue(this.form.controls['newPassword1'].value);
      this.form.controls['newPassword1'].setValue(null);
      this.form.controls['newPassword2'].setValue(null);
      this.userService.save(this.qForms.cleanupForm(this.form)).subscribe(onNext => {
        this.utilityService.popupSuccess(this.isEdit ? 'User was successfully edited.'
          : 'User was successfully created.');
        this.router.navigate(['users']);
      }, onError => {
        this.utilityService.popupError(onError.error.message);
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
