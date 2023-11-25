import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';
import { ToastrService } from 'ngx-toastr';

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
    email:'',
    password:''
  }

  constructor(
    private fb: FormBuilder,
    private auth:AuthService,
    private token:TokenStorageService,
    private router:Router,
    private toastr: ToastrService,
  ){
    this.loginForm = this.fb.group({
      user:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  getUser(){  
    this.user.email = this.loginForm.get('user')?.value || '';
    this.user.password = this.loginForm.get('password')?.value || '';

    this.auth.login(this.user).subscribe({
      next:(data) =>{
        this.auth.isLoged = of(true);
        this.auth.valiGian = true;
        this.token.SaveToken(data.body);
        this.router.navigate(['devs']);
        this.toastr.success('Bienvenidos!');
      },
      error: (err) => {
        this.toastr.error('Error al intentar iniciar Sesión!');
      }
    });

  }


}
