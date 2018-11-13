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

  constructor(
    private utilsSrv: UtilsService,
    private authSrv: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAvailableJobs();
  }

  getAvailableJobs(){
    this.authSrv.getAvailableJobs().subscribe((res) => {
      if(res.success){
        this.jobsList = res.data;
        console.log(this.jobsList);
        
      }else{
        this.utilsSrv.showToastMsg("warning","Find Jobs",res.msg);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  applyForThisJob(company){
    console.log("apply for this job",company.companyName," and role was ",company.jobRole);
  }

}
