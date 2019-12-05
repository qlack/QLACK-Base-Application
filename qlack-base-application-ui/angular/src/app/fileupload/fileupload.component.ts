import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {QFormsService} from '@eurodyn/forms';
import {MatDialog} from '@angular/material/dialog';
import {UtilityService} from '../shared/service/utility.service';
import {FileService} from '../services/file.service';
import {FileDto} from '../dto/file-dto';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  previewImageURL: string;
  imageURL: string;
  uploadForm: FormGroup;
  files: FileDto[];
  fileId: String

  constructor(public fb: FormBuilder, private fileService: FileService,
              private route: ActivatedRoute,
              private qForms: QFormsService, private router: Router, private dialog: MatDialog,
              private utilityService: UtilityService) {
    // Reactive Form
    this.uploadForm = this.fb.group({
      file: [null]
    })
  }

  ngOnInit(): void {
    this.fetchUploadedImages();
  }

  private fetchUploadedImages() {
    this.fileService.getAllSorted("sort=name").subscribe(value => {
      this.files = value;
      if (this.files) {
        this.fileId = this.files[0].id;
        this.changeImage(this.fileId);
      }
    }, onError => {
      this.utilityService.popupError(onError.error.message);
    });
  }


  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImageURL = reader.result as string;
    }
    reader.readAsDataURL(file)

    this.uploadForm.patchValue({
      file: file
    });
    this.uploadForm.get('file').updateValueAndValidity()
  }

  // Submit Form
  submit() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file').value);

    this.fileService.upload(formData).subscribe(onNext => {
      this.utilityService.popupSuccess("File Uploaded");
      this.previewImageURL = null;
      this.fetchUploadedImages();
    }, onError => {
      this.utilityService.popupError(onError.error.message);
    });
  }

  changeImage(value: any) {
    this.fileId = value;
    this.imageURL = this.fileService.getImage(value);
  }
}
