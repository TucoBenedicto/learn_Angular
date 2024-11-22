import { Component, OnInit } from '@angular/core';
import { interval, Observable, of} from 'rxjs';
import{filter, map, tap,  concatMap, mergeMap, delay, exhaustMap, switchMap, take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }

}
