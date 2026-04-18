import rawMenuData from "../../../data/menu.json";
import type { MenuData, NavItem } from "../types";
import { getSectionId } from "../utils/menu";

const menuData = rawMenuData as MenuData;

export const menuContent = {
  ...menuData,
  navItems: menuData.menuSections.map(
    (section): NavItem => ({
      label: section.title,
      id: getSectionId(section.title),
      emoji: menuData.sectionEmojis[section.title] ?? "🍽️",
    }),
  ),
  browserTitle: `${menuData.brand} | Menu Updated ${menuData.lastUpdated}`,
};
