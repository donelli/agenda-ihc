import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AgendaComponent } from './agenda/agenda.component';
import { AgendaService} from './agenda/agenda.service';

import { TarefasComponent } from './tarefas/tarefas.component';
import { FirebaseService } from './common/firebase';
import { CadastrarTarefaComponent } from './cadastrar-tarefa/cadastrar-tarefa.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CadastrarEventoComponent } from './cadastrar-evento/cadastrar-evento.component';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    TarefasComponent,
    CadastrarTarefaComponent,
    CadastrarEventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    FontAwesomeModule
  ],
  providers: [
    AgendaService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
