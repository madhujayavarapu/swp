import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  companyId;
  employees: any[];

  constructor(
    private utilsSrv: UtilsService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.companyId = this.authSrv.getDetailsOfUser('entityId');
    this.getEmployees();
  }

  getEmployees(){
    console.log("get Employee");
    let postData = {
      "companyId": this.companyId
    }
    console.log(postData);
    
    this.authSrv.getEmpUnderCompany(postData).subscribe((res) => {
      if(res.success){
        this.employees = res.data;
        console.log(this.employees);
      }else{
        this.utilsSrv.showToastMsg("warning","Employees List",res.msg);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }


}
