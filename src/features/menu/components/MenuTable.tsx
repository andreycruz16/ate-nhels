import { Fragment } from "react";
import type { MenuItem } from "../types";
import { getItemLabelParts, getTableId } from "../utils/menu";

type MenuTableProps = {
  servings: string[];
  items: MenuItem[];
  title?: string;
};

export function MenuTable({ servings, items, title }: MenuTableProps) {
  return (
    <div className="mt-4 first:mt-0">
      <div className="overflow-hidden rounded-xl border border-black/12 bg-white/82 shadow-[0_14px_40px_rgba(85,107,79,0.10)]">
        {title ? (
          <div className="flex items-center justify-between gap-3 border-b border-black/12 bg-[linear-gradient(90deg,rgba(229,196,135,0.36),rgba(220,207,188,0.6))] px-4 py-3 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50 sm:text-[11px]">
              {title}
            </p>
          </div>
        ) : null}

        <div className="overflow-hidden sm:overflow-x-auto">
          <div
            className="grid w-full items-start sm:min-w-[42rem]"
            style={{ gridTemplateColumns: `minmax(0, 1.7fr) repeat(${servings.length}, minmax(0, 1fr))` }}
          >
            <div className="sticky left-0 z-[2] flex min-h-11 items-center border-r border-b border-black/15 bg-[#f3ece0] px-2.5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-black/50 sm:min-h-12 sm:px-4 sm:py-2.5 sm:text-sm sm:tracking-[0.18em]">
              <span>Menu Item</span>
            </div>
            {servings.map((serving) => (
              <div
                key={`${title ?? "table"}-${serving}`}
                className="flex min-h-11 items-center justify-center border-b border-l border-black/15 bg-[#f3ece0] px-1.5 py-2 text-center text-[10px] font-semibold leading-tight tracking-[0.08em] text-black/55 sm:min-h-12 sm:justify-end sm:px-4 sm:py-2.5 sm:text-right sm:text-sm sm:tracking-[0.18em]"
              >
                <span>{serving}</span>
              </div>
            ))}

            {items.map((item) => {
              const itemLabel = getItemLabelParts(item.name);

              return (
                <Fragment key={getTableId(title, item.name)}>
                  <div className="sticky left-0 z-[1] flex h-full flex-col justify-center border-r border-b border-black/15 bg-white/95 px-2.5 py-2.5 backdrop-blur sm:px-4 sm:py-3">
                    <div className="flex flex-wrap items-start gap-1.5 sm:gap-2">
                      <p className="min-w-0 text-[12px] font-semibold leading-snug text-black sm:text-[15px]">
                        {itemLabel.title}
                      </p>
                      {itemLabel.meta ? (
                        <span className="whitespace-nowrap rounded-full border border-black/10 bg-black/[0.04] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-black/60 sm:px-2 sm:text-[10px] sm:tracking-[0.12em]">
                          {itemLabel.meta}
                        </span>
                      ) : null}
                    </div>
                    {item.note ? (
                      <p className="mt-1 whitespace-pre-line text-[11px] leading-snug text-black/55 sm:text-xs sm:leading-relaxed">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                  {servings.map((serving, index) => (
                    <div
                      key={`${getTableId(title, item.name)}-${serving}`}
                      className="flex h-full items-center justify-center border-b border-l border-black/15 bg-white/65 px-1.5 py-2.5 text-center sm:justify-end sm:px-4 sm:py-3 sm:text-right"
                    >
                      <p className="font-display text-[1rem] leading-none text-black sm:text-[1.35rem]">
                        {item.prices[index] || "-"}
                      </p>
                    </div>
                  ))}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
