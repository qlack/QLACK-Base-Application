import {NgModule} from "@angular/core";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink, RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TopbarComponent} from "./topbar/topbar.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FooterComponent} from "./footer/footer.component";

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ],
  exports: [
    SidebarComponent,
    TopbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    RouterLink,
    MatButtonModule,
    RouterModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgOptimizedImage
  ]
})
export class LayoutModule {
}
