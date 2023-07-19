import {Component} from "@angular/core";
import {SidebarItemDto, SidebarItemType} from "./sidebar-item.dto";
import {
  faDashboard,
  faFilter,
  faGlobe,
  faHome,
  faMessage,
  faRectangleList,
  faServer,
  faTableList,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import {faWpforms} from "@fortawesome/free-brands-svg-icons";
import {BaseComponent} from "../../shared/component/base-component";
import {AppConstants} from "../../app.constants";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html"
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
      {icon: faHome, title: "Home", route: "home", type: SidebarItemType.ITEM}
    ];
    this.category2 = [
      {icon: faTableList, title: "Tables & CRUD", route: "employee", type: SidebarItemType.ITEM},
      {icon: faServer, title: "HTTP", route: "http", type: SidebarItemType.ITEM},
      {icon: faUpload, title: "Files", route: "files", type: SidebarItemType.ITEM},
      {icon: faFilter, title: "Data filtering", route: "sensitive", type: SidebarItemType.ITEM}
    ];
    this.category3 = [
      {icon: faRectangleList, title: "Forms", route: "forms", type: SidebarItemType.ITEM},
      {icon: faMessage, title: "Popups", route: "popups", type: SidebarItemType.ITEM},
      {icon: faGlobe, title: "I18n", route: "i18n", type: SidebarItemType.ITEM}
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
