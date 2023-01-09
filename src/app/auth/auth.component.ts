import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true
  isLoading = false
  error: string = null

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return
    }
    const email = authForm.value.email;
    const password = authForm.value.password;
    this.isLoading = true

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signUp(email, password)
    }
    authObs.subscribe(resData => {
        console.warn(resData)
        this.isLoading = false
      this.router.navigate(['./recipes'])
      },
      errorMessage => {
        console.warn(errorMessage)
        this.error = errorMessage.message
        this.isLoading = false
      });
    authForm.reset()
  }

  onHandleError() {
    this.error = null
  }
}
