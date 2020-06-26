import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Tarefa } from './interface';

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
        resolve(snapshot.val());
      })
      
    });
  }


}
