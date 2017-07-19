import { NgModule } from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { PaginasComponent } from './paginas.component';
import { AuthGuard } from "app/guarda/authGuard";
import { AdminGuard } from "app/guarda/adminGuard";

//rotas da aplicação
const appRoutes: Routes = [
  {path: '', loadChildren: '../login/login.module#LoginModule'},
  {
    path: 'pages', component: PaginasComponent,
    children: [
      { path: 'nao-encontrado', loadChildren: './nao-encontrado/nao-encontrado.module#NaoEncontradoModule', canActivate: [AuthGuard]},
      { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard]},
      { path: 'perfil', loadChildren: './perfil/perfil.module#PerfilModule', canActivate: [AuthGuard]},
      { path: 'empresas', loadChildren: './empresas/empresas.module#EmpresasModule', canActivate: [AuthGuard, AdminGuard]},
      { path: 'produtos', loadChildren: './produtos/produtos.module#ProdutosModule', canActivate: [AuthGuard, AdminGuard]},
      { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule', canActivate: [AuthGuard, AdminGuard]},
      { path: 'tickets', loadChildren: './tickets/tickets.module#TicketsModule', canActivate: [AuthGuard]},
      { path: 'tickets/detalhe/:id', loadChildren: './tickets-detalhe/tickets-detalhe.module#TicketsDetalheModule', canActivate: [AuthGuard]},
      { path: 'componentes', loadChildren: './componentes/componentes.module#ComponentesModule', canActivate: [AuthGuard, AdminGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule {}
