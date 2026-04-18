import type { MenuSection } from "../types";
import { MenuSectionCard } from "./MenuSectionCard";

type MenuSectionsProps = {
  sections: MenuSection[];
};

export function MenuSections({ sections }: MenuSectionsProps) {
  return (
    <div className="mt-8 space-y-8 sm:mt-12 sm:space-y-10">
      {sections.map((section) => (
        <MenuSectionCard key={section.title} section={section} />
      ))}
    </div>
  );
}
