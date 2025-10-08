import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }
  IsLoggin: any = false;
  roleName: string | null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    // Check login status
    this.IsLoggin = this.authService.getLoginStatus;
    this.roleName = this.authService.getRole;
    if (!this.IsLoggin) {
      this.router.navigateByUrl('/homepage');
    }

    // Set page title dynamically based on route data
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        const pageTitle = data['title'];
        if (pageTitle) {
          this.titleService.setTitle(pageTitle);
        }
      });
  }
  ngOnInit(): void {
   
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

}
