import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Tarefa, Evento } from './interface';

const firebaseConfig = {
  apiKey: 'AIzaSyAdo-28HW-ARpbLooQv-Kz-eYGK4CZ_wmw',
  authDomain: 'agenda-ihc.firebaseapp.com',
  databaseURL: 'https://agenda-ihc.firebaseio.com',
  projectId: 'agenda-ihc',
  storageBucket: 'agenda-ihc.appspot.com',
  messagingSenderId: '1009171098513',
  appId: '1:1009171098513:web:b3e688d91df175751bc830'
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  getTarefas(): Promise<Tarefa[]> {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref('/tarefas');

      ref.once('value', snapshot => {
        // resolve(snapshot.val());

        const dados = snapshot.val();
        const retorno = [];

        if (!dados) {
          resolve([]);
          return;
        }

        const keys = Object.keys(dados);

        for (const key of keys) {
          retorno.push({ id: key, ...dados[key] });
        }

        resolve(retorno);

      });

    });
  }

  getEventosAgenda(): Promise<Evento[]> {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref('/agenda-eventos');

      ref.once('value', snapshot => {
        // resolve(snapshot.val());

        const dados = snapshot.val();
        const retorno = [];

        const keys = Object.keys(dados);

        for (const key of keys) {
          retorno.push({ id: key, ...dados[key] });
        }

        resolve(retorno);

      });

    });
  }

  public cadastraEventoAgenda(compromisso: Evento, key: string) {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref('/agenda-eventos/' + key);

      ref.set(compromisso).then(resp => {
        resolve(true);
      }, error => {
        resolve(false);
      });

    });
  }

  cadastraTarefa(tarefa: Tarefa, key: string) {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref('/tarefas/' + key);

      ref.set(tarefa).then(resp => {
        resolve(true);
      }, error => {
        resolve(false);
      });

    });
  }

  getKeyFromKeysBase(tipo: 'tarefa' | 'evento'): Promise<number> {
    return new Promise((resolve, reject) => {

      const path = 'keys/' + tipo;

      const ref = firebase.database().ref(path);

      ref.once('value', (snapshot) => {

        const result = snapshot.val();

        const novoVal = parseInt(result ? (result + 1) : 1);

        ref.set(novoVal);
        resolve(novoVal);

      });

    });
  }

  marcaTarefaConcluida(key: string, concluida: boolean) {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref('/tarefas/' + key);

      ref.update({
        concluida
      }).then(resp => {
        resolve(true);
      });

    });
  }

  excluiTarefa(key: string) {
    return new Promise((resolve, reject) => {

      const ref = firebase.database().ref('/tarefas/' + key);

      ref.remove().then(() => {
        resolve(true);
      });

    });
  }

}
