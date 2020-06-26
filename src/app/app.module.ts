import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AgendaComponent } from './agenda/agenda.component';
import { AgendaService} from './agenda/agenda.service';

import { TarefasComponent } from './tarefas/tarefas.component';
import { FirebaseService } from './common/firebase';

@NgModule({
  declarations: [
    AppComponent,
    AgendaComponent,
    TarefasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot()
  ],
  providers: [
    AgendaService,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
