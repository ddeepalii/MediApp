import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}