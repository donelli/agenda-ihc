import { Injectable } from '@angular/core';
import { Mes, Dia } from './../common/interface';
import { FirebaseService } from './../common/firebase';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  dados: Mes[] = [];

  constructor(
    private firebaseService: FirebaseService
  ) { }

  async carregaAgenda() {
    const datainicio = new Date();
    const datafinal = new Date();

    datainicio.setDate(1);
    datainicio.setMonth(datainicio.getMonth() - 6);
    datafinal.setDate(1);
    datafinal.setMonth(datafinal.getMonth() + 7);
    datafinal.setDate(datafinal.getDate() - 1);

    this.dados.splice(0, this.dados.length);
    const dataAux = datainicio;
    while (true) {

      const novoMes: Mes = {
        mes: dataAux.getMonth() + 1,
        ano: dataAux.getFullYear(),
        diaDaSemanaInicial: dataAux.getDay(),
        dias: [],
        nomeMes: this.getNomeMes(dataAux.getMonth()),
        ultimoDiaDoMes: 0,
        mesAtual: (new Date() === dataAux)
      };
      const mesAtual = dataAux.getMonth() + 1;
      let ultimoDiaMes = 0;
      while (dataAux.getMonth() + 1 === mesAtual) {
        ultimoDiaMes++;
        novoMes.dias.push({ compromissos: [] });
        dataAux.setDate(dataAux.getDate() + 1);
      }
      novoMes.ultimoDiaDoMes = ultimoDiaMes;
      this.dados.push(novoMes);

      // dataAux.setMonth(dataAux.getMonth() + 1);
      if (dataAux.getFullYear() > datafinal.getFullYear() ||
         (dataAux.getFullYear() === datafinal.getFullYear() && dataAux.getMonth() > datafinal.getMonth() )) {
        break;
      }

    }

    const eventos = await this.firebaseService.getEventosAgenda();

    for (const evento of eventos) {

      const dataIni = new Date(evento.dataInicial);
      dataIni.setDate(dataIni.getDate() + 1);
      const dataFin = new Date(evento.dataFinal);
      dataFin.setDate(dataFin.getDate() + 1);

      while (dataIni <= dataFin) {

        for (const mes of this.dados) {
          if (mes.ano === dataIni.getFullYear() && mes.mes === dataIni.getMonth() + 1) {
            mes.dias[dataIni.getDate() - 1].compromissos.push(evento);
            break;
          }
        }

        dataIni.setDate(dataIni.getDate() + 1);
      }

    }
    
    console.log(this.dados);
    
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

}
