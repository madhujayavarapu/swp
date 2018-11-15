import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-acceptjobrequest',
  templateUrl: './acceptjobrequest.component.html',
  styleUrls: ['./acceptjobrequest.component.css']
})
export class AcceptjobrequestComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AcceptjobrequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
