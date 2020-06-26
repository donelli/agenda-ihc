import { Component, OnInit } from '@angular/core';
import { AgendaService } from './agenda.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  mesesDias: any[];

  constructor(
    private agendaService: AgendaService
  ) { }

  ngOnInit(): void {

  }

}
