import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.css']
})
export class FindjobComponent implements OnInit {

  jobsList: any[];
  data: Boolean = false;

  constructor(
    private utilsSrv: UtilsService,
    private authSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAvailableJobs();
  }
  currentDate = new Date();

  getAvailableJobs(){
    let postData = {
      userId : this.authSrv.getDetailsOfUser('userId')
    }
    this.authSrv.getAvailableJobs(postData).subscribe((res) => {
      if(res.success){
        this.jobsList = res.data;
        this.data = true;
      }else{
        this.utilsSrv.showToastMsg("warning","Find Jobs",res.msg);
        this.data = false;
      }
    },(err) => {
      this.utilsSrv.handleError(err);
      this.data = false
    })
  }

  applyForThisJob(company){
    let postData = {
      userId: this.authSrv.getDetailsOfUser('userId'),
      jobId: company._id
    }
    this.authSrv.applyForJob(postData).subscribe((res) => {
      if(res.success){
        this.utilsSrv.showToastMsg("success","Apply for Job", res.msg);
        this.utilsSrv.reloadCurrentState();
      }else{
        this.utilsSrv.showToastMsg("warning","Apply for Job", res.msg);
        this.utilsSrv.reloadCurrentState();
      }
    },(err) => {
      this.utilsSrv.showToastMsg("warning","Apply For Job","Something went wrong");
    })
  }

}
