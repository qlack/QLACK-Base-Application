import {Component} from '@angular/core';
import {Log} from 'ng2-logger/browser';
import {BaseComponent} from '../shared/component/base-component';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent extends BaseComponent {
  private log = Log.create('LogoutComponent');

  constructor() {
    super();
  }

  ngOnInit() {
   localStorage.clear();
  }


}
