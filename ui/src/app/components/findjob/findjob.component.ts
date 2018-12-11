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
  canApply:Boolean = false;

  constructor(
    private utilsSrv: UtilsService,
    private authSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAvailableJobs();
    this.checkProfileExists();
  }
  currentDate = new Date();

  getAvailableJobs(){
    let postData = {
      userId : this.authSrv.getDetailsOfUser('userId')
    }
    this.authSrv.getAvailableJobs(postData).subscribe((res) => {
      if(res.success){
        this.jobsList = res.data;
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

  checkProfileExists(){
    let postData = {
      userId: this.authSrv.getDetailsOfUser('userId')
    }
    this.authSrv.getProfileData(postData).subscribe((res) => {
      if(res.success){
        if(res.data.length == 0){
          this.utilsSrv.showToastMsg("warning","You Can't Apply For Jobs","Please Update Profile First");
          this.router.navigate(['/profile']);
          this.canApply = false;
        }else{
          this.canApply = true;
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

  applyForThisJob(company){
    let postData = {
      userId: this.authSrv.getDetailsOfUser('userId'),
      jobId: company._id
    }
    if(this.canApply){
      this.authSrv.applyForJob(postData).subscribe((res) => {
        if(res.success){
          this.utilsSrv.showToastMsg("success","Apply for Job", res.msg);
          this.getAvailableJobs();
        }else{
          this.utilsSrv.showToastMsg("warning","Apply for Job", res.msg);
          this.getAvailableJobs();
        }
      },(err) => {
        this.utilsSrv.showToastMsg("warning","Apply For Job","Something went wrong");
        this.getAvailableJobs();
      })
    }else{
      this.utilsSrv.showToastMsg("warning","You Can't Apply For Jobs","Please Update Profile First");
      this.router.navigate(['/profile']);
    }
  }

}
