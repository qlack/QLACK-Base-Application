import {Component, OnInit} from "@angular/core";
import {BaseComponent} from "../shared/component/base-component";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {QFormsService} from "@qlack/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UtilityService} from "../shared/service/utility.service";
import {EmployeeService} from "./employee.service";
import {EmployeeDto} from "../dto/employee-dto";
import {OkCancelModalComponent} from "../shared/component/display/ok-cancel-modal/ok-cancel-modal.component";
import {AppConstants} from "../app.constants";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "app-employee-edit",
  templateUrl: "./employee-edit.component.html",
  styleUrls: ["./employee-edit.component.scss"]
})
export class EmployeeEditComponent extends BaseComponent implements OnInit {
  form!: UntypedFormGroup;
  id?: string | null;

  constructor(private fb: UntypedFormBuilder, private dialog: MatDialog,
              private qForms: QFormsService, private route: ActivatedRoute,
              private router: Router, private utilityService: UtilityService,
              private employeeService: EmployeeService) {
    super();
  }

  ngOnInit() {
    // Check if an edit is performed and fetch data.
    this.id = this.route.snapshot.paramMap.get("id");

    // Setup the form.
    this.form = this.fb.group({
      id: [""],
      firstName: ["", [Validators.required, Validators.maxLength(256)]],
      lastName: ["", [Validators.required, Validators.maxLength(256)]],
      department: ["", []],
      hiringDate: ["", []]
    });

    // Fill-in the form with data if editing an existing item.
    if (this.id && this.id !== AppConstants.NEW_RECORD_KEYWORD) {
      this.employeeService.get(this.id).subscribe(onNext => {
        this.form!.patchValue(onNext);
      });
    }
  }

  save() {
    this.employeeService.save(
      this.qForms.cleanupData(this.form.getRawValue()) as EmployeeDto).subscribe(onNext => {
      this.utilityService.popupSuccess("Employee successfully saved.");
      this.router.navigate(["employee"]);
    });
  }

  delete() {
    const dialogRef = this.dialog.open(OkCancelModalComponent, {
      data: {
        title: "Delete employee",
        question: "Do you really want to delete this employee?",
        buttons: {
          ok: true, cancel: true, reload: false
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.delete(this.id).subscribe(onNext => {
          this.utilityService.popupSuccess("Employee successfully deleted.");
          this.router.navigate(["employee"]);
        });
      }
    });
  }

}
