import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  username: String;
  password: String;
  cpassword: String;

  constructor(
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private validateSrv: ValidateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authSrv.logout();
  }

  registerUser(){
    let user = {
      username: this.username,
      password: this.password,
      cpassword: this.cpassword
    }
    if(this.validateSrv.validateRegisterDetails(user)){
      if(this.password == this.cpassword){
        this.authSrv.registerUser(user).subscribe((res) => {
          if(!!res.success){
            this.utilsSrv.showFlashMsg(res.msg,"success");
            this.router.navigate(['/login']);
          }else{
            this.utilsSrv.showFlashMsg(res.msg,"danger");
            this.router.navigate(['/register']);
          }
        },(err) => {
          this.utilsSrv.showFlashMsg(err.msg,"danger");
          this.router.navigate(['/register']);
        })
      }else{
        this.utilsSrv.showFlashMsg("Password doesn't match","danger");
        this.router.navigate(['/register']);
      }
    }else{
      this.utilsSrv.showFlashMsg("Fill Details First","danger");
      this.router.navigate(['/register']);
    }
  }

}
