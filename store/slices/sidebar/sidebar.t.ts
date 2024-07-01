export interface ISidebarStore {
  isOpen?: sidebarMenu;
}

export interface sidebarMenu {
  id: number | string;
  isOpen: boolean;
}
