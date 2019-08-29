import { Injectable } from '@angular/core';
import { UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  urlTree: UrlTree = this.router.parseUrl('#');
  nextRouteState: any = this.urlTree;

  constructor(private router: Router) { }

  canAdvance() {
    this.nextRouteState = true;
  }
  blockRoute() {
    this.nextRouteState = this.urlTree;
  }
}
