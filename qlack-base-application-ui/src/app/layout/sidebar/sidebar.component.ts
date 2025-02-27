import {Component} from "@angular/core";
import {SidebarItemDto, SidebarItemType} from "./dto/sidebar-item.dto";
import {BaseComponent} from "../../shared/component/base-component";
import {AppConstants} from "../../app.constants";
import {NgClass, NgFor, NgIf, NgOptimizedImage, NgSwitch, NgSwitchCase} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    imports: [NgClass, NgIf, NgOptimizedImage, NgFor, NgSwitch, NgSwitchCase, RouterLinkActive, RouterLink, MatTooltip]
})
export class SidebarComponent extends BaseComponent {
  menuItemType = SidebarItemType;
  sidebar = true;
  menuItems: SidebarItemDto[] = [];
  private category1: SidebarItemDto[] = [];
  private category2: SidebarItemDto[] = [];
  private category3: SidebarItemDto[] = [];

  constructor() {
    super();
    this.addSidebarEntries();
    var isSidebarVisible = localStorage.getItem(AppConstants.LOCAL_STORAGE_SIDEBAR);
    if (isSidebarVisible) {
      this.sidebar = JSON.parse(isSidebarVisible);
    }
  }

  /**
   * Sidebar is created dynamically to take into account the user's permissions.
   */
  addSidebarEntries() {
    // Define sidebar entries
    this.category1 = [
      {icon: "fa-home", title: "Home", route: "home", type: SidebarItemType.ITEM}
    ];
    this.category2 = [
      {icon: "fa-table-list", title: "Tables & CRUD", route: "employee", type: SidebarItemType.ITEM},
      {icon: "fa-server", title: "HTTP", route: "http", type: SidebarItemType.ITEM},
      {icon: "fa-upload", title: "Files", route: "files", type: SidebarItemType.ITEM},
      {icon: "fa-filter", title: "Data filtering", route: "sensitive", type: SidebarItemType.ITEM}
    ];
    this.category3 = [
      {icon: "fa-rectangle-list", title: "Forms", route: "forms", type: SidebarItemType.ITEM},
      {icon: "fa-message", title: "Popups", route: "popups", type: SidebarItemType.ITEM},
      {icon: "fa-globe", title: "I18n", route: "i18n", type: SidebarItemType.ITEM}
    ];

    // Create sidebar.
    if (this.category1.length > 0) {
      this.menuItems = this.menuItems.concat(this.category1);
    }
    this.menuItems = this.menuItems.concat(
      {type: SidebarItemType.CATEGORY, title: "Category 2"}, this.category2);
    this.menuItems = this.menuItems.concat(
      {type: SidebarItemType.CATEGORY, title: "Category 3"}, this.category3);
  }

  toggleSidebar() {
    this.sidebar = !this.sidebar;
    localStorage.setItem(AppConstants.LOCAL_STORAGE_SIDEBAR, this.sidebar.toString());
  }
}
