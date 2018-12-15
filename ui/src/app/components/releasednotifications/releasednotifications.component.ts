import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { CompanyAdminService } from '../../services/companyAdmin.service';

@Component({
  selector: 'app-releasednotifications',
  templateUrl: './releasednotifications.component.html',
  styleUrls: ['./releasednotifications.component.css']
})
export class ReleasednotificationsComponent implements OnInit {

  notifications: any[];
  data: Boolean = false;
  showDetails = false;
  detailsForJob: any;

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private companyAdminSrv: CompanyAdminService
  ) { }

  ngOnInit() {
    this.getReleasedNotifications();
  }
  
  formatJobsList(data){
    data.forEach(element => {
      element.about = JSON.parse(element.about);
      element.contactDetails = JSON.parse(element.contactDetails);
      element.qualification = JSON.parse(element.qualification);
    });
    return data;
  }

  getReleasedNotifications(){
    let postData = {
      companyId : this.authSrv.getDetailsOfUser('entityId')
    }
    this.companyAdminSrv.releasedJobNotifications(postData).subscribe((res) => {
      if(res.success){
        this.notifications = this.formatJobsList(res.data);
        this.data = this.notifications.length > 0 ? true : false;
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
    this.detailsForJob = post;
  }

  deletePost(company){
    console.log("delete post", company);
  }

  appliedCandidates(company){
    this.router.navigate(['jobs/applicants',company._id]);
  }

}
