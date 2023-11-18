import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dev } from 'src/app/interface/interface';
import { DevsService } from '../../services/devs.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-dev-list',
  templateUrl: './dev-list.component.html',
  styleUrls: ['./dev-list.component.css']
})
export class DevListComponent implements OnInit {

  searchText!: FormControl<string | null>;

  devs: Dev[] = [];

  constructor( private devServ: DevsService ) {
    this.searchText = new FormControl('');
  }

  ngOnInit(): void {
    this.getDevs();
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

}
