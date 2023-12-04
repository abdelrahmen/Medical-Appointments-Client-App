import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoading:boolean = false;

  constructor(formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: formBuilder.control("", { validators: [Validators.email] }),
      password: formBuilder.control(""),
    });

    this.registerForm = new FormGroup({
      userName: formBuilder.control("", { validators: [Validators.required] }),
      firstName: formBuilder.control("", { validators: [Validators.required, Validators.maxLength(50)] }),
      lastName: formBuilder.control("", { validators: [Validators.required, Validators.maxLength(50)] }),
      email: formBuilder.control("", { validators: [Validators.required, Validators.email] }),
      password: formBuilder.control("", { validators: [Validators.required] }),
    });
  }

  // convenience getter for easy access to form fields
  get registerFormControls() { return this.registerForm.controls; }

  registerSubmit(){
    //console.log(this.registerFormControls['firstName'].errors?.['required'])
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe( res =>{
        console.log(res);
      });
    }
  }

  loginSubmit(){
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: res=>{
          console.log("from login method:", res);
          if (res?.token) {
            this.router.navigate(["home"]);
          }
          this.isLoading = false;
        },
        error: (err)=>{
          this.isLoading = false;
        },
        complete: ()=>{
          this.isLoading = false;
        },
      })
    }
  }
}
