
export interface Tarefa {
  id?: number;
  titulo: string;
  data: string;
  hora: string;
  concluida: boolean;
}

export interface Evento {
  id?: number;
  titulo: string;
  dataInicial: string;
  horaInicial: string;
  dataFinal: string;
  horaFinal: string;
}

export interface Dia {
  compromissos: Evento[];
}

export interface Mes {
  mes: number;
  ano: number;
  nomeMes: string;
  dias: Dia[];
  diaDaSemanaInicial: number;
  ultimoDiaDoMes: number;
  mesAtual: boolean;
}
