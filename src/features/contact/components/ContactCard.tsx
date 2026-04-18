import type { Contact } from "../../menu/types";
import { getSmsHref } from "../utils/contact";

type ContactCardProps = {
  contact: Contact;
  copiedContact: string | null;
  animatedContactAction: string | null;
  onCopy: (label: string, value: string) => Promise<void>;
  onAnimate: (actionId: string) => void;
};

export function ContactCard({
  contact,
  copiedContact,
  animatedContactAction,
  onCopy,
  onAnimate,
}: ContactCardProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/78 px-4 py-4 shadow-[0_12px_28px_rgba(85,107,79,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-black/55">{contact.label}</p>
          <p className="mt-1 font-display text-3xl leading-none text-olive">{contact.value}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            onAnimate(`${contact.label}-copy`);
            void onCopy(contact.label, contact.value);
          }}
          className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
            copiedContact === contact.label || animatedContactAction === `${contact.label}-copy`
              ? "copy-success border-clay bg-clay text-white"
              : "border-black/10 bg-[#f7efe3] text-olive hover:border-olive/30 hover:bg-olive hover:text-white"
          }`}
        >
          {copiedContact === contact.label ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={contact.href}
          onClick={() => {
            onAnimate(`${contact.label}-call`);
          }}
          className={`inline-flex min-w-[7rem] items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
            animatedContactAction === `${contact.label}-call`
              ? "copy-success border-clay bg-clay text-white"
              : "border-olive/20 bg-olive text-white hover:bg-[#445640]"
          }`}
        >
          Call
        </a>
        <a
          href={getSmsHref(contact.href, contact.value)}
          onClick={() => {
            onAnimate(`${contact.label}-text`);
          }}
          className={`inline-flex min-w-[7rem] items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition ${
            animatedContactAction === `${contact.label}-text`
              ? "copy-success border-clay bg-clay text-white"
              : "border-black/10 bg-[#f7efe3] text-olive hover:border-olive/30 hover:bg-[#efe2cd]"
          }`}
        >
          Text
        </a>
      </div>
    </div>
  );
}
