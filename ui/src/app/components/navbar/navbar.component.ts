import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username: String;
  user: Object;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private utilsSrv: UtilsService
  ) {
    router.events.subscribe((val) => {
      this.getUserDetails();
    })
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    if(this.authSrv.isLoggedIn()){
      this.username = this.authSrv.getDetailsOfUser("username");
      this.user = this.authSrv.getDetailsOfUser("all");
    }
  }

  onLogout(){
    this.authSrv.logout();
    this.utilsSrv.showFlashMsg("You are logged out","success");
    this.router.navigate(['/login']);
    return false;
  }
}
