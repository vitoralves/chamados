import { UtilService } from './../../util/util.service';
import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { HeaderComponent } from '../../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  tickets: any;
  filtro: String = "";
  usuario: any;
  adm: boolean = false;

  constructor(private rootComp: AppComponent, private rota: Router, private service: HomeService, private util: UtilService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      this.adm = this.usuario.adm;
      this.service.retornaTodosTickets(this.usuario.empresa, this.usuario.id).then(res => {
        this.tickets = res.data;
      });
    });
  }

  inserirTicket() {
    this.rota.navigate(['/pages/tickets']);
  }

  abrirTicket(id: number) {
    this.rota.navigate(['pages/tickets/detalhe/', id]);
  }

  formataData(data) {
    if (data == null) {
      return '-';
    }
    return this.util.retornaDataFormatada(data);
  }

  retornaPrioridade(p: number) {
    return this.util.retornaPrioridade(p);
  }

  retornaEstado(e: number) {
    return this.util.retornaEstado(e);
  }
}
