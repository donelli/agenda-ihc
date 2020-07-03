import { Injectable, OnInit } from '@angular/core';
import { FirebaseService } from './../common/firebase';
import { Tarefa } from './../common/interface';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  tarefas: Tarefa[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) { }

  async carregaTarefas() {

    const tarefas = await this.firebaseService.getTarefas();

    if (!tarefas) {
      this.tarefas.splice(0, this.tarefas.length);
    } else {
      this.tarefas.splice(0, this.tarefas.length);
      for (const tarefa of tarefas) {
        if (!tarefa) {
          continue;
        }
        this.tarefas.push(tarefa);
      }
      this.tarefas.sort((a, b) => {
        if (a.data === b.data) {
          return (a.hora > b.hora) ? 1 : -1;
        } else {
          return (a.data > b.data) ? 1 : -1;
        }
      });
    }

  }

  marcaComoConcluida(key: number, concluida: boolean) {
    return this.firebaseService.marcaTarefaConcluida(key.toString(), concluida);
  }
  
  excluiTarefa(key: string) {
    return this.firebaseService.excluiTarefa(key);
  }

}
