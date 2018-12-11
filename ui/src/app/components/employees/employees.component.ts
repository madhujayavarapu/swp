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

  fireEmployee(emp){
    var result = confirm("Are you sure you want to fire <b>"+emp.empName+"</b> ?");
    if(result){
      console.log("fire emp ",emp);
      let postData = {
        userId: emp.userId,
        companyId: emp.companyId
      }
      // this.authSrv.fireEmp().subscribe((res) => {
      //   if(res.success){
      //     this.utilsSrv.showToastMsg("success",res.msg, null);
      //     this.getEmployees();
      //   }else{
      //     this.utilsSrv.showToastMsg("warning",res.msg,null);
      //   }
      // },(err) => {
      //   this.utilsSrv.handleError(err);
      // })
    }else{
      this.getEmployees();
    }
  }


}
