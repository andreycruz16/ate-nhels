export const getTableId = (tableTitle: string | undefined, itemName: string) =>
  `${tableTitle ?? "table"}-${itemName}`;

export const getItemLabelParts = (itemName: string) => {
  const sizeMatch = itemName.match(/^(.*)\s\(([^)]+)\)$/);

  if (!sizeMatch) {
    return { title: itemName, meta: null as string | null };
  }

  return {
    title: sizeMatch[1],
    meta: sizeMatch[2],
  };
};

export const getSectionId = (title: string) => title.toLowerCase().replace(/\s+/g, "-");
