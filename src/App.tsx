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

  const renderMenuTable = (
    servings: string[],
    items: MenuItem[],
    options?: { title?: string },
  ) => (
    <div className="mt-5 first:mt-0">
      {options?.title ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-black/45">
          {options.title}
        </p>
      ) : null}

      <div className="rounded-3xl border border-black/8 bg-white/70 shadow-sm">
        <div className="divide-y divide-black/8 sm:hidden">
          {items.map((item) => (
            <article key={`${options?.title ?? "table"}-${item.name}`} className="px-4 py-4">
              <p className="text-base font-medium text-black">{item.name}</p>
              {item.note ? (
                <p className="mt-1 whitespace-pre-line text-sm text-black/55">{item.note}</p>
              ) : null}
              <div className="mt-3 grid gap-2">
                {servings.map((serving, index) => (
                  <div
                    key={`${options?.title ?? "table"}-${item.name}-${serving}`}
                    className="flex items-center justify-between gap-3 rounded-2xl bg-black/[0.03] px-3 py-2"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
                      {serving}
                    </p>
                    <p className="font-display text-xl leading-none text-black">
                      {item.prices[index] || "-"}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="hidden overflow-x-auto sm:block">
          <div
            className="grid min-w-[42rem] items-start"
            style={{ gridTemplateColumns: `minmax(16rem, 1.6fr) repeat(${servings.length}, minmax(9rem, 1fr))` }}
          >
            <div className="border-b border-black/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black/45 sm:px-5">
              Menu Item
            </div>
            {servings.map((serving) => (
              <div
                key={`${options?.title ?? "table"}-${serving}`}
                className="border-b border-l border-black/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black/45 sm:px-5 sm:text-right"
              >
                {serving}
              </div>
            ))}

            {items.map((item) => (
              <Fragment key={`${options?.title ?? "table"}-${item.name}`}>
                <div className="border-b border-black/8 px-4 py-4 sm:px-5">
                  <p className="text-base font-medium text-black sm:text-lg">{item.name}</p>
                  {item.note ? (
                    <p className="mt-1 whitespace-pre-line text-sm text-black/55">{item.note}</p>
                  ) : null}
                </div>
                {servings.map((serving, index) => (
                  <div
                    key={`${options?.title ?? "table"}-${item.name}-${serving}`}
                    className="border-b border-l border-black/8 px-4 py-4 text-left sm:px-5 sm:text-right"
                  >
                    <p className="font-display text-2xl leading-tight text-black">
                      {item.prices[index] || "-"}
                    </p>
                  </div>
                ))}
              </Fragment>
            ))}
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
  const [isNavVisible, setIsNavVisible] = useState(true);
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const pendingSectionTimeoutRef = useRef<number | null>(null);

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
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY <= 16) {
        setIsNavVisible(true);
      } else if (scrollDelta > 8) {
        setIsNavVisible(false);
      } else if (scrollDelta < -8) {
        setIsNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="bg-cream">
      <section id="top" className="mx-auto max-w-5xl px-4 pt-0 pb-8 sm:px-6 lg:px-8">
        <nav
          className={`sticky top-0 z-10 border-b border-black/10 bg-cream/95 pt-4 pb-3 backdrop-blur transition-transform duration-300 ${
            isNavVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="shrink-0 font-display text-xl leading-none font-bold text-black transition hover:text-black/70 sm:text-2xl"
            >
              {menuData.brand}
            </a>
            <a
              href="#contact"
              className="inline-flex shrink-0 rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Contact
            </a>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-black/45">
            Last updated {menuData.lastUpdated}
          </p>
          <div ref={navScrollRef} className="thin-scrollbar mt-4 min-w-0 overflow-x-auto">
            <div className="flex min-w-max gap-3">
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
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeSection === item.id
                      ? "border-black bg-black text-white"
                      : "border-black/10 text-black/70 hover:border-black/30 hover:text-black"
                  }`}
                >
                  <span className="whitespace-nowrap">
                    {item.emoji} {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-12 space-y-10">
          {menuSections.map((section) => (
            <section
              key={section.title}
              id={section.title.toLowerCase().replace(/\s+/g, '-')}
              className="scroll-mt-24"
            >
              <div className="mb-5 border-b border-black/10 pb-4">
                <h2 className="font-display text-3xl text-black">{section.title}</h2>
              </div>

              {renderMenuTable(section.servings, section.items)}

              {section.extraTables?.map((table) => (
                <Fragment key={`${section.title}-${table.title ?? table.servings.join("-")}`}>
                  {renderMenuTable(table.servings, table.items, { title: table.title })}
                </Fragment>
              ))}
            </section>
          ))}
        </div>

        <section id="contact" className="mt-12 border-t border-black/10 pt-8">
          <p className="text-sm text-black/60">For ordering information, please contact</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                className="rounded-2xl border border-black/10 bg-white px-4 py-4 transition hover:border-black/25"
              >
                <p className="text-sm text-black/55">{contact.label}</p>
                <p className="mt-1 font-display text-3xl leading-none text-black">{contact.value}</p>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
