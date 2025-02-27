import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {HttpEventType} from "@angular/common/http";
import {UtilityService} from "../../shared/service/utility.service";
import {FilesService} from "../files.service";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
    selector: "app-files-upload",
    templateUrl: "./file-upload.component.html",
    imports: [ReactiveFormsModule, MatFormField, MatInput, RouterLink]
})
export class FileUploadComponent implements OnInit {
  form!: FormGroup;

  // NOSONAR
  constructor(private fb: FormBuilder,
    private router: Router, private utilityService: UtilityService,
    private filesService: FilesService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [null, [Validators.maxLength(2048)]],
      file: [null, [Validators.required]],
      fileName: [null]
    });
  }

  selectFile(event: any) {
    this.form.controls["file"].patchValue(event.target.files[0]);
    this.form.controls["fileName"].patchValue(event.target.files[0].name);
  }

  save() {
    this.filesService.upload(this.form).subscribe({
      next: data => {
        if (data.type === HttpEventType.Response) {
          if (data.status === 200) {
            this.utilityService.popupSuccess("File successfully saved.");
            this.router.navigate(["files"]);
          } else {
            this.utilityService.popupError("There was a problem uploading this file.");
          }
        }
      }, error: () => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }
}
