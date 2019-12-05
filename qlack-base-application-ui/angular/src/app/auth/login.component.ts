import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Log} from 'ng2-logger/browser';
import {LoginInfoDto} from '../dto/login-info-dto';
import {BaseComponent} from '../shared/component/base-component';
import {UtilityService} from '../shared/service/utility.service';
import {LoginService} from '../services/login-service';
import {AppConstants} from '../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  // Logger.
  private log = Log.create('LoginComponent');

  // Form control.
  loginForm: FormGroup;

  // Show/hidePassword password
  hidePassword = true;

  // Show/Hide login form.
  hideLoginForm = false;

  // Error message to display in form.
  errorMessage: string;

  constructor(private router: Router, private fb: FormBuilder, private utilityService: UtilityService, private loginService: LoginService) {
    super();
  }

  ngOnInit() {
    // If the user is already logged in just redirect back to the originating application.
    if (this.isLoggedIn()) {
      this.log.data('User is already logged in.');
      this.router.navigate(['/home']);
    }

    // Prepare login form.
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit({value}: { value: LoginInfoDto }) {
    this.loginService.login(value).subscribe(onNext => {
        localStorage.setItem(AppConstants.JWT_STORAGE_NAME, this.loginForm.get('email').value);
        this.router.navigate(['/home'])
      },
      onError => this.utilityService.popupError(onError.error));
  }

}
