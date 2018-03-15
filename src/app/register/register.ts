import {Component, Inject} from '@angular/core';
import { RegisterService } from '../service/register.service';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../models/user';
/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'register',
  templateUrl: './register.html'
  // styleUrls: ['sidenav-disable-close-example.css'],
})

export class Register {
  isLinear = true;
  user:any = {};
  merged:any = {};
  formGroup : FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  get formArrayUser(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder, private registerService: RegisterService) { }

  registerUser() {
    
    if (this.fourthFormGroup.value.password == this.fourthFormGroup.value.passwordConfirm) {
      delete this.fourthFormGroup.value.passwordConfirm;
      this.merged = Object.assign(this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value, this.fourthFormGroup.value);
    }
    // console.log("i will merge the json objects",  this.merged);
    if(!this.formGroup.get('formArray')){ 
      return; 
    } else {
      return this.registerService.register(this.merged);
    }
  }
 
  ngOnInit() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this.firstFormGroup = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            telephone: ['', Validators.required]
        }),
        this.secondFormGroup = this._formBuilder.group({
          email: ['', Validators.required]
        }),
        this.thirdFormGroup = this._formBuilder.group({
          userName: ['', Validators.required]
        }),
        this.fourthFormGroup = this._formBuilder.group({
          password: ['', Validators.required],
          passwordConfirm: ['', Validators.required]
        }),
      ])
    });
  }
}
