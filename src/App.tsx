import { useEffect, useState } from "react";

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
  };

  const menuSections: MenuSection[] = [
    {
      title: 'Pasta',
      servings: ['Good for 20', 'Good for 30'],
      items: [
        { name: 'Pancit Malabon', prices: ['₱ 1,000', '₱ 1,300'] },
        { name: 'Pancit Canton', prices: ['₱ 1,000', '₱ 1,300'] },
        { name: 'Pancit Bihon', prices: ['₱ 950', '₱ 1,250'] },
        { name: 'Spaghetti', prices: ['₱ 1,000', '₱ 1,300'] },
        { name: 'Carbonara', prices: ['₱ 1,050', '₱ 1,350'] },
        { name: 'Pancit Sotanghon', prices: ['₱ 1,000', '₱ 1,300'] },
        { name: 'Puto (25 pcs)', prices: ['₱ 250'], note: 'Additionals\nCheese / Yema / Salted Egg Flavor' },
      ],
    },
    {
      title: 'Beef',
      servings: ['Good for 20 - 25'],
      items: [
        { name: 'Beef Kaldereta', prices: ['₱ 2,125'] },
        { name: 'Beef Steak', prices: ['₱ 2,125'] },
        { name: 'Crispy Kare-Kare', prices: ['₱ 2,125'] },
      ],
    },
    {
      title: 'Pork',
      servings: ['Good for 20 - 25'],
      items: [
        { name: 'Lechon Kawali', prices: ['₱ 2,000'] },
        { name: 'Pork Sisig', prices: ['₱ 1,800'] },
        { name: 'Pork Teriyaki', prices: ['₱ 1,800'] },
        { name: 'Sweet & Sour Pork', prices: ['₱ 1,800'] },
        { name: 'Giniling with quail egg', prices: ['₱ 1,600'] },
        { name: 'Menudo', prices: ['₱ 1,800'] },
        { name: 'Pork Tapa', prices: ['₱ 1,800'] },
        { name: 'Bicol Express', prices: ['₱ 1,800'] },
        { name: 'Pork Barbeque', prices: ['₱ 1,700'] },
        { name: 'Inihaw na Liempo', prices: ['₱ 2,000'] },
        { name: 'Pork Binagoongan', prices: ['₱ 1,800'] },
        { name: 'Pork Dinuguan', prices: ['₱ 1,700'] },
        { name: 'Pork Shanghai (50pcs)', prices: ['₱ 800'] },
        { name: 'Pork Shanghai (100pcs)', prices: ['₱ 1,600'] },
      ],
    },
    {
      title: 'Chicken',
      servings: ['Good for 20 - 25'],
      items: [
        { name: 'Chicken Fillet', prices: ['₱ 1,850'] },
        { name: 'Chicken Cordon Bleu', prices: ['₱ 2,000'] },
        { name: 'Chicken Afritada', prices: ['₱ 1,850'] },
        { name: 'Pininyahang Manok', prices: ['₱ 1,850'] },
        { name: 'Chicken Menudo (Boneless)', prices: ['₱ 1,750'] },
        { name: 'Chicken Pastel', prices: ['₱ 1,850'] },
        { name: 'Chicken Curry', prices: ['₱ 1,750'] },
        { name: 'Chicken Pastil', prices: ['₱ 1,750'] },
        { name: 'Chicken Shanghai (50pcs)', prices: ['₱ 900'] },
        { name: 'Chicken Shanghai (100pcs)', prices: ['₱ 1,750'] },
      ],
    },
    {
      title: 'Seafood',
      servings: ['Good for 20 - 25', 'Good for 25'],
      items: [
        { name: 'Calamares', prices: ['₱ 2,000', ''] },
        { name: 'Fish fillet', prices: ['₱ 1,800', ''] },
        { name: 'Seafood curry', prices: ['₱ 1,850', ''] },
        { name: 'Bangus Sisig', prices: ['₱ 1,700', ''] },
        { name: 'Dry Laing', prices: ['', '₱ 1,500'] },
      ],
    },
    {
      title: 'Per piece',
      servings: ['Per piece'],
      items: [
        { name: 'Boneless Inihaw na bangus (Medium)', prices: ['₱ 300'] },
        { name: 'Boneless Inihaw na bangus (Large)', prices: ['₱ 400'] },
        { name: 'Fresh Lumpia', prices: ['₱ 60'] },
        { name: 'Lumpiang Toge', prices: ['₱ 15'] },
      ],
    },
  ];

  const navItems = menuSections.map((section) => ({
    label: section.title,
    id: section.title.toLowerCase().replace(/\s+/g, '-'),
  }));

  const contacts = [
    { label: 'Smart / GCash', value: '0949 870 1629', href: 'tel:+639498701629' },
    { label: 'DITO', value: '0993 595 8246', href: 'tel:+639935958246' },
  ];

  const [activeSection, setActiveSection] = useState(navItems[0]?.id ?? "");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
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
    };
  }, [navItems]);

  return (
    <main className="bg-cream">
      <section id="top" className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="border-b border-black/10 pb-6">
          <p className="text-sm font-semibold tracking-wide text-ink/60">April 2026</p>
          <div className="mt-4">
            <h1 className="font-display text-5xl leading-none text-black sm:text-6xl">Menu</h1>
          </div>
        </header>

        <nav className="sticky top-0 z-10 mt-6 border-y border-black/10 bg-cream/95 pt-4 pb-3 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <a
              href="#top"
              className="shrink-0 font-display text-xl leading-none text-black transition hover:text-black/70 sm:text-2xl"
            >
              Ate Nhel&apos;s
            </a>
            <a
              href="#contact"
              className="inline-flex shrink-0 rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
            >
              Contact
            </a>
          </div>
          <div className="thin-scrollbar mt-4 min-w-0 overflow-x-auto">
            <div className="flex min-w-max gap-3">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeSection === item.id
                      ? "border-black bg-black text-white"
                      : "border-black/10 text-black/70 hover:border-black/30 hover:text-black"
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
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
              <div className="mb-5 flex flex-col gap-3 border-b border-black/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="font-display text-3xl text-black">{section.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {section.servings.map((serving) => (
                    <span
                      key={serving}
                      className="rounded-full border border-black/10 px-3 py-1 text-sm text-black/70"
                    >
                      {serving}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {section.items.map((item) => (
                  <article
                    key={item.name}
                    className="rounded-2xl border border-black/8 bg-white/70 px-4 py-4"
                  >
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                      <div>
                        <p className="text-base font-medium text-black sm:text-lg">{item.name}</p>
                        {item.note ? (
                          <p className="mt-1 whitespace-pre-line text-sm text-black/55">{item.note}</p>
                        ) : null}
                      </div>
                      <div className="grid min-w-[11rem] grid-cols-1 gap-3 text-left sm:text-right">
                        {section.servings.map((serving, index) =>
                          item.prices[index] ? (
                            <div key={`${item.name}-${serving}`} className="min-w-[5rem]">
                              <p className="text-xs font-medium uppercase tracking-wide text-black/45">{serving}</p>
                              <p className="mt-1 font-display text-2xl leading-tight text-black">
                                {item.prices[index]}
                              </p>
                            </div>
                          ) : null,
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
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
