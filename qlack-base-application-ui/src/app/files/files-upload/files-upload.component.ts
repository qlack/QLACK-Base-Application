import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpEventType} from "@angular/common/http";
import {UtilityService} from "../../shared/service/utility.service";
import {FilesService} from "../files.service";

@Component({
  selector: "app-files-upload",
  templateUrl: "./files-upload.component.html"
})
export class FilesUploadComponent implements OnInit {
  form!: FormGroup;

  // NOSONAR
  constructor(private fb: FormBuilder,
    private router: Router, private utilityService: UtilityService,
    private filesService: FilesService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [""],
      description: ["", [Validators.maxLength(2048)]],
      file: ["", [Validators.required]],
      fileName: [""]
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
