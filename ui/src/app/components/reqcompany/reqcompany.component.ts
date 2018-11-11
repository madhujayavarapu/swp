import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-reqcompany',
  templateUrl: './reqcompany.component.html',
  styleUrls: ['./reqcompany.component.css']
})
export class ReqcompanyComponent implements OnInit {

  companyName: String;
  website: String;
  about: String;
  address: String;
  award: String;
  branch: String;
  user: Object;

  constructor(
    private router: Router,
    private utilsSrv: UtilsService,
    private authSrv: AuthService,
    private validateSrv: ValidateService
  ) { }

  ngOnInit() {
   this.user =  this.authSrv.getDetailsOfUser('userId');
   console.log(this.user);
   
  }

  sendRequest(){
    let requestData = {
      createdBy: this.user,
      companyName: this.companyName,
      awards: [this.award],
      branches: [this.branch],
      website: this.website,
      about: this.about
    }
    if(this.validateSrv.validateCompanyRequest(requestData)){
      this.authSrv.sentCompanyRequest(requestData).subscribe((res) => {
        let type = res.success ? "success" : "danger";
        this.utilsSrv.showFlashMsg(res.msg, type);
        if(!!res.success){
          this.router.navigate(['/notifications']);
        }
      },(err) => {
        this.utilsSrv.handleError(err);
      });
    }else{
      this.utilsSrv.showFlashMsg("Fill Details First","danger");
    }
  }

}
