import { Component, OnInit } from '@angular/core';

import { AppComponent } from '../../app.component';
import { ComponentesService } from './componentes.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//varíavel para mostrar o sweetalert
declare var swal: any;

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.css']
})
export class ComponentesComponent implements OnInit {

  componentes: any;
  pesquisaParam: any;
  componentesPesquisa: any;

  constructor(private rootComp: AppComponent, private service: ComponentesService, private rota: Router) {
    this.rootComp.cssClass = 'hold-transition skin-blue-light sidebar-mini sidebar-collapse';
  }

  ngOnInit() {
    this.buscaTodosComponentes();
  }

  buscaTodosComponentes(){
    this.service.retornaTodosComponentes().then(data => {
      this.componentes = data.data;
      this.componentesPesquisa = this.componentes;
    })
  }

  novo() {
    this.rota.navigate(['/pages/componentes/novo']);
  }

  editar(id: number){
    this.rota.navigate(['pages/componentes/', id]);
  }

  public mostraAlert(): Promise<any>{
    return swal({
      title: 'Você tem certeza?',
      text: "Essa ação não poderá ser desfeita!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonText: 'Cancelar'
    }).then(function() {
      return true;
    }, function (dismiss) {
      return false;
    })
  }

  public deletar(id: number){
    this.mostraAlert().then(retorno => {
      if (retorno) {
        this.apagarItem(id);
      }
    })
  }

  public apagarItem(id: number){
    this.service.apagarItem(id).then(result => {
      if (result.status === 'success'){
        swal(
          'Apagado!',
          'O item de código '+id+' foi apagado!',
          'success'
        )
        //se necessitar de melhor processamento remover somente do array ao invéz de solicitar na API
        this.buscaTodosComponentes();
      }else{
        swal(
          'Erro!',
          'Ocorreu um erro ao apagar o registro: <b>'+result.message+'</b>',
          'error'
        )
      }
    })
  }

  pesquisar(){
    if (!this.pesquisaParam){
      this.componentes = this.componentesPesquisa;
    }else if (!isNaN(this.pesquisaParam)){
      this.componentes = this.componentesPesquisa;
      this.componentes = this.componentes.filter(item => item.id === +this.pesquisaParam);
    }else{
      this.componentes = this.componentesPesquisa;
      this.componentes = this.componentes.filter(item => item.nome.toUpperCase().indexOf(this.pesquisaParam.toUpperCase()) !== -1);
    }
  }

}
