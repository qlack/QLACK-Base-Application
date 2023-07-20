import {Component, Input} from "@angular/core";

@Component({
  selector: "app-field-error",
  templateUrl: "./field-error.component.html"
})
export class FieldErrorComponent {
  @Input() displayError = false;
  @Input() errorMessage: string | null = null;
}
