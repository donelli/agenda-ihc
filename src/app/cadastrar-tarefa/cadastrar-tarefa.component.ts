import { Component, OnInit } from '@angular/core';
import { Tarefa } from './../common/interface';
import { FirebaseService } from '../common/firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cadastrar-tarefa',
  templateUrl: './cadastrar-tarefa.component.html',
  styleUrls: ['./cadastrar-tarefa.component.css']
})
export class CadastrarTarefaComponent implements OnInit {

  descricaoTarefa = '';
  dataFinal = '';
  horaFinal = '';
  cadastroOK = false;
  
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    const date = new Date();
    this.dataFinal = date.toISOString().substr(0, 10);
    this.horaFinal = date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0');
  }
  
  verificaOkCadastro() {
    if (this.descricaoTarefa && this.dataFinal && this.horaFinal) {
      this.cadastroOK = true;
    } else {
      this.cadastroOK = false;
    }
  }

  cadastrar() {

    const tarefa: Tarefa = {
      titulo: this.descricaoTarefa,
      concluida: false,
      data: this.dataFinal,
      hora: this.horaFinal
    };

    this.firebaseService.getKeyFromKeysBase('tarefa').then((key: any) => {
      this.firebaseService.cadastraTarefa(tarefa, key).then(resp => {
        this.toastrService.success('Tarefa cadastrada!');
        this.router.navigateByUrl('/tarefas');
      }, error => {
        this.toastrService.error('Erro ao gravar a tarefa!');
        console.error(error);
      });
    }, error => {
      this.toastrService.error('Erro ao gravar a tarefa!');
      console.error(error);
    });

  }
}
