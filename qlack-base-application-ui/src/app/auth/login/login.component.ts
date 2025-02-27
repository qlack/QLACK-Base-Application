import {Component, OnInit, Renderer2} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppConstants} from "../../app.constants";
import {LoginInfoDto} from "../dto/login-info-dto";
import {BaseComponent} from "../../shared/component/base-component";
import {UtilityService} from "../../shared/service/utility.service";
import {AuthService} from "../auth.service";
import {JwtTrackerService} from "../../shared/service/jwt-tracker.service";
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: "app-login",
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    NgIf,
    NgClass
  ],
  templateUrl: "./login.component.html"
})
export class LoginComponent extends BaseComponent implements OnInit {
  // Form control.
  loginForm!: FormGroup;

  // Show/hidePassword password
  hidePassword = true;

  // Show/Hide login form.
  hideLoginForm = false;

  // Error message to display in form.
  errorMessage?: string;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder,
              private utilityService: UtilityService, private renderer: Renderer2,
              private jwtTrackerService: JwtTrackerService) {
    super();

    // Prepare login form.
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit() {
    if (!this.isLoggedIn()) {
        this.renderer.setAttribute(document.body, "style",
          "background-image:  linear-gradient(to top, rgba(0,0,0,0)" +
          " 30%, rgba(255,255,255,0.62) 64%, rgba(255,255,255,1) 89%), url(/img/bg.jpg);" +
          " background-size: cover;");
    } else {
      this.router.navigate(["home"]);
    }
  }

  onSubmit({value}: { value: LoginInfoDto }) {
    this.authService.login(value).subscribe({
      next: onNext => {
        this.hideLoginForm = true;
        this.renderer.removeAttribute(document.body, "style");
        // Save the JWT to be used in future requests.
        localStorage.setItem(AppConstants.JWT_STORAGE_NAME, onNext.jwt);
        this.jwtTrackerService.startTracking();
        this.router.navigate(["home"]);
      }, error: onError => {
        this.logger.logError("Authentication was unsuccessful.", onError)
        this.utilityService.popupError("Authentication was unsuccessful.");
        this.errorMessage = "Authentication was unsuccessful."
        this.hideLoginForm = false;
      }
    });
  }

}
