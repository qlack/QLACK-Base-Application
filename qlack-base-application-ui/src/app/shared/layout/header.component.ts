import { Component} from "@angular/core";
import {BaseComponent} from "../component/base-component";
import {AppConstants} from "../../app.constants";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent extends BaseComponent {
  // The user email extracted from JWT.
  public userEmail: string | undefined;

  constructor(private authService: AuthService) {
    super();
  }

  getUserEmail(): string | null {
    return this.authService.getJWTClaim(AppConstants.jwt.claims.EMAIL);
  }

}
