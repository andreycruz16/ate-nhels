import { useEffect } from "react";
import { ContactSection } from "./features/contact/components/ContactSection";
import { useContactActions } from "./features/contact/hooks/useContactActions";
import { menuContent } from "./features/menu/data/menuContent";
import { MenuSections } from "./features/menu/components/MenuSections";
import { MenuHeader } from "./features/navigation/components/MenuHeader";
import { useSectionNavigation } from "./features/navigation/hooks/useSectionNavigation";

function App() {
  const { activeSection, navScrollRef, scrollToSection } = useSectionNavigation(menuContent.navItems);
  const { copiedContact, animatedContactAction, animateContactAction, copyContactNumber } = useContactActions();

  useEffect(() => {
    document.title = menuContent.browserTitle;
  }, []);

  return (
    <main className="bg-cream">
      <section id="top" className="mx-auto max-w-5xl px-4 pt-0 pb-8 sm:px-6 lg:px-8">
        <MenuHeader
          brand={menuContent.brand}
          lastUpdated={menuContent.lastUpdated}
          navItems={menuContent.navItems}
          activeSection={activeSection}
          navScrollRef={navScrollRef}
          onNavigate={scrollToSection}
        />

        <MenuSections sections={menuContent.menuSections} />

        <ContactSection
          contacts={menuContent.contacts}
          copiedContact={copiedContact}
          animatedContactAction={animatedContactAction}
          onCopy={copyContactNumber}
          onAnimate={animateContactAction}
        />
      </section>
    </main>
  );
}

export default App;
