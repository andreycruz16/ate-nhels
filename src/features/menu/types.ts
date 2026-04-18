export type MenuItem = {
  name: string;
  prices: string[];
  note?: string;
};

export type MenuTableData = {
  title?: string;
  servings: string[];
  items: MenuItem[];
};

export type MenuSection = {
  title: string;
  servings: string[];
  items: MenuItem[];
  extraTables?: MenuTableData[];
};

export type Contact = {
  label: string;
  value: string;
  href: string;
};

export type MenuData = {
  lastUpdated: string;
  brand: string;
  sectionEmojis: Record<string, string>;
  contacts: Contact[];
  menuSections: MenuSection[];
};

export type NavItem = {
  label: string;
  id: string;
  emoji: string;
};
