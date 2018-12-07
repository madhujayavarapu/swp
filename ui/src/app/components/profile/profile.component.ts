import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isLinear = false;
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
  fileList: FileList
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 'All',
    allowSearchFilter: true,
    enableCheckAll: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private locationSrv: LocationService,
    private authSrv: AuthService
  ) { }

  ngOnInit() {
    this.inItData();
    this.getCountriesInInd();
  }

  getCountriesInInd(){
    this.locationSrv.getCountriesListInInd().subscribe((res) =>{
      res = JSON.parse(res);
      this.districts = res.RestResponse.result;
    },(err)=>{
      console.log(err);
    });
  }

  inItData(){
    this.maxDate = new Date();
    this.personalDetailsForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      state: new FormControl({ value: 'INDIA', disabled: true }),
      district: "",
      mandal: "",
      village: "",
      pincode: "",
      gender: "",
      mail: "",
      phone: "",
      dob: new FormControl({value:'', disabled: true})
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
    this.dropdownList = [
      { id: 'C', name: 'C' },
      { id: 'Java', name: 'Java' },
      { id: 'C++', name: 'C++' },
      { id: 'Python', name: 'Python' },
      { id: 'Angular Js', name: 'Angular Js'},
      { id: 'C#', name: 'C#'},
      { id: 'Web Development', name: 'Web Development'},
      { id: 'Angular 2', name: 'Angular 2'},
      {id: 'Javascript', name: 'Javascript'},
      {id: 'Angular 4',name:'Angular 4'},
      {id: 'Angular 5',name: 'Angular 5'},
      {id: 'Angular 6',name:'Angular 6'},
      {id: 'NodeJs',name: 'NodeJs'},
      {id: 'Ruby', name: 'Ruby'},
      {id: 'MySQL', name:'MySQL'},
      {id: 'MongoDB', name:'MongoDB'}
    ];
    this.expType = [
      {value: 'fresher', name: 'Fresher'},
      {value: 'experienced', name: 'Experienced'}
    ]
  }

  expTypeChanged(value){
    this.showExperienceForm = value == 'experienced' ? true : false;    
  }

  uploadResume(event){
    this.fileList = event.target.files;
  }



  updateProfile(){
    let userId = this.authSrv.getDetailsOfUser('userId');
    console.log(this.fileList);
    
    if(this.fileList.length > 0){

      let personalInfo = JSON.stringify(this.personalDetailsForm.value);
      let technicalInfo = JSON.stringify(this.technicalFormGroup.value);
      let experienceInfo = JSON.stringify(this.experienceForm.value);
      let educationInfo = JSON.stringify(this.educationalDetailsForm.value);
      const file: File = this.fileList[0];
      const formData: FormData = new FormData();
      formData.append('resume', file, file.name);
      formData.append('personalInfo', personalInfo);
      formData.append('educationalInfo', educationInfo);
      formData.append('technicalInfo', technicalInfo);
      formData.append('experienceInfo',experienceInfo);
      formData.append('userId',userId);
      console.log(formData);
      
      this.authSrv.uploadProfileDetails(formData).subscribe((res) => {
        console.log(res);
      },(err) => {
        console.log(err);
      })
    }else{
      let postData = {
        personalInfo: this.personalDetailsForm.value,
        educationalInfo: this.educationalDetailsForm.value,
        technicalInfo: this.technicalFormGroup.value,
        experinceInfo: this.experienceForm.value
      }
      console.log(postData);
    }
  }

}
