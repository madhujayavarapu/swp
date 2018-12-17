import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AcceptjobrequestComponent } from '../acceptjobrequest/acceptjobrequest.component';
import { CompanyAdminService } from '../../services/companyAdmin.service';

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
  color = 'primary';
  applicantsType: String;
  disabled = false;
  type = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authSrv: AuthService,
    private companyAdminSrv: CompanyAdminService,
    private utilsSrv: UtilsService,
    private dialog: MatDialog
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.params['jobId'];
    this.applicantsType = this.route.snapshot.params['type'];
    this.type = this.applicantsType == "shortlisted" ? true : false;
    this.getApplicants();
  }

  openDialog(company): void {
    const dialogRef = this.dialog.open(AcceptjobrequestComponent, {
      width: '75%',
      height: '80%',
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

  changeType(){
    this.applicantsType = this.type ? "shortlisted" : "applicants";
    this.router.navigate(['/', 'jobs', 'applicants',this.jobId, this.applicantsType]);
  }

  shortListApplicant(user){
    this.throbber = "block";
    let postData = {
      applicantId: user.applicantId
    }
    this.companyAdminSrv.shortListApplicant(postData).subscribe((res) => {
      if(res.success){
        this.utilsSrv.showToastMsg("success", res.msg, null);
        this.getApplicants();
      }else{
        this.utilsSrv.showToastMsg("warning",res.msg,null);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  formatUsersData(data){
    data.forEach(record => {
      if(record.resume != undefined){
        record.resume = this.utilsSrv.formatResumeFilePath(record.resume);
      }
    });
    return data;
  }

  getExperience(data){
    var length = data.length;
    var exp = data[length-1].duration+" exp as "+data[length-1].role+" at "+ data[length-1].companyName;
    return exp;
  }

  getApplicants(){
    let postData = {
      jobId: this.jobId,
      type: this.applicantsType
    };
    this.throbber = "block";
    this.companyAdminSrv.getApplicantsForjob(postData).subscribe((res) => {
      if(res.success){
        this.applicantsList = this.formatUsersData(res.data);
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
