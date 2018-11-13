import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(
    private utilsSrv: UtilsService
  ) { }

  ngOnInit() {
    this.utilsSrv.showToastMsg("success", "Employees page","Show all the employees details in this company.");
  }


}
