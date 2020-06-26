import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { TarefasComponent } from './tarefas/tarefas.component';

const routes: Routes = [
  { path: 'agenda', component: AgendaComponent },
  { path: 'tarefas', component: TarefasComponent },
  { path: '', pathMatch: 'full', redirectTo: '/agenda' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
