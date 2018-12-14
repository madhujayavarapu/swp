import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EditprofileComponent } from '../editprofile/editprofile.component';
import { RESUMEURL } from '../../url';
import { CommonService } from '../../services/common.service';
import { ConstantService } from '../../services/constant.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLinear = false;
  panelOpenState = false;
  userId;
  isProfileSubmitted: Boolean = false;
  profileData: Object;
  personalDetailsForm: FormGroup;
  educationalDetailsForm: FormGroup;
  experienceForm: FormGroup;
  technicalFormGroup: FormGroup;
  resumeForm: FormGroup;
  maxDate: Date;
  expType = [];
  showExperienceForm: Boolean = false;
  districts: any[];
  dropdownList = [];
  fileList: FileList;
  // throb: String = "none";
  dropdownSettings:Object;

  constructor(
    private formBuilder: FormBuilder,
    private locationSrv: LocationService,
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private commonSrv: CommonService,
    private dialog: MatDialog,
    private constantSrv: ConstantService
  ) { }

  ngOnInit() {
    this.inItData();
    this.userId = this.authSrv.getDetailsOfUser('userId');
    this.getUserProfile();
    this.getCountriesInInd();
  }

  editData(details, detailsType): void {
    const dialogRef = this.dialog.open(EditprofileComponent, {
      width: '75%',
      height: "90vh",
      data: {
        type: detailsType,
        data: details,
        settings: this.dropdownSettings
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserProfile();
    });
  }

  getCountriesInInd(){
    
    this.locationSrv.getCountriesListInInd().subscribe((res) =>{
      this.districts = res.data;
    },(err)=>{
      console.log(err);
    });
  }

  getValueFromObject(data,key){    
    let dataKey = Object.keys(data)[0];
    if(key == 'key'){
      return dataKey;
    }else{
      return data[dataKey][key];
    }
  }

  formatResumeFilePath(data){
    var resume = data.resume;
    // resume = resume.split('/');
    // resume = resume.slice(-1).join();
    resume = RESUMEURL+resume;
    data.resume = resume;
    return data;
  }

  getUserProfile(){
    let postData = {
      userId: this.userId
    }
    this.commonSrv.getUserProfile(postData).subscribe((res) => {
      if(res.success && res.data.length != 0){
        this.isProfileSubmitted = true;
        this.profileData = this.formatResumeFilePath(res.data[0]);
      }else{
        this.isProfileSubmitted = false;
        this.getTechnicalSkills()
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  inItData(){
    this.dropdownSettings = this.utilsSrv.getMultiSelectDropdownSettings();
    this.maxDate = new Date();
    this.personalDetailsForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      country: new FormControl({ value: 'INDIA', disabled: true }),
      state: "",
      district: "",
      mandal: "",
      village: "",
      pincode: "",
      gender: "",
      mail: "",
      phone: "",
      dob: new FormControl({value:''})
    });
    this.educationalDetailsForm = this.formBuilder.group({
      sscPercentage: "",
      sscSchool: "",
      sscPassedYear: "",
      sscBoard: "",
      pucClg: "",
      pucPercentage: "",
      pucPassedYear: "",
      pucBranch: "",
      pucType: "",
      ugClg: "",
      ugPercentage: "",
      ugPassedYear: "",
      ugBranch: "",
      ugType: ""
    });
    this.technicalFormGroup = this.formBuilder.group({
      keySkills: []
    })
    this.experienceForm = this.formBuilder.group({
      expType: "",
      companyName: "",
      companyDuration: "",
      role: ""
    })
    this.resumeForm = this.formBuilder.group({
      resume: ""
    })
    this.expType = [
      {value: 'fresher', name: 'Fresher'},
      {value: 'experienced', name: 'Experienced'}
    ]
  }

  getTechnicalSkills(){
    this.constantSrv.getTechnicalSkills().subscribe((res) => {
      if(res.success){
        this.dropdownList = res.data;
      }else{
        this.dropdownList = [];
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  expTypeChanged(value){
    this.showExperienceForm = value == 'experienced' ? true : false;    
  }

  uploadResume(event){
    this.fileList = event.target.files;
  }

  formatEducationDetails(educationDetails){
    let ssc = {
      "school": educationDetails.sscSchool,
      "percentage": educationDetails.sscPercentage,
      "board": educationDetails.sscBoard,
      "passedYear": educationDetails.sscPassedYear
    };
    let puc = {
      "clg": educationDetails.pucClg,
      "branch": educationDetails.pucBranch,
      "percentage": educationDetails.pucPercentage,
      "type": educationDetails.pucType,
      "passedYear": educationDetails.pucPassedYear
    };
    let ug = {
      "clg": educationDetails.ugClg,
      "branch": educationDetails.ugBranch,
      "percentage": educationDetails.ugPercentage,
      "type": educationDetails.ugType,
      "passedYear": educationDetails.ugPassedYear
    };

    let educationInfo = {
      "ssc": ssc,
      "puc": puc,
      "ug": ug
    }
    return educationInfo;
  }

  updateProfile(){
    if(this.fileList != undefined && this.fileList.length > 0){
      this.personalDetailsForm.value.country = "INDIA";
      let personalInfo = JSON.stringify(this.personalDetailsForm.value);
      let technicalInfo = JSON.stringify(this.technicalFormGroup.value);
      let experienceInfo = JSON.stringify(this.experienceForm.value);
      let educationInfo = JSON.stringify(this.formatEducationDetails(this.educationalDetailsForm.value));

      const file: File = this.fileList[0];
      const formData: FormData = new FormData();
      formData.append('resume', file, file.name);
      formData.append('personalInfo', personalInfo);
      formData.append('educationalInfo', educationInfo);
      formData.append('technicalInfo', technicalInfo);
      formData.append('experienceInfo',experienceInfo);
      formData.append('userId',this.userId);
      
      this.commonSrv.createProfile(formData).subscribe((res) => {
        if(res.success){
          this.isProfileSubmitted = true;
          this.getUserProfile();
          this.utilsSrv.showToastMsg("success","Profile","Submitted");
        }else{
          this.utilsSrv.showToastMsg("info",res.msg,null);
        }
      },(err) => {
        this.utilsSrv.handleError(err);
      })
    }else{
      this.utilsSrv.showToastMsg("info","Please Select your resume",null);
    }
  }

}
