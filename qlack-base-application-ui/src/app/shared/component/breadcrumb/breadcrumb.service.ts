import {Injectable} from "@angular/core";
import {BehaviorSubject, filter} from "rxjs";
import {ActivatedRouteSnapshot, NavigationEnd, Router} from "@angular/router";
import {Breadcrumb} from "./breadcrumb.model";

@Injectable({
  providedIn: "root"
})
export class BreadcrumbService {

  // Subject emitting the breadcrumb hierarchy.
  // tslint:disable-next-line:variable-name
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy.
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Construct the breadcrumb hierarchy.
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumb(root, [], breadcrumbs);

      // Emit the new hierarchy.
      this._breadcrumbs$.next(breadcrumbs);
    });
  }

  private addBreadcrumb(route: ActivatedRouteSnapshot | null, parentUrl: string[],
    breadcrumbs: Breadcrumb[]) {
    if (route) {
      // Construct the route URL.
      const routeUrl = parentUrl.concat(route.url.map(url => url.path));

      // Add an element for the current route part.
      if (route.data.breadcrumb) {
        const breadcrumb = {
          label: this.getLabel(route),
          url: "/" + routeUrl.join("/")
        };
        breadcrumbs.push(breadcrumb);
      }

      // Add another element for the next route part.
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }

  private getLabel(route: ActivatedRouteSnapshot) {
    return typeof route.data.breadcrumb === "function"
      ? route.data.breadcrumb(route) : route.data.breadcrumb;
  }

}
