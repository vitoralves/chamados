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
  labelFiltro: String;
  filtroPlace: String;
  filtroText: boolean = false;
  filtroSelect: boolean = false;
  filtroValor;
  filtroEstado: String = "";

  constructor(private rootComp: AppComponent, private rota: Router, private service: HomeService, private util: UtilService) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.util.retornaUsuario().then(data => {
      this.usuario = data.data;
      this.adm = this.usuario.adm;
      this.pesquisaTickets();
    });
  }

  pesquisaTickets(){
    this.service.retornaTodosTickets(this.usuario.empresa, this.usuario.id).then(res => {
        this.tickets = res.data;
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

  changeFiltro(){
    if (this.filtro === 'I'){
      this.labelFiltro = 'ID:';
      this.filtroPlace = 'Informe um ID...';
      this.filtroText = true;
      this.filtroSelect = false;
    } else if (this.filtro === 'P'){
      this.labelFiltro = 'Produto:';
      this.filtroPlace = 'Informe um produto...';
      this.filtroText = true;
      this.filtroSelect = false;
    }else if (this.filtro === 'E'){
      this.labelFiltro = 'Estado:';
      this.filtroPlace = '';
      this.filtroText = false;
      this.filtroSelect = true;
    }else{
      this.labelFiltro = '';
      this.filtroText = false;
      this.filtroSelect = false;
      this.pesquisaTickets();
    }
  }

  filtrar(){
    if (this.filtro === 'I'){
      this.service.retornaTicketsPorId(this.usuario.empresa, this.usuario.id, this.filtroValor).then(result => {
        this.tickets = result.data;
      });
    }else if (this.filtro === 'P'){
      this.service.retornaTicketsPorProduto(this.usuario.empresa, this.usuario.id, this.filtroValor).then(result => {
        this.tickets = result.data;
      });
    }else if (this.filtro === 'E'){
      this.service.retornaTicketsPorEstado(this.usuario.empresa, this.usuario.id, this.filtroEstado).then(result => {
        this.tickets = result.data;
      });
    }else {
      this.pesquisaTickets();
    }
  }
}
