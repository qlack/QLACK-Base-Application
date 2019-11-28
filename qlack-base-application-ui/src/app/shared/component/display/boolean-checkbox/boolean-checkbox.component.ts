import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-boolean-checkbox',
  templateUrl: './boolean-checkbox.component.html',
  styleUrls: ['./boolean-checkbox.component.scss']
})
export class BooleanCheckboxComponent {
  @Input() public value: boolean;

  constructor() {
  }

}
