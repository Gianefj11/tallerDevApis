import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dev } from 'src/app/interface/interface';
import { DevsService } from '../../services/devs.service';
import { HttpResponse } from '@angular/common/http';
import { DevRegister } from '../../interfaces/interfaces';

import { ToastrService } from 'ngx-toastr';

declare var window: any;

@Component({
  selector: 'app-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.css']
})
export class DevListComponent implements AfterViewInit {

  searchText!: FormControl<string | null>;


  registerForm: FormGroup<{
    nombre:FormControl<string | null>
    apellido:FormControl<string | null>
    correo:FormControl<string | null>
    edad:FormControl<number | null>
    ciudad:FormControl<string | null>
  }>


  actualizarForm: FormGroup<{
    nombreM:FormControl<string | null>
    apellidoM:FormControl<string | null>
    correoM:FormControl<string | null>
    edadM:FormControl<number | null>
    ciudadM:FormControl<string | null>
  }>

  devRegister: DevRegister = {
    first_name:'',
    last_name:'',
    email:'',
    years:0,
    country:''
  }

  dev:Dev = {
    id:0,
    first_name:'',
    last_name:'',
    email:'',
    years:0,
    country:''
  }

  devEliminar:Dev = {
    id:0,
    first_name:'',
    last_name:'',
    email:'',
    years:0,
    country:''
  }

  devs: Dev[] = [];
  modalAddDev:any;
  modalModificarDev:any;
  modalDeleteDev: any;

  constructor( 
    private fb: FormBuilder,
    private devServ: DevsService,
    private toastr: ToastrService,

     ) {
    this.searchText = new FormControl('');
    this.registerForm = this.fb.group({
      nombre:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      apellido:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      correo:['',[Validators.required, Validators.email]],
      edad:[0,[Validators.required, Validators.min(18), Validators.max(99)]],
      ciudad:['',[Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });

    this.actualizarForm = this.fb.group({
      nombreM:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      apellidoM:['',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      correoM:['',[Validators.required, Validators.email]],
      edadM:[0,[Validators.required, Validators.min(18), Validators.max(99)]],
      ciudadM:['',[Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });
  }

  // ngOnInit(): void {

  // }

  ngAfterViewInit(): void {
    this.getDevs();
    this.modalAddDev = new window.bootstrap.Modal(
      document.getElementById('VerDetalle')
    );
    this.modalModificarDev = new window.bootstrap.Modal(
      document.getElementById('editarDev')
    )
    this.modalDeleteDev = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    )
    
  }

  search() {
    console.log(this.searchText.value);
  }

  getDevs() {

    this.devServ.getDevs().subscribe({
      next: (resp: HttpResponse<Dev[]>) => {
        this.devs = resp.body || [];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editDev(dev: Dev) {
    this.modalModificarDev.show();
    this.dev = dev;
  }

  editDevSrv(nombre:string, apellido:string, correo:string, edad:string,ciudad:string){

    this.actualizarForm.setValue({
      nombreM:nombre,
      apellidoM:apellido,
      correoM:correo,
      edadM:parseInt(edad),
      ciudadM:ciudad
    })

    this.actualizarForm.markAllAsTouched();

    if(this.actualizarForm.valid){

      var devChange: Dev ={
        id: this.dev.id,
        first_name: nombre,
        last_name: apellido,
        email: correo,
        years: parseInt(edad),
        country: ciudad
      }

      this.devServ.updateDev(devChange).subscribe(
        {
          next: (data) =>{
              this.getDevs();
              this.modalModificarDev.hide();
              this.toastr.success('Editado Correctamente');
          },
          error: (err) => {
            this.toastr.error('Error al Editar');
          }
        }
      )


    }


  }


  deleteDev(dev: Dev) {
    console.log(dev);
  }

  addDev() {
      this.modalAddDev.show();
  }

  addDevSrv(){
    this.devRegister = {
      first_name: this.registerForm.get('nombre')?.value || '',
      last_name: this.registerForm.get('apellido')?.value || '',
      email: this.registerForm.get('correo')?.value || '',
      years: this.registerForm.get('edad')?.value || 0,
      country: this.registerForm.get('ciudad')?.value || ''
    }


    this.devServ.createDev(this.devRegister).subscribe({
      next:(data) =>{
          console.log('registrado');
          this.getDevs();
          this.modalAddDev.hide();
          this.toastr.success('Registrado Correctamente');
      },
      error: (err) => {
        this.toastr.error('Error al Registrar');
      }
    });

  }

  showModalDelete(dev: any) {
    this.modalDeleteDev.show();
    this.devEliminar = dev;

  }

  // Falta limpiar la Variable
  EliminarDev() {
    this.devServ.deleteDev(this.devEliminar.id).subscribe({
      next: (data) => {
        console.log('registrado');
        this.getDevs();
        this.modalAddDev.hide();
      },
      error: (err) => {

      }
    });
    this.CloseModalEliminarDev()
  }

  CloseModalEliminarDev() {
    this.modalDeleteDev.hide();
  }
















}
