import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { UserService } from '../../services/user.service';
import { ConstantService } from '../../services/constant.service';

@Component({
  selector: 'app-reqcompany',
  templateUrl: './reqcompany.component.html',
  styleUrls: ['./reqcompany.component.css']
})
export class ReqcompanyComponent implements OnInit {

  companyName: String;
  establishedAt: Date;
  website: String;
  about: String = "";
  address: String = "";
  branches = [];
  awards = [{award: "",name:"award0"}];
  userId: String;
  locations:any[];
  maxDate: Date;
  dropdownSettings: Object;
  noPreviousRequests: Boolean = true;

  constructor(
    private router: Router,
    private utilsSrv: UtilsService,
    private authSrv: AuthService,
    private validateSrv: ValidateService,
    private userSrv: UserService,
    private constantSrv: ConstantService
  ) { }

  ngOnInit() {
   this.userId =  this.authSrv.getDetailsOfUser('userId');
   this.dropdownSettings = this.utilsSrv.getMultiSelectDropdownSettings();
   this.maxDate = new Date();
   this.checkAnyPreviousRequest();
  }

  checkAnyPreviousRequest(){
    let postData = {
      userId: this.userId
    }
    this.userSrv.checkPreviousRequest(postData).subscribe((res) => {
      if(res.success){
        this.noPreviousRequests = false;
        this.utilsSrv.showToastMsg("info", res.msg, "Please wait for the response");
      }else{
        this.noPreviousRequests = true;
        this.getLocations();
      }
    }, (err) => {
      this.utilsSrv.handleError(err);
    })
  }

  addAwardTextFiled(){
    let length = this.awards.length;
    if(this.awards[length-1].award == ""){
      this.utilsSrv.showToastMsg("info", "Enter award for previous one", null);
    }else{
      this.awards.push({award: "",name: "award"+length});
    }
  }

  popAwardTextFiled(){
    this.awards.pop();
  }

  getLocations(){
    this.constantSrv.getJobLocations().subscribe((res) => {
      if(res.success){
        this.locations = res.data;
      }else{
        this.locations = [];
        this.utilsSrv.showToastMsg("info",res.msg, null); 
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  getAwards(data){
    var t = [];
    data.forEach(element => {
      if(element.award != '')
        t.push(element.award);
    });
    return t;
  }
  
  sendRequest(){
    let requestData = {
      createdBy: this.userId,
      name: this.companyName,
      awards: this.getAwards(this.awards),
      branches: this.branches,
      website: this.website,
      establishedAt: this.establishedAt,
      about: JSON.stringify(this.about.toString().split('\n')),
      address: JSON.stringify(this.address.toString().split('\n'))
    }
    if(this.validateSrv.validateCompanyRequest(requestData)){
      this.userSrv.sentCompanyRequest(requestData).subscribe((res) => {
        let type = res.success ? "success" : "danger";
        this.utilsSrv.showToastMsg(type, res.msg, null);
        if(!!res.success){
          this.router.navigate(['/profile']);
        }
      },(err) => {
        this.utilsSrv.handleError(err);
      });
    }else{
      this.utilsSrv.showToastMsg("warning","Fill Details First", null);
    }
  }

}
