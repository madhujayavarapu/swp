import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

export interface dataObject{
  username: String;
  userId: String;
  jobId: String;
}

@Component({
  selector: 'app-acceptjobrequest',
  templateUrl: './acceptjobrequest.component.html',
  styleUrls: ['./acceptjobrequest.component.css']
})
export class AcceptjobrequestComponent implements OnInit {

  empType: String = "-1";
  empRole: String = "-1";
  duration: String = "-1";
  salary: String;
  branch: String = "-1";
  branches: any[];
  username: String;
  companyId: String;
  jobId: String;
  companyName: String;

  constructor(
    private utilsSrv: UtilsService,
    private router: Router,
    private validateSrv: ValidateService,
    private authSrv: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AcceptjobrequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataObject
  ) { }

  ngOnInit() {
    this.username = this.data.username;
    this.jobId = this.data.jobId;
    this.companyId = this.authSrv.getDetailsOfUser('entityId');
    this.getBranchesUnderThisCompany();
    this.getJobDetails();
  }

  getJobDetails(){
    let postData = {
      jobId: this.jobId
    }
    this.authSrv.getJobDetails(postData).subscribe((res) => {
      if(res.success){
        console.log(res);
        this.empRole = res.data.jobRole;
        this.empType = res.data.jobType;
        this.duration = res.data.jobDuration;
        this.branch = res.data.location[0];
        this.salary = res.data.salary;
      }else{
        this.utilsSrv.showToastMsg("info",res.msg, null);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  getBranchesUnderThisCompany(){
    let postData = {
      companyId: this.companyId
    }
    this.authSrv.getBranchesUnderCompany(postData).subscribe((res) => {
      if(res.success){
        this.branches = res.data[0].branches;
        this.companyName = res.data[0].companyName;
      }else{
        this.utilsSrv.showToastMsg("warning","Branches","Failed to get branches");
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  hire(){

    let jobDetails = {
      empRole: this.empRole,
      empType: this.empType,
      duration: this.duration,
      branch: this.branch,
      companyId: this.companyId,
      joiningDate: new Date(),
      empName: this.username,
      userId: this.data.userId,
      salary: this.salary,
      jobId: this.jobId
    }


    this.authSrv.HireApplicant(jobDetails).subscribe((res) =>{
      if(res.success){
        
        this.utilsSrv.showToastMsg("success","Hired Applicant",null);
        // this.utilsSrv.reloadCurrentState();
      }else{
        this.utilsSrv.showToastMsg("info", res.msg, null);
      }
    },(err)=> {
      
      this.utilsSrv.handleError(err);
    })
    
  }
}
