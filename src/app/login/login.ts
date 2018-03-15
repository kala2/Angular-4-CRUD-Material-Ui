import {Component, Inject} from '@angular/core';
import { LoginService } from '../service/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

/** @title Sidenav with custom escape and backdrop click behavior */
@Component({
  selector: 'login',
  templateUrl: './login.html'
  // styleUrls: ['sidenav-disable-close-example.css'],
})

export class Login {
  promiseSetBySomeAction:any;
  loginFormGroup: FormGroup;
  private formSubmitAttempt: boolean;
  returnUrl: string;

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }


  onHandleSubmit(user: any) {
    if(!user){ 
      return; 
    } else {
      // return this.promiseSetBySomeAction = this.postService.updatePost(post);
    }
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      this.authService.login(this.loginFormGroup.value)
      .subscribe(
        data => {
          console.log("got the data", data);
            // this.router.navigate([this.returnUrl]);
        },
        error => {
          this.formSubmitAttempt = false;
          console.log("there was an error");   
        });

        // return this.authService.login(this.loginFormGroup.value)
        // .then(td => {
        //   console.log(td);
        //   // this.posts.push(td.post);
        // });
    }
    this.formSubmitAttempt = true;             // {8}
  }

  ngOnInit() {
    this.loginFormGroup = this._formBuilder.group({     // {5}
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
