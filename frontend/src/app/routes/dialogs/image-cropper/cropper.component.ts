import {Component, Inject, OnInit} from '@angular/core';
import {CropperSettings} from "ng2-img-cropper";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";



@Component ({
  selector: 'app-cropper',
  templateUrl: 'cropper.component.html',
  styleUrls: ['cropper.component.scss'],
})

export class CropperComponent implements OnInit {

  imgData: any;
  cropperSettings: CropperSettings;


  constructor(public router: Router,
               public dialogRef: MatDialogRef<CropperComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {

    this.cropperSettings = new CropperSettings;
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth =100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.rounded = true;
    this.cropperSettings.canvasWidth = 256;
    this.cropperSettings.canvasHeight = 256;
    this.cropperSettings.fileType = 'image/jpeg'; // has to be jpeg
    this.imgData = {};

  }

  ngOnInit() {
  }

  sendImage() {
    this.dialogRef.close();
  }

  CloseCropper() {
    this.dialogRef.close();
  }
}
