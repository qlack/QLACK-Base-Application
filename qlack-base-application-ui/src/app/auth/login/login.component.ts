import {Component, OnInit, Renderer2} from "@angular/core";
import {Router} from "@angular/router";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Log} from "ng2-logger/browser";
import {AppConstants} from "../../app.constants";
import {LoginInfoDto} from "../dto/login-info-dto";
import {BaseComponent} from "../../shared/component/base-component";
import {UtilityService} from "../../shared/service/utility.service";
import {AuthService} from "../auth.service";
import {JwtTrackerService} from "../../services/jwt-tracker-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent extends BaseComponent implements OnInit {
  // Logger.
  private log = Log.create("LoginComponent");

  // Form control.
  loginForm!: UntypedFormGroup;

  // Show/hidePassword password
  hidePassword = true;

  // Show/Hide login form.
  hideLoginForm = false;

  // Error message to display in form.
  errorMessage?: string;

  constructor(private router: Router, private authService: AuthService, private fb: UntypedFormBuilder,
              private utilityService: UtilityService, private renderer: Renderer2,
              private jwtTrackerService: JwtTrackerService) {
    super();
  }

  ngOnInit() {
    if (!this.isLoggedIn()) {
        this.renderer.setAttribute(document.body, "style",
          "background-image:  linear-gradient(to top, rgba(0,0,0,0)" +
          " 30%, rgba(255,255,255,0.62) 64%, rgba(255,255,255,1) 89%), url(/assets/img/bg.jpg);" +
          " background-size: cover;");
    } else {
      this.router.navigate(["home"]);
    }

    // Prepare login form.
    this.loginForm = this.fb.group({
      email: ["admin@qlack.com", [Validators.required, Validators.email]],
      password: ["admin", [Validators.required]]
    });
  }

  onSubmit({value}: { value: LoginInfoDto }) {
    this.authService.login(value).subscribe(
      onNext => {
        this.hideLoginForm = true;
        this.renderer.removeAttribute(document.body, "style");
        // Save the JWT to be used in future requests.
        localStorage.setItem(AppConstants.JWT_STORAGE_NAME, onNext.jwt);
        this.jwtTrackerService.startTracking();
        this.router.navigate(["home"]);
      }, onError => {
        console.log(onError);
        this.utilityService.popupError("Authentication was unsuccessful.");
        this.errorMessage = "Authentication was unsuccessful."
        this.hideLoginForm = false;
      });
  }

}
