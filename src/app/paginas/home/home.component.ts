import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { HeaderComponent} from '../../header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private rootComp: AppComponent) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini';
  }

  ngOnInit() {

  }

}
