import {Component} from "@angular/core";
import {Observable} from "rxjs";
import {Breadcrumb} from "./breadcrumb.model";
import {BreadcrumbService} from "./breadcrumb.service";
import {RouterLink} from "@angular/router";
import {AsyncPipe, NgFor} from "@angular/common";

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./breadcrumb.component.html",
    imports: [RouterLink, NgFor, AsyncPipe]
})
export class BreadcrumbComponent {

  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

}
