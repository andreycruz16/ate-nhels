import { Fragment } from "react";
import type { MenuSection } from "../types";
import { getSectionId } from "../utils/menu";
import { MenuTable } from "./MenuTable";

type MenuSectionCardProps = {
  section: MenuSection;
};

export function MenuSectionCard({ section }: MenuSectionCardProps) {
  const choiceCount =
    section.items.length + (section.extraTables?.reduce((sum, table) => sum + table.items.length, 0) ?? 0);

  return (
    <section id={getSectionId(section.title)} className="scroll-mt-40 sm:scroll-mt-44">
      <div className="rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(229,196,135,0.18))] p-4 shadow-[0_20px_60px_rgba(85,107,79,0.08)] sm:p-6">
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-black/10 pb-3 sm:mb-5 sm:pb-4">
          <div>
            <h2 className="font-display text-2xl text-olive sm:text-3xl">{section.title}</h2>
          </div>
          <div className="hidden rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/55 sm:block">
            {choiceCount} choices
          </div>
        </div>

        <MenuTable servings={section.servings} items={section.items} />

        {section.extraTables?.map((table) => (
          <Fragment key={`${section.title}-${table.title ?? table.servings.join("-")}`}>
            <MenuTable servings={table.servings} items={table.items} title={table.title} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
