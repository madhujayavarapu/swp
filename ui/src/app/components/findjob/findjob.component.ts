import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-findjob',
  templateUrl: './findjob.component.html',
  styleUrls: ['./findjob.component.css']
})
export class FindjobComponent implements OnInit {

  jobsList: any[];
  data: Boolean = false;
  canApply:Boolean = false;

  detailsForJob: any;

  constructor(
    private utilsSrv: UtilsService,
    private authSrv: AuthService,
    private userSrv: UserService,
    private commonSrv: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getAvailableJobs();
    this.checkProfileExists();
  }
  currentDate = new Date();

  formatJobsList(data){
    data.forEach(element => {
      element.about = JSON.parse(element.about);
      element.contactDetails = JSON.parse(element.contactDetails);
      element.qualification = JSON.parse(element.qualification);
    });
    return data;
  }

  getAvailableJobs(){
    let postData = {
      userId : this.authSrv.getDetailsOfUser('userId')
    }
    this.userSrv.findJobsForUser(postData).subscribe((res) => {
      if(res.success){
        this.jobsList = this.formatJobsList(res.data);
        // this.detailsForJob = this.jobsList[0];
        this.data = this.jobsList.length == 0 ? false : true;
      }else{
        this.utilsSrv.showToastMsg("warning","Find Jobs",res.msg);
        this.data = false;
      }
    },(err) => {
      this.utilsSrv.handleError(err);
      this.data = false
    })
  }

  back(){
    this.detailsForJob = undefined;
  }

  checkProfileExists(){
    let postData = {
      userId: this.authSrv.getDetailsOfUser('userId')
    }
    this.commonSrv.getUserProfile(postData).subscribe((res) => {
      if(res.success){
        if(res.data.length == 0){
          this.utilsSrv.showToastMsg("warning","You Can't Apply For Jobs","Please Update Profile First");
          this.router.navigate(['/profile']);
          this.canApply = false;
        }else{
          this.canApply = true;
          this.getAvailableJobs();
        }
      }else{
        this.utilsSrv.showToastMsg("warning",res.msg,"Please Update Profile First");
        this.canApply = false;
      }
    },(err) => {
      this.utilsSrv.handleError(err);
      this.canApply = false;
    })
  }

  viewJobDetails(job){
    this.detailsForJob = job;
    window.scrollTo(0, 0);
  }

  applyForJob(job){
    let postData = {
      userId: this.authSrv.getDetailsOfUser('userId'),
      jobId: job._id,
      companyId: job.companyId,
      status: 1
    }
    if(this.canApply){
      this.userSrv.applyForJob(postData).subscribe((res) => {
        if(res.success){
          this.utilsSrv.showToastMsg("success","Applied for Job", res.msg);
          this.getAvailableJobs();
        }else{
          this.utilsSrv.showToastMsg("warning", res.msg, null);
          this.getAvailableJobs();
        }
      },(err) => {
        this.utilsSrv.handleError(err);
        this.getAvailableJobs();
      })
    }else{
      this.utilsSrv.showToastMsg("warning","You Can't Apply For Jobs","Please Update Profile First");
      this.router.navigate(['/profile']);
    }
  }

}
