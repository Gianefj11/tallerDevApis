import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dev } from 'src/app/interface/interface';
import { DevsService } from '../../services/devs.service';
import { HttpResponse } from '@angular/common/http';

declare var window: any;

@Component({
  selector: 'app-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.css']
})
export class DevListComponent implements AfterViewInit {

  searchText!: FormControl<string | null>;

  devs: Dev[] = [];
  modalAddDev:any;

  constructor( private devServ: DevsService ) {
    this.searchText = new FormControl('');
  }

  // ngOnInit(): void {

  // }

  ngAfterViewInit(): void {
    this.getDevs();
    this.modalAddDev = new window.bootstrap.Modal(
      document.getElementById('VerDetalle')
    );
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
    console.log(dev);
  }

  deleteDev(dev: Dev) {
    console.log(dev);
  }

  addDev() {
    console.log('add');

    this.modalAddDev.show();
  }

}
