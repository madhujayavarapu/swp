import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { AdminService } from '../../services/admin.service';

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
    private utilsSrv: UtilsService,
    private adminSrv: AdminService
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  acceptRequest(company){
    let postData = {
      userId: company.createdBy,
      companyId: company._id
    }
    this.adminSrv.acceptCompanyRequest(postData).subscribe((res) => {
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

  formatResponse(data){
    data.forEach(element => {
      element.about = JSON.parse(element.about);
      element.address = JSON.parse(element.address);
    });
    return data;
  }

  getRequests(){
    this.adminSrv.getCompanyRequests().subscribe((res) => {
      
      if(!!res.success){
        this.requests = this.formatResponse(res.companies);
        this.noData = res.companies.length > 0 ? false : true;
      }else{
        this.noData = true;
      }
    },(err) => {
      console.log(err);
      this.noData = true;
    })
  }

}
