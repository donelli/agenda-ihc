import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { TarefasComponent } from './tarefas/tarefas.component';
import { CadastrarTarefaComponent } from './cadastrar-tarefa/cadastrar-tarefa.component';
import { CadastrarEventoComponent } from './cadastrar-evento/cadastrar-evento.component';

const routes: Routes = [
  { path: 'agenda', component: AgendaComponent },
  { path: 'tarefas', component: TarefasComponent },
  { path: 'cadastrar-tarefa', component: CadastrarTarefaComponent },
  { path: 'cadastrar-evento', component: CadastrarEventoComponent },
  { path: 'cadastrar-evento/:ano/:mes/:dia', component: CadastrarEventoComponent },
  { path: '', pathMatch: 'full', redirectTo: '/agenda' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
