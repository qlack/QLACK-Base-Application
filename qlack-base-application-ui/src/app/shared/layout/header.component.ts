import {Component} from '@angular/core';
import {BaseComponent} from '../component/base-component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent {
  // The user email extracted from JWT.
  public userEmail: string;

  constructor() {
    super();
  }

  getUserEmail(): string {
    return "test@test.com";
  }

}
