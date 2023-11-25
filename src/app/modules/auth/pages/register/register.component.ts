import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup<{
    username:FormControl<string | null>,
    email:FormControl<string | null>,
    password:FormControl<string | null>
  }>

  nuevoUsuario: User = {
    username:'',
    email:'',
    password:''
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private token: TokenStorageService,
    private router: Router
  ){
    this.registerForm = this.fb.group({
      username:['', [Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).*$')]],
    })
  }

  register() {
    this.nuevoUsuario.username = this.registerForm.get('username')?.value || '';
    this.nuevoUsuario.email = this.registerForm.get('email')?.value || '';
    this.nuevoUsuario.password = this.registerForm.get('password')?.value || '';

    // console.log(this.nuevoUsuario);

    this.auth.register(this.nuevoUsuario).subscribe({
      next: (data) => {
        // sessionStorage.setItem('token', data.body || '');
        this.token.SaveToken(data.body);
        this.auth.isLoged = of(true);
        this.router.navigate(['devs']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
