import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QFormsService} from '@eurodyn/forms';
import {UserService} from './user.service';
import {MatDialog} from '@angular/material/dialog';
import {BaseComponent} from '../shared/component/base-component';
import {UtilityService} from '../shared/service/utility.service';
import {OkCancelModalComponent} from '../shared/component/display/ok-cancel-modal/ok-cancel-modal.component';
import {HttpEventType} from '@angular/common/http';
import {FileService} from '../services/file.service';

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
  pic: ArrayBuffer | string;

  constructor(private fb: FormBuilder, private userService: UserService,
              private route: ActivatedRoute,
              private qForms: QFormsService, private router: Router, private dialog: MatDialog,
              private utilityService: UtilityService, private fileService: FileService) {
    super();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isEdit = (this.id !== '0');

    // Setup the form.
    this.form = this.fb.group({
      id: ['0'],
      email: [{value: '', disabled: this.isEdit}, [Validators.required, Validators.email]],
      newPassword1: ['', [Validators.maxLength(1024)]],
      newPassword2: ['', [Validators.maxLength(1024)]],
      password: [],
      status: ['', [Validators.required, Validators.maxLength(1024)]],
      firstname: ['', [Validators.maxLength(1024)]],
      lastname: ['', [Validators.maxLength(1024)]],
      pic: [undefined, [Validators.required]]
    });

    // Fill-in the form with data if editing an existing item.
    if (this.isEdit) {
      this.userService.get(this.id).subscribe(onNext => {
        this.form.patchValue(onNext);

        if (onNext.profilepic) {
          this.form.get(('pic')).clearValidators();
          this.form.get('pic').updateValueAndValidity()
          this.imageURL = this.fileService.getImage(onNext.profilepic.id);
        } else {
            this.imageURL = '../assets/img/default.png';
          }
      });
    }
  }

  save() {
    if (this.form.controls['newPassword1'].value === this.form.controls['newPassword2'].value) {
      this.form.controls['password'].setValue(this.form.controls['newPassword1'].value);
      this.form.controls['newPassword1'].setValue(null);
      this.form.controls['newPassword2'].setValue(null);

      this.userService.upload(this.form).subscribe(onEvent => {
        if (onEvent.type == HttpEventType.Response) {
          if (onEvent.status == 200) {
            this.utilityService.popupSuccess(this.isEdit ? "User updated successfully." : "User" +
              " created successfully.");
            this.router.navigate(["/users"]);
          } else {
            this.utilityService.popupError(
              `There was a problem ${this.isEdit ? 'editing' : 'creating'} user.`);
          }
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

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)

    this.form.patchValue({
      pic: file
    });
    this.form.get('pic').updateValueAndValidity()
  }
}
