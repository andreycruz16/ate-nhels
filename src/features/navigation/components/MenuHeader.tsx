import type { RefObject } from "react";
import type { NavItem } from "../../menu/types";

type MenuHeaderProps = {
  brand: string;
  lastUpdated: string;
  navItems: NavItem[];
  activeSection: string;
  navScrollRef: RefObject<HTMLDivElement | null>;
  onNavigate: (sectionId: string) => void;
};

export function MenuHeader({
  brand,
  lastUpdated,
  navItems,
  activeSection,
  navScrollRef,
  onNavigate,
}: MenuHeaderProps) {
  return (
    <nav className="sticky top-0 z-10 border-b border-black/10 bg-cream/90 pt-3 pb-2 backdrop-blur sm:pt-4 sm:pb-3">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate("top")}
          className="shrink-0 font-display text-lg leading-none font-bold text-olive transition hover:text-clay sm:text-2xl"
        >
          {brand}
        </button>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="inline-flex rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-xs font-medium text-olive transition hover:bg-olive hover:text-white sm:px-4 sm:py-2 sm:text-sm"
          >
            Contact
          </button>
        </div>
      </div>
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45 sm:mt-3 sm:text-xs sm:tracking-[0.22em]">
        Menu updated {lastUpdated}
      </p>
      <div className="mt-2 overflow-hidden sm:mt-3">
        <div ref={navScrollRef} className="thin-scrollbar min-w-0 overflow-x-auto">
          <div className="flex min-w-max gap-2 sm:gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                data-tab-id={item.id}
                onClick={() => onNavigate(item.id)}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition sm:px-4 sm:py-2 sm:text-sm ${
                  activeSection === item.id
                    ? "border-olive bg-olive text-white"
                    : "border-black/10 bg-white/55 text-black/70 hover:border-olive/30 hover:bg-[#f1e6d4] hover:text-olive"
                }`}
              >
                <span className="whitespace-nowrap">
                  {item.emoji} {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
