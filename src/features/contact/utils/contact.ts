export const getSmsHref = (href: string, value: string) => {
  if (href.startsWith("sms:")) {
    return href;
  }

  const phoneNumber = href.startsWith("tel:") ? href.slice(4) : value.replace(/\s+/g, "");

  return `sms:${phoneNumber}`;
};
