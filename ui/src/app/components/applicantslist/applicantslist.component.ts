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
        "username": company.userinfo[0].username
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  acceptApplicant(user){
    let postData = {
      userId: user.applied,
      companyId: this.authSrv.getDetailsOfUser('entityId'),
      jobId: user._id
    }
    console.log(postData);

  }

  getApplicants(){
    let postData = {
      jobId: this.jobId
    };
    this.authSrv.getAppliedCandidateForjob(postData).subscribe((res) => {
      if(res.success){
        this.applicantsList = res.data;
        this.data = this.applicantsList.length == 0 ? false : true;
      }else{
        this.data = false;
        this.utilsSrv.showToastMsg("warning",res.msg,null);
      }
    },(err) => {
      this.data = false
      this.utilsSrv.handleError(err);
    });
  }

}
