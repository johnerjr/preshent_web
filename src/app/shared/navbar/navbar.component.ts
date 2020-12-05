import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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

    // To make the header appear fixed or pop while scrolling
    window.addEventListener('scroll', () => {
      const header = document.getElementById('fixedTop');
      // console.log(header, ' header')
      const scrollPos = window.scrollY;
      if (scrollPos > 10) {
          // header.classList.add('fixedTop');
      } else {
          // header.classList.remove('fixedTop');
      }
    });
  }

  ngOnInit() {

  }
}
