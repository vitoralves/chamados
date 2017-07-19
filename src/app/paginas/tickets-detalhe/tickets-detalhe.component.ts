import { DomSanitizer } from '@angular/platform-browser';
import { UtilService } from './../../util/util.service';
import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { TicketsDetalheService } from './tickets-detalhe.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import '../../../tema/js/myjs.js';
import 'rxjs/Rx';

// responsavel por chamar o script que fechar o alert
declare var execute: any;

@Component({
  selector: 'app-tickets-detalhe',
  templateUrl: './tickets-detalhe.component.html',
  styleUrls: ['./tickets-detalhe.component.css']
})
export class TicketsDetalheComponent implements OnInit {

  //informacoes de titulo da página
  tituloPagina: string = '';
  breadCrumb: string = '';
  //informações referentes ao alert
  mensagem: boolean = false;
  titulo: string = '';
  icon: string = '';
  texto: string = '';
  alertCss: string = '';

  produto: String;
  componente: String;
  prioridade: String;
  estado: String;
  dt_abertura: String;
  dt_resolvido: String;
  sumario: String;
  descricao: String;
  usuario: String;
  ticketId: number;
  anexo: any;
  anexo_nome: any;
  anexo_tipo: any;

  novoComentario: String = '';

  listaComentarios: any;

  constructor(private rootComp: AppComponent, private service: TicketsDetalheService, private rotaAtiva: ActivatedRoute, private rota: Router,
   private util: UtilService, private sanitizer: DomSanitizer) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
    this.rotaAtiva.params.subscribe(params => {
      this.ticketId = params.id;
      this.tituloPagina = 'Ticket ' + this.ticketId;
      this.breadCrumb = 'Detalhe';
      this.service.buscarPorId(params.id).then(result => {
        if (result.data.id > 0) {
          this.produto = result.data.produto;
          this.componente = result.data.componente;
          this.prioridade = result.data.prioridade;
          this.estado = result.data.estado;
          this.dt_abertura = result.data.dt_abertura;
          this.dt_resolvido = result.data.dt_resolvido;
          this.sumario = result.data.sumario;
          this.descricao = result.data.descricao;
          this.usuario = result.data.usuario;
          this.anexo_nome = result.data.anexo_nome;
          this.anexo_tipo = result.data.anexo_mimetype;
          this.anexo = 'data:'+this.anexo_tipo+';base64, '+result.data.anexo;            
        } else {
          this.rota.navigate(['pages/nao-encontrado']);
        }
      });
    })
  }

  ngOnInit() {
    this.listarComentarios();
  }

  listarComentarios(){
    this.service.listarComentarios(this.ticketId).then(data => {
      this.mensagem = false;
      if (data.status === 'success') {
        this.listaComentarios = data.data;
      } else {
        this.mensagem = true;
        this.texto = 'Erro ao listar comentários! '+data.json().mensagem;
        this.titulo = 'Erro';
        this.icon = 'fa-ban';
        this.alertCss = 'alert-error';
      }
    })
  }

  // chamado toda vez que uma checagem do componente é feita
  ngAfterViewChecked() {
    // fecha alert automatico
    if (this.titulo == 'Sucesso') { execute.funcao(); window.location.reload();}
  }

  enviar() {
    //fecha a mensagem para ser exibida novamente
    this.mensagem = false;
    if (this.novoComentario.length > 0) {

      let ticket: any = {
        id: null,
        descricao: null,
        anexo: null,
        dt_envio: null,
        usuario: null
      };

      ticket.id = this.ticketId;
      ticket.descricao = this.novoComentario;
      ticket.dt_envio = new Date().toISOString();
      ticket.usuario = this.util.idUsuario();

      this.service.adicionar(ticket).then(data => {
        if (data.json().status === 'success') {
          this.mensagem = true;
          this.texto = 'Comentário adicionado';
          this.titulo = 'Sucesso';
          this.icon = 'fa-check';
          this.alertCss = 'alert-success';
        }
      })

    } else {
      this.mensagem = true;
      this.texto = 'Escreva um comentário';
      this.titulo = 'Erro';
      this.icon = 'fa-ban';
      this.alertCss = 'alert-error';
    }

  }

  baixarAnexo(){
    window.open(this.anexo);
  }

  doLogado(valor){
    if (this.usuario.replace(' ', '').toLowerCase() !== valor.replace(' ', '').toLowerCase()){
      return this.sanitizer.bypassSecurityTrustStyle('color: #f39c12 !important;');
    }
  }

  retornaPrioridade(p: number) {
    return this.util.retornaPrioridade(p);
  }

  retornaEstado(e: number) {
    return this.util.retornaEstado(e);
  }

  formataData(d: any) {
    if (d == null) {
      return '-';
    }
    return this.util.formataData(d);
  }

  capitalizar(valor) {
    if (valor !== undefined) {
      return this.util.capitalizarPrimeira(valor);
    }
  }
}
