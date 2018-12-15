import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { ConstantService } from '../../services/constant.service';

export interface dataObject{
  type: String,
  data: any,
  dropdownSettings: Object
}

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  showPersonalDetailsForm: Boolean = false;
  showSkillsForm: Boolean = false;
  showEducationDetailsForm: Boolean = false;
  showExperienceForm: Boolean = false;

  maxDate: Date;
  userId:String;
  personalInfo: Object;
  dob: Date;
  firstName: String;
  lastName: String;
  phone: String;
  mail: String;
  gender: String;
  country: String;
  state: String;
  district: String;
  mandal: String;
  village: String;
  pincode: String;

  // skills
  skills =  [];
  keySkills: any[];

  // Experinece
  expType: String;
  companyName: String;
  role: String;
  companyDuration: String;
  isExperienced: Boolean = false;
  firstExperience: Boolean = true;
  addExperienceForm: Boolean = false;

  // Education
  educationForm: Boolean = false;
  clg:String;
  board: String;
  type: String;
  branch: String;
  passedYear: String;
  percentage: String;

  // Resume
  resume: FileList;
  resumeForm: Boolean = false;

  constructor(
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private commonSrv: CommonService,
    private constantSrv: ConstantService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dataObject
  ) { }

  ngOnInit() {
    this.initData();
    this.userId = this.authSrv.getDetailsOfUser('userId');
  }

  close(): void {
    this.dialogRef.close();
  }

  getTechnicalSkills(){
    this.constantSrv.getTechnicalSkills().subscribe((res) => {
      if(res.success){
        this.skills = res.data;
      }else{
        this.skills = [];
      }
    })
  }

  initData(){
    if(this.data.type == "PersonalDetails"){
      this.showPersonalDetailsForm = true;
      this.maxDate = new Date();
      this.personalInfo = this.data.data;
      this.firstName = this.personalInfo["firstName"];
      this.lastName = this.personalInfo["lastName"];
      this.gender = this.personalInfo["gender"];
      this.mail = this.personalInfo["mail"];
      this.phone = this.personalInfo["phone"];
      this.dob = this.personalInfo["dob"];
      this.country = this.personalInfo["country"];
      this.state = this.personalInfo["state"];
      this.district = this.personalInfo["district"];
      this.mandal = this.personalInfo["mandal"];
      this.village = this.personalInfo["village"];
      this.pincode = this.personalInfo["pincode"];
    }else if(this.data.type == "Skills"){
      this.showSkillsForm = true;
      this.getTechnicalSkills();
      this.keySkills = this.data.data;
    }else if(this.data.type == "Experience"){
      this.showExperienceForm = true;
      this.expType = this.data.data.expType;
      this.isExperienced = this.expType == "Experienced" ? true : false;
      if(this.expType == "Fresher" && this.expType != undefined){
        this.firstExperience = true;
        this.companyDuration = "";
        this.companyName = "";
        this.role = "";
      }else if(this.expType == "Experienced" || this.expType == undefined){
        this.firstExperience = false;
        this.companyName = this.data.data.companyName;
        this.role = this.data.data.role;
        this.companyDuration = this.data.data.duration;
      }
    }else if(this.data.type == "Add Experience"){
      this.addExperienceForm = true;
      this.companyName = "";
      this.companyDuration = "-1";
      this.role = "";
    }else if(this.data.type == "SSC" || this.data.type == "PUC" || this.data.type == "UG"){
      this.educationForm = true;
      this.percentage = this.data.data.percentage;
      this.passedYear = this.data.data.passedYear;
      if(this.data.type == "SSC"){
        this.clg = this.data.data.school;
        this.board = this.data.data.board;
      }else{
        this.clg = this.data.data.clg;
        this.type = this.data.data.type;
        this.branch = this.data.data.branch;
      }
    }else if(this.data.type == "Resume"){
      this.resumeForm = true;
    }
  }

  fileChanged(event){
    this.resume = event.target.files;
  }

  uploadResume(){
    if(this.resume.length > 0){
      const file: File = this.resume[0];
      const formData: FormData = new FormData();
      formData.append('resume', file, file.name);
      let uid;
      uid = this.userId;
      formData.append('userId', uid);

      this.authSrv.uploadResume(formData).subscribe((res) => {
        if(res.success){
          this.utilsSrv.showToastMsg("success", "Uploaded Resume",null);
          this.close();
        }else{
          this.utilsSrv.showToastMsg("warning",res.msg,null);
        }
      },(err) => {
        if(err.status == 401){
          this.utilsSrv.showToastMsg("warning","Please Login First",null);
          this.authSrv.logout();
          this.router.navigate(['/login']);
        }else{
          this.utilsSrv.showToastMsg("warning","Error","File Too large Max size will be 2MB");
        }
      })
    }else{
      this.utilsSrv.showToastMsg("warning","Please Select File",null);
    }
  }

  changedExpType(){
    this.isExperienced = this.expType == "Experienced" ? true : false;
    this.companyDuration = this.isExperienced ? "-1" : "";
    if(this.expType == "Fresher"){
      this.companyDuration = "";
      this.companyName = "";
      this.role = "";
    }
  }

  deleteExperience(){
    let postData = {
      userId: this.userId,
      expId: this.data.data._id
    }
    this.authSrv.deleteExperience(postData).subscribe((res) => {
      if(res.success){
        this.utilsSrv.showToastMsg("success", res.msg, null);
        this.close();
      }else{
        this.utilsSrv.showToastMsg("warning",res.msg,null);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  updateExperience(){
    let exp = {
      _id: this.data.data._id,
      companyName: this.companyName,
      duration: this.companyDuration,
      role: this.role,
    }
    let postData = {
      userId: this.userId,
      expId: this.data.data._id,
      exp: exp
    }
    this.commonSrv.updateExperience(postData).subscribe((res) => {
      if(res.success){
        this.utilsSrv.showToastMsg("success", res.msg, null);
        this.close();
      }else{
        this.utilsSrv.showToastMsg("warning",res.msg,null);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  updateProfile(){
    let postData;
    if(this.data.type == "PersonalDetails"){
      postData = {
        personalDetails: {
          firstName: this.firstName,
          lastName: this.lastName,
          mail: this.mail,
          gender: this.gender,
          dob: this.dob,
          phone: this.phone,
          country: this.country,
          state: this.state,
          district: this.district,
          mandal: this.mandal,
          village: this.village,
          pincode: this.pincode,
        },
        userId: this.userId,
        type: this.data.type
      };
    }else if(this.data.type == "Skills"){
      postData = {
        technicalSkills: this.keySkills,
        userId: this.userId,
        type: this.data.type
      };
    }else if(this.data.type == "Experience"){
      postData = {
        experience: {
          expType: this.expType,
          experiences: []
        },
        userId: this.userId,
        type: this.data.type
      }
      if(postData.experience.expType == "experienced"){
        var obj ={
          _id: 1,
          companyName: this.companyName,
          role: this.role,
          duration: this.companyDuration
        };
        postData.experience.experiences.push(obj);
      }
    }else{
      postData = {};
    }
    
    this.commonSrv.updateProfile(postData).subscribe((res) => {
      let css = res.success == true ? "success" : "warning";
      this.utilsSrv.showToastMsg(css, res.msg, null);
      if(res.success){
        this.close();
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  addExperience(){
    var obj ={
      _id: this.data.data+1,
      companyName: this.companyName,
      role: this.role,
      duration: this.companyDuration
    };
    let postData = {
      userId: this.userId,
      experience: obj
    }
    this.commonSrv.addExperienceToProfile(postData).subscribe((res) =>{
      if(res.success){
        this.utilsSrv.showToastMsg("success", res.msg, null);
        this.close();
      }else{
        this.utilsSrv.showToastMsg("warning",res.msg,null);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    });
  }

  updateEducation(){
    let updatedDetails = {
      percentage: this.percentage,
      passedYear: this.passedYear
    }
    if(this.data.type == "SSC"){
      updatedDetails["school"] = this.clg;
      updatedDetails["board"] = this.board;
    }else{
      updatedDetails["clg"] = this.clg;
      updatedDetails["type"] = this.type;
      updatedDetails["branch"] = this.branch;
    }
    let postData = {
      userId: this.userId,
      updatedDetails: updatedDetails,
      type: this.data.type
    } 
    this.commonSrv.updateEducation(postData).subscribe((res) => {
      if(res.success){
        this.utilsSrv.showToastMsg("success", res.msg, null);
        this.close();
      }else{
        this.utilsSrv.showToastMsg("warning",res.msg,null);
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  

}
