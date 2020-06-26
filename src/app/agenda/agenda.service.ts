import { Injectable } from '@angular/core';
import { Mes } from './../common/interface';
import { FirebaseService } from './../common/firebase';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  agenda: Mes[];

  constructor(
    private firebaseService: FirebaseService
  ) { }

}
