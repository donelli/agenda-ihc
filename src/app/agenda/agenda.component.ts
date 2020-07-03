import { Component, OnInit } from '@angular/core';
import { AgendaService } from './agenda.service';
import { Mes } from '../common/interface';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  dados: Mes[];
  constructor(
    private agendaService: AgendaService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
    this.dados = this.agendaService.dados;
    this.agendaService.carregaAgenda();
  }

  getSemanas() {
    return [0, 1, 2, 3, 4];
  }

  getDiasNaoTem(mes: Mes, semana: number) {

    if (semana !== 0 || mes.diaDaSemanaInicial === 0) {
      return [];
    }

    const ret = [];

    for (let i = 1; i < (mes.diaDaSemanaInicial + 1); i++) {
      ret.push(i);
    }

    return ret;
  }

  getDiasDaSemana(mes: Mes, semana: number) {

    const ret = [];

    if (semana === 0) {

      let dia = 1;

      for (let i = 0; i < 7; i++) {
        if (i < mes.diaDaSemanaInicial) {
          continue;
        }
        ret.push(dia);
        dia++;
      }

    } else {

      let aux = 7 - mes.diaDaSemanaInicial + 1;
      aux += ((semana - 1) * 7);

      for (let i = 0; i < 7; i++) {
        if (aux > mes.ultimoDiaDoMes) {
          ret.push(-1);
        } else {
          ret.push(aux);
        }
        aux++;
      }

    }

    return ret;
  }
  
  alterarEvento() {
  }
  
  incluirEvento(dia, mes, ano) {
    this.router.navigateByUrl('cadastrar-evento/' + ano + '/' + mes + '/' + dia);
  }

  getCompromissos(mes, dia) {
    const compromissos = mes.dias[dia - 1] ? mes.dias[dia - 1].compromissos : [];
    return compromissos;
  }
}
