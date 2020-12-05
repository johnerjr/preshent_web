import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  showHeaderFooter: Boolean = true;

  constructor(
    public location: Location,
    private router: Router
  ) {
    router.events.subscribe((val) => {
      this.showHeaderFooter = true;
      if (location.path() !== '') {
        if (
          location.path() === '/login' ||
          location.path() === '/register' ||
          location.path() === '/forgot'
        ) {
          this.showHeaderFooter = false;
        }
      }
    });
  }

  ngOnInit() {

  }
  getPath() {
    return this.router.url;
  }
}
