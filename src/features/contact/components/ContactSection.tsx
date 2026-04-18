import type { Contact } from "../../menu/types";
import { ContactCard } from "./ContactCard";

type ContactSectionProps = {
  contacts: Contact[];
  copiedContact: string | null;
  animatedContactAction: string | null;
  onCopy: (label: string, value: string) => Promise<void>;
  onAnimate: (actionId: string) => void;
};

export function ContactSection({
  contacts,
  copiedContact,
  animatedContactAction,
  onCopy,
  onAnimate,
}: ContactSectionProps) {
  return (
    <section id="contact" className="mt-12 border-t border-black/10 pt-8">
      <p className="text-sm text-black/60">For ordering information, please contact</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.label}
            contact={contact}
            copiedContact={copiedContact}
            animatedContactAction={animatedContactAction}
            onCopy={onCopy}
            onAnimate={onAnimate}
          />
        ))}
      </div>
    </section>
  );
}
