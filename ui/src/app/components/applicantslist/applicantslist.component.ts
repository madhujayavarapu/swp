import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AcceptjobrequestComponent } from '../acceptjobrequest/acceptjobrequest.component';

@Component({
  selector: 'app-applicantslist',
  templateUrl: './applicantslist.component.html',
  styleUrls: ['./applicantslist.component.css']
})
export class ApplicantslistComponent implements OnInit {

  jobId: String;
  applicantsList: any[];
  data: Boolean = false;
  throbber = "none";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.jobId = this.route.snapshot.params['jobId'];
    this.getApplicants();
  }

  openDialog(company): void {
    const dialogRef = this.dialog.open(AcceptjobrequestComponent, {
      width: '75%',
      data: {
        "jobId": company._id,
        "userId": company.applied,
        "username": company.userinfo[0].username,
        "userRole": company.userinfo[0].role
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getApplicants();
    });
  }

  rejectApplicant(user){
    this.throbber = "block";
    let postData = {
      userId: user.applied,
      jobId: user._id
    }
    this.authSrv.rejectApplicant(postData).subscribe((res) => {
      if(res.success){
        this.utilsSrv.showToastMsg("success",res.msg,null);
        this.getApplicants();
        this.throbber = "none";
      }else{
        this.utilsSrv.showToastMsg("danger",res.msg,null);
        this.getApplicants();
        this.throbber = "none";
      }
    },(err) => {
      this.utilsSrv.handleError(err);
      this.throbber = "none";
    })
  }

  getApplicants(){
    let postData = {
      jobId: this.jobId
    };
    this.throbber = "block";
    this.authSrv.getAppliedCandidateForjob(postData).subscribe((res) => {
      if(res.success){
        this.applicantsList = res.data;
        this.data = this.applicantsList.length == 0 ? false : true;
        this.throbber = "none";
      }else{
        this.data = false;
        this.utilsSrv.showToastMsg("warning",res.msg,null);
        this.throbber = "none";
      }
    },(err) => {
      this.data = false
      this.utilsSrv.handleError(err);
      this.throbber = "none";
    });
  }

}
