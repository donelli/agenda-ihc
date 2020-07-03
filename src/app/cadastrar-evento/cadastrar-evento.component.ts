import { Component, OnInit } from '@angular/core';
import { Evento } from '../common/interface';
import { FirebaseService } from '../common/firebase';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastrar-evento',
  templateUrl: './cadastrar-evento.component.html',
  styleUrls: ['./cadastrar-evento.component.css']
})
export class CadastrarEventoComponent implements OnInit {

  dataInicial = '';
  titulo = '';
  horaInicial = '';
  dataFinal = '';
  horaFinal = '';
  cadastroOK = false;

  constructor(
    private firebaseService: FirebaseService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.dia) {
      this.dataInicial = params.ano + '-' + params.mes.padStart(2, '0') + '-' + params.dia.padStart(2, '0');
      this.dataFinal = params.ano + '-' + params.mes.padStart(2, '0') + '-' + params.dia.padStart(2, '0');
    }
    this.horaInicial = '08:00';
    this.horaFinal = '08:00';
  }

  verificaOkCadastro() {
    this.cadastroOK = false;
    if (this.dataFinal && this.dataInicial && this.horaFinal && this.horaInicial && this.titulo) {
      this.cadastroOK = true;
    }
  }

  cadastrar() {

    const evento: Evento = {
      titulo: this.titulo,
      dataInicial: this.dataInicial,
      horaInicial: this.horaInicial,
      dataFinal: this.dataFinal,
      horaFinal: this.horaFinal
    };

    this.firebaseService.getKeyFromKeysBase('evento').then(key => {
      this.firebaseService.cadastraEventoAgenda(evento, key.toString()).then(resp => {
        this.toastrService.success('Evento cadastrada!');
        this.router.navigateByUrl('/tarefas');
      }, error => {
        this.toastrService.error('Erro ao gravar o evento!');
        console.error(error);
      });
    });

  }

}
