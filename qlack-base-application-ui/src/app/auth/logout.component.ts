import {Component, OnInit, Renderer2} from "@angular/core";
import {Log} from "ng2-logger/browser";
import {BaseComponent} from "../shared/component/base-component";
import {AppConstants} from "../app.constants";
import {AuthService} from "./auth.service";

@Component({
  selector: "app-logout",
  templateUrl: "./logout.component.html",
  styleUrls: ["./logout.component.scss"]
})
export class LogoutComponent extends BaseComponent implements OnInit {
  private log = Log.create("LogoutComponent");
  // Expose application constants.
  constants = AppConstants;

  constructor(private authService: AuthService, private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.renderer.setAttribute(document.body, "style",
      "background-image:  linear-gradient(to top, rgba(0,0,0,0)" +
      " 30%, rgba(255,255,255,0.62) 64%, rgba(255,255,255,1) 89%), url(/assets/img/bg.jpg);" +
      " background-size: cover;");

    this.authService.logout().subscribe(onNext => {
      this.log.data("Successfully terminated session.");
      localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
    }, onError => {
      this.log.error("Could not terminate session.");
      localStorage.removeItem(this.constants.JWT_STORAGE_NAME);
    });
  }
}
