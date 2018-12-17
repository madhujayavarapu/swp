import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private adminSrv: AdminService,
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // getThumbnailsData(){
  //   this.adminSrv.getThumbnailData().subscribe((res) => {

  //   },(err) => {
  //     this.utilsSrv.handleError(err);
  //   })
  // }

}
