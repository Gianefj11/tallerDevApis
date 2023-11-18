import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup<{
    user:FormControl<string | null>
    password:FormControl<string | null>
  }>

  user:User={
    username:'',
    password:''
  }

  constructor(
    private fb: FormBuilder,
    private auth:AuthService,
    private router:Router
  ){
    this.loginForm = this.fb.group({
      user:['',Validators.required],
      password:['',Validators.required]
    })
  }

  getUser(){  
    this.user.username = this.loginForm.get('user')?.value || '';
    this.user.password = this.loginForm.get('password')?.value || '';

    this.auth.login(this.user).subscribe({
      next:() =>{
        this.auth.isLoged = of(true);
        this.router.navigate(['devs']);
      },
      error: (err) => {

      }
    });

  }


}
