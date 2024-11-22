import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  //injection de la dependance router
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAddNewFaceSnap() {
    this.router.navigateByUrl('/facesnaps/create');
  }
}