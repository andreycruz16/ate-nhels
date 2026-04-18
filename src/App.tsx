import { Fragment, useEffect, useRef, useState } from "react";
import menuData from "./data/menu.json";

function App() {
  type MenuItem = {
    name: string;
    prices: string[];
    note?: string;
  };

  type MenuSection = {
    title: string;
    servings: string[];
    items: MenuItem[];
    extraTables?: Array<{
      title?: string;
      servings: string[];
      items: MenuItem[];
    }>;
  };

  type Contact = {
    label: string;
    value: string;
    href: string;
  };

  const getTableId = (tableTitle: string | undefined, itemName: string) =>
    `${tableTitle ?? "table"}-${itemName}`;

  const getItemLabelParts = (itemName: string) => {
    const sizeMatch = itemName.match(/^(.*)\s\(([^)]+)\)$/);

    if (!sizeMatch) {
      return { title: itemName, meta: null as string | null };
    }

    return {
      title: sizeMatch[1],
      meta: sizeMatch[2],
    };
  };

  const renderMenuTable = (
    servings: string[],
    items: MenuItem[],
    options?: { title?: string },
  ) => (
    <div className="mt-4 first:mt-0">
      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white/82 shadow-[0_14px_40px_rgba(85,107,79,0.10)]">
        {options?.title ? (
          <div className="flex items-center justify-between gap-3 border-b border-black/8 bg-[linear-gradient(90deg,rgba(229,196,135,0.36),rgba(220,207,188,0.6))] px-4 py-3 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/50 sm:text-[11px]">
              {options.title}
            </p>
            <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/50">
              {items.length} items
            </div>
          </div>
        ) : null}

        <div className="overflow-hidden sm:overflow-x-auto">
          <div
            className="grid w-full items-start sm:min-w-[42rem]"
            style={{ gridTemplateColumns: `minmax(0, 1.7fr) repeat(${servings.length}, minmax(0, 1fr))` }}
          >
            <div className="sticky left-0 z-[2] flex min-h-11 items-center border-b border-black/8 bg-[#f3ece0] px-2.5 py-2 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-black/50 sm:min-h-12 sm:px-4 sm:py-2.5 sm:text-xs sm:tracking-[0.18em]">
              <span>Menu Item</span>
            </div>
            {servings.map((serving) => (
              <div
                key={`${options?.title ?? "table"}-${serving}`}
                className="flex min-h-11 items-center justify-center border-b border-l border-black/8 bg-[#f3ece0] px-1.5 py-2 text-center text-[9px] font-semibold leading-tight tracking-[0.08em] text-black/55 sm:min-h-12 sm:justify-end sm:px-4 sm:py-2.5 sm:text-right sm:text-xs sm:tracking-[0.18em]"
              >
                <span>{serving}</span>
              </div>
            ))}

            {items.map((item, itemIndex) => {
              const itemLabel = getItemLabelParts(item.name);

              return (
              <Fragment key={getTableId(options?.title, item.name)}>
                <div
                  className={`sticky left-0 z-[1] border-b border-black/8 px-2.5 py-2.5 backdrop-blur sm:px-4 sm:py-3 ${
                    itemIndex % 2 === 0 ? "bg-white/95" : "bg-[#faf5ed]/95"
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-1.5 sm:gap-2">
                    <p className="min-w-0 text-[12px] font-semibold leading-snug text-black sm:text-[15px]">
                      {itemLabel.title}
                    </p>
                    {itemLabel.meta ? (
                      <span className="whitespace-nowrap rounded-full bg-[#c46a4a]/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#8b4b33] sm:px-2 sm:text-[10px] sm:tracking-[0.12em]">
                        {itemLabel.meta}
                      </span>
                    ) : null}
                  </div>
                  {item.note ? (
                    <p className="mt-1 whitespace-pre-line text-[11px] leading-snug text-black/55 sm:text-xs sm:leading-relaxed">{item.note}</p>
                  ) : null}
                </div>
                {servings.map((serving, index) => (
                  <div
                    key={`${getTableId(options?.title, item.name)}-${serving}`}
                    className={`border-b border-l border-black/8 px-1.5 py-2.5 text-center sm:px-4 sm:py-3 sm:text-right ${
                      itemIndex % 2 === 0 ? "bg-white/65" : "bg-[#faf5ed]/80"
                    }`}
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

  const sectionEmojis = menuData.sectionEmojis as Record<string, string>;
  const menuSections = menuData.menuSections as MenuSection[];

  const navItems = menuSections.map((section) => ({
    label: section.title,
    id: section.title.toLowerCase().replace(/\s+/g, '-'),
    emoji: sectionEmojis[section.title] ?? '🍽️',
  }));

  const contacts = menuData.contacts as Contact[];

  const [activeSection, setActiveSection] = useState(navItems[0]?.id ?? "");
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const pendingSectionTimeoutRef = useRef<number | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (pendingSectionRef.current) {
          const pendingEntry = entries.find(
            (entry) => entry.target.id === pendingSectionRef.current && entry.isIntersecting,
          );

          if (pendingEntry) {
            setActiveSection(pendingSectionRef.current);
            pendingSectionRef.current = null;

            if (pendingSectionTimeoutRef.current) {
              window.clearTimeout(pendingSectionTimeoutRef.current);
              pendingSectionTimeoutRef.current = null;
            }
          }

          return;
        }

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();

      if (pendingSectionTimeoutRef.current) {
        window.clearTimeout(pendingSectionTimeoutRef.current);
        pendingSectionTimeoutRef.current = null;
      }
    };
  }, [navItems]);

  useEffect(() => {
    if (!activeSection || !navScrollRef.current) {
      return;
    }

    const activeTab = navScrollRef.current.querySelector<HTMLElement>(`[data-tab-id="${activeSection}"]`);

    activeTab?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeSection]);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const copyContactNumber = async (label: string, value: string) => {
    const finalizeCopy = () => {
      setCopiedContact(label);

      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      copiedTimeoutRef.current = window.setTimeout(() => {
        setCopiedContact(null);
        copiedTimeoutRef.current = null;
      }, 1800);
    };

    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        finalizeCopy();
        return;
      }

      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.top = "0";
      textArea.style.left = "-9999px";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      textArea.setSelectionRange(0, textArea.value.length);

      const copied = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (!copied) {
        throw new Error("Fallback copy failed");
      }

      finalizeCopy();
    } catch {
      setCopiedContact(null);
    }
  };

  return (
    <main className="bg-cream">
      <section id="top" className="mx-auto max-w-5xl px-4 pt-0 pb-8 sm:px-6 lg:px-8">
        <nav className="sticky top-0 z-10 border-b border-black/10 bg-cream/90 pt-3 pb-2 backdrop-blur sm:pt-4 sm:pb-3">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="shrink-0 font-display text-lg leading-none font-bold text-olive transition hover:text-clay sm:text-2xl"
            >
              {menuData.brand}
            </a>
            <a
              href="#contact"
              className="inline-flex shrink-0 rounded-full border border-black/10 bg-white/65 px-3 py-1.5 text-xs font-medium text-olive transition hover:bg-olive hover:text-white sm:px-4 sm:py-2 sm:text-sm"
            >
              Contact
            </a>
          </div>
          <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/45 sm:mt-3 sm:text-xs sm:tracking-[0.22em]">
            Last updated {menuData.lastUpdated}
          </p>
          <div className="mt-2 overflow-hidden sm:mt-3">
            <div ref={navScrollRef} className="thin-scrollbar min-w-0 overflow-x-auto">
            <div className="flex min-w-max gap-2 sm:gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-tab-id={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    pendingSectionRef.current = item.id;

                    if (pendingSectionTimeoutRef.current) {
                      window.clearTimeout(pendingSectionTimeoutRef.current);
                    }

                    pendingSectionTimeoutRef.current = window.setTimeout(() => {
                      pendingSectionRef.current = null;
                      pendingSectionTimeoutRef.current = null;
                    }, 800);
                  }}
                  className={`rounded-full border px-2.5 py-1 text-[11px] transition sm:px-4 sm:py-2 sm:text-sm ${
                    activeSection === item.id
                      ? "border-olive bg-olive text-white"
                      : "border-black/10 bg-white/55 text-black/70 hover:border-olive/30 hover:bg-[#f1e6d4] hover:text-olive"
                  }`}
                >
                  <span className="whitespace-nowrap">
                    {item.emoji} {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
          </div>
        </nav>

        <div className="mt-8 space-y-8 sm:mt-12 sm:space-y-10">
          {menuSections.map((section) => (
            <section
              key={section.title}
              id={section.title.toLowerCase().replace(/\s+/g, '-')}
              className="scroll-mt-40 sm:scroll-mt-44"
            >
              <div className="rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.68),rgba(229,196,135,0.18))] p-4 shadow-[0_20px_60px_rgba(85,107,79,0.08)] sm:p-6">
                <div className="mb-4 flex items-end justify-between gap-4 border-b border-black/10 pb-3 sm:mb-5 sm:pb-4">
                  <div>
                    <h2 className="font-display text-2xl text-olive sm:text-3xl">{section.title}</h2>
                  </div>
                  <div className="hidden rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45 sm:block">
                    {section.items.length + (section.extraTables?.reduce((sum, table) => sum + table.items.length, 0) ?? 0)} choices
                  </div>
                </div>

                {renderMenuTable(section.servings, section.items)}

                {section.extraTables?.map((table) => (
                  <Fragment key={`${section.title}-${table.title ?? table.servings.join("-")}`}>
                    {renderMenuTable(table.servings, table.items, { title: table.title })}
                  </Fragment>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section id="contact" className="mt-12 border-t border-black/10 pt-8">
          <p className="text-sm text-black/60">For ordering information, please contact</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {contacts.map((contact) => (
              <div
                key={contact.label}
                className="flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white/78 px-4 py-4 shadow-[0_12px_28px_rgba(85,107,79,0.08)]"
              >
                <div className="min-w-0">
                  <p className="text-sm text-black/55">{contact.label}</p>
                  <p className="mt-1 font-display text-3xl leading-none text-olive">{contact.value}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    void copyContactNumber(contact.label, contact.value);
                  }}
                  className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
                    copiedContact === contact.label
                      ? "copy-success border-clay bg-clay text-white"
                      : "border-black/10 bg-[#f7efe3] text-olive hover:border-olive/30 hover:bg-olive hover:text-white"
                  }`}
                >
                  {copiedContact === contact.label ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
