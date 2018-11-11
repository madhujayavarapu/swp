import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private validateSrv: ValidateService,
    private utilsSrv: UtilsService
  ) { }

  ngOnInit() {
    this.authSrv.logout();
  }

  authenticateUser(){
    let user = {
      username: this.username,
      password: this.password
    }
    
    if(this.validateSrv.validateUser(user)){
      this.authSrv.authenticateUser(user).subscribe((res) => {
          if(!!res.success){
            this.authSrv.storeUserData(res.token,res.user);
            this.utilsSrv.showFlashMsg("Login Successfully","success");
            this.router.navigate(['/profile']);
          }else{
            this.utilsSrv.showFlashMsg(res.msg,"danger");
          }
        },(err) => {
          this.router.navigate(['/login']);
        })
    }else{
      this.utilsSrv.showFlashMsg("Fill Details first","danger");
    }
  }
}
