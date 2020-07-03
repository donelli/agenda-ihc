import { Component } from '@angular/core';
import { faListUl, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isCollapsed = true;
  faListUl = faListUl;
  faCalendarAlt = faCalendarAlt;

}
