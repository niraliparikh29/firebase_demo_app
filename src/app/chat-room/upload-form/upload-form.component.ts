import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';
import { Upload } from 'src/app/model/upload.model';
import * as _ from "lodash";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  selectedFiles: FileList;
  currentUpload: Upload;
  paramValue: string;

  constructor(private uploadService: UploadService, private route: ActivatedRoute) { 
    this.route.params.subscribe((params) => {
      this.paramValue = params.groupName;
    })
  }

  ngOnInit() {
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.uploadService.pushUpload(this.currentUpload, this.paramValue);
  }

  uploadMultiple() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.uploadService.pushUpload(this.currentUpload, this.paramValue);
    });
  }

}
