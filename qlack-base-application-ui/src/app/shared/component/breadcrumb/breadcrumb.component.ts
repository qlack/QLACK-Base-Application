import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {Breadcrumb} from "./breadcrumb.model";
import {BreadcrumbService} from "./breadcrumb.service";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html"
})
export class BreadcrumbComponent {

  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

}
