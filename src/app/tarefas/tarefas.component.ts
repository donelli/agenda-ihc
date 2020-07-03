import { Component, OnInit } from '@angular/core';
import { TarefasService } from './tarefas.service';
import { Tarefa } from '../common/interface';
import { faTrash, faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css']
})
export class TarefasComponent implements OnInit {

  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  faCircle = faCircle;
  
  
  tarefas: Tarefa[] = [];
  carregando = true;
  datas: string[] = [];
  idExcluir = 0;

  constructor(
    private tarefasService: TarefasService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.tarefas = this.tarefasService.tarefas;
    this.tarefasService.carregaTarefas().then(() => {
      this.carregando = false;
      this.atualizaListaDatas();
    });
  }

  atualizaListaDatas() {
    for (const t of this.tarefas) {
      if (!t) {
        continue;
      }
      const ind = this.datas.find(d => d === t.data);
      if (!ind) {
        this.datas.push(t.data);
      }
    }
  }

  getTarefas(data: string) {

    const res = [];

    for (const tarefa of this.tarefas) {
      if (tarefa.data === data) {
        res.push(tarefa);
      }
    }

    return res;
  }

  formataData(data: string, short: boolean) {

    const date = new Date(data);

    if (short) {
      return (date.getDate() + 1).toString().padStart(2, '0') + ' de ' + this.getNomeMes(date.getMonth()).toLowerCase();
    } else {
      return (date.getDate() + 1).toString().padStart(2, '0') + ' de ' +
      this.getNomeMes(date.getMonth()).toLowerCase() + ' de ' +
      date.getFullYear();
    }

  }

  getNomeMes(mes: number) {
    const a = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ];
    return a[mes];
  }

  marcaComoConcluida(item: Tarefa, concluida: boolean) {
    if (item && item.id) {
      this.tarefasService.marcaComoConcluida(item.id, concluida).then(resp => {
        item.concluida = concluida;
        if (concluida) {
          this.toastrService.success('Tarefa marcada com concluída!');
        } else {
          this.toastrService.success('Tarefa marcada com pendente!');
        }
      });
    }
  }

  setIdExcluir(item: Tarefa) {
    this.idExcluir = item.id;
  }
  
  excluiTarefa() {
    this.tarefasService.excluiTarefa(this.idExcluir.toString()).then(resp => {
      for (const i in this.tarefas) {
        if (this.tarefas[i].id === this.idExcluir) {
          this.tarefas.splice(parseInt(i), 1);
          break;
        }
      }
    })
  }
  
}
