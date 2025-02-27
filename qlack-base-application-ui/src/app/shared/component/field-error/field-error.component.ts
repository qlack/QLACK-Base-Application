import {Component, Input} from "@angular/core";
import { NgIf } from "@angular/common";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
    selector: "app-field-error",
    templateUrl: "./field-error.component.html",
    imports: [NgIf, FaIconComponent, MatTooltip]
})
export class FieldErrorComponent {
  @Input() displayError = false;
  @Input() errorMessage: string | null = null;
}
