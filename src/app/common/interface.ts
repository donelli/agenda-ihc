
export interface Tarefa {
  id: number;
  titulo: string;
  data: Date;
  concluida: boolean;
}

export interface Compromisso {
  id: number;
  titulo: string;
  descricao: string;
  inicio: Date;
  final: Date;
}

export interface Dia {
  compromissos: Compromisso[];
}

export interface Mes {
  mes: string;
  ano: string;
  nomeMes: string;
  dias: Dia[];
}
