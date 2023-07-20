import { Component, OnInit } from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {QFormsService} from "@qlack/forms";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {UtilityService} from "../../shared/service/utility.service";
import {FilesService} from "../files.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "app-files-upload",
  templateUrl: "./files-upload.component.html"
})
export class FilesUploadComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder, private dialog: MatDialog,
              private qForms: QFormsService, private route: ActivatedRoute,
              private router: Router, private http: HttpClient,
              private utilityService: UtilityService, private filesService: FilesService) { }

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
      }, error: error => {
        this.utilityService.popupError("There was a problem uploading this file.");
      }
    });
  }
}
