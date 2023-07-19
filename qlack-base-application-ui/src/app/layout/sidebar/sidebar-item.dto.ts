import {IconProp} from "@fortawesome/fontawesome-svg-core";

export interface SidebarItemDto {
  icon?: IconProp;
  title?: string;
  route?: string;
  type: SidebarItemType;
}

export enum SidebarItemType {
  ITEM, CATEGORY, DIVIDER
}
