export interface NavItem {
  title: string;
  link: string;
  icon?: string;
  count?: number;
  isGroup?: boolean;
  isNew?: boolean;
}

export interface NavSection {
  id: string;
  title: string;
  icon: string;
  description: string;
  basePath: string;
  items: NavItem[];
  actionLabel?: string;
  onAction?: () => void;
}

export interface Organization {
  id: string;
  name: string;
  logo?: string;
  plan: string;
}
