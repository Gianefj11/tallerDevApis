import { Component } from '@angular/core';
import { TokenStorageService } from 'src/app/modules/auth/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 constructor( public auth:TokenStorageService){}
}
