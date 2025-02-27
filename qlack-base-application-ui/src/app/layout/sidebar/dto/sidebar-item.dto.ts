export interface SidebarItemDto {
  icon?: string;
  title?: string;
  route?: string;
  type: SidebarItemType;
}

export enum SidebarItemType {
  ITEM, CATEGORY, DIVIDER
}
