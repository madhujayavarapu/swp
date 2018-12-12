import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-releasednotifications',
  templateUrl: './releasednotifications.component.html',
  styleUrls: ['./releasednotifications.component.css']
})
export class ReleasednotificationsComponent implements OnInit {

  notifications: any[];
  data: Boolean = false;
  showDetails = false;
  detailsData: any;

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private utilsSrv: UtilsService
  ) { }

  ngOnInit() {
    this.getReleasedNotifications();
  }
  
  getReleasedNotifications(){
    let postData = {
      companyId : this.authSrv.getDetailsOfUser('entityId')
    }
    this.authSrv.releasedJobNotifications(postData).subscribe((res) => {
      if(res.success){
        this.notifications = res.data;
        this.data = true;
      }else{
        this.utilsSrv.showToastMsg("info",res.msg, null);
        this.data = false;
      }
    },(err) => {
      this.utilsSrv.handleError(err);
      this.data = false;
    })
  }

  editPost(company){
    console.log(company);
    console.log("edit post");
  }

  showDetailsOfPost(post){
    this.showDetails = true;
    this.detailsData = post;
  }

  deletePost(company){
    console.log("delete post", company);
  }

  appliedCandidates(company){
    this.router.navigate(['jobs/applicants',company._id]);
  }

}
