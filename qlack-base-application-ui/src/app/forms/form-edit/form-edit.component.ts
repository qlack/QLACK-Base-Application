import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {FormsService} from "../forms.service";
import {QFormsService} from "@qlack/forms";
import {UtilityService} from "../../shared/service/utility.service";
import {QFormValidationService} from "@qlack/form-validation";
import {FormDto} from "../dto/form-dto";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {BaseComponent} from '../../shared/component/base-component';

@Component({
    selector: "app-form",
    templateUrl: "./form-edit.component.html",
    imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, NgIf, MatSuffix, MatTooltip, MatError]
})
export class FormEditComponent extends BaseComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private formsService: FormsService,
    private qForms: QFormsService, private utilityService: UtilityService,
    private qFormValidationService: QFormValidationService) {
    super();
  }

  ngOnInit(): void {
    // Set up the form.
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      age: ["", [Validators.required]]
    });
  }

  save() {
    this.formsService.save(
      this.qForms.cleanupData(this.form.getRawValue()) as FormDto).subscribe({
        next: () => {
          this.utilityService.popupSuccess("Form successfully saved.");
        }, error: (onError) => {
          if (onError.status == 400) {
            const validationErrors = onError.error;
            if (validationErrors) {
              this.utilityService.popupError("Form could not be saved.");
              // @ts-ignore
              this.qFormValidationService.validateForm(this.form, validationErrors);
            }
          }
        }
      }
    );
  }
}
