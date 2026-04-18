import { useEffect, useRef, useState } from "react";

export function useContactActions() {
  const [copiedContact, setCopiedContact] = useState<string | null>(null);
  const [animatedContactAction, setAnimatedContactAction] = useState<string | null>(null);
  const copiedTimeoutRef = useRef<number | null>(null);
  const animatedActionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        window.clearTimeout(copiedTimeoutRef.current);
      }

      if (animatedActionTimeoutRef.current) {
        window.clearTimeout(animatedActionTimeoutRef.current);
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

  const animateContactAction = (actionId: string) => {
    setAnimatedContactAction(actionId);

    if (animatedActionTimeoutRef.current) {
      window.clearTimeout(animatedActionTimeoutRef.current);
    }

    animatedActionTimeoutRef.current = window.setTimeout(() => {
      setAnimatedContactAction(null);
      animatedActionTimeoutRef.current = null;
    }, 320);
  };

  return {
    animatedContactAction,
    copiedContact,
    animateContactAction,
    copyContactNumber,
  };
}
