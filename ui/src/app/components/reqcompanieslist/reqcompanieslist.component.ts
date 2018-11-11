import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-reqcompanieslist',
  templateUrl: './reqcompanieslist.component.html',
  styleUrls: ['./reqcompanieslist.component.css']
})
export class ReqcompanieslistComponent implements OnInit {

  requests: any[];
  noData: Boolean = false;

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private utilsSrv: UtilsService

  ) { }

  ngOnInit() {
    this.getRequests();
  }

  acceptRequest(company){
    let postData = {
      userId: company.createdBy,
      companyId: company._id
    }
    this.authSrv.acceptCompanyRequest(postData).subscribe((res) => {
      if(!!res.success){
        this.utilsSrv.showFlashMsg("Accepted Request", "success");
        this.router.navigate(['/profile']);
      }else{
        this.utilsSrv.showFlashMsg(res.msg,"danger");
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  getRequests(){
    this.authSrv.getCompanyRequests().subscribe((res) => {
      console.log(res);
      if(!!res.success){
        this.noData = false;
        this.requests = res.companies;
      }else{
        this.noData = true;
      }
    },(err) => {
      console.log(err);
    })
  }

}
