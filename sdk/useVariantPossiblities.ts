import type { ProductLeaf, PropertyValue } from "apps/commerce/types.ts";
import { useOffer } from "site/sdk/useOffer.ts";

export type Possibilities = Record<string, Record<string, string | undefined>>;

const hash = ({ name, value }: PropertyValue) => `${name}::${value}`;

const omit = new Set(["category", "cluster", "RefId", "descriptionHtml"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductLeaf,
): Possibilities => {
  const possibilities: Possibilities = {};

  const selectedSpecs = new Set(selected.additionalProperty?.map(hash));

  for (const variant of variants) {
    const { url, additionalProperty = [], productID, offers } = variant;
    const { availability } = useOffer(offers);
    const isSelected = productID === selected.productID;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;
      const isAvailable = availability === "https://schema.org/InStock";

      if (omit.has(name)) continue;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      // First row is always selectable
      const isSelectable = it === 0 ||
        specs.every((s) => s.name === name || selectedSpecs.has(hash(s)));

      possibilities[name][value] = isSelected
        ? url
        : isSelectable
        ? possibilities[name][value] || url + `&isAvailable=${isAvailable}`
        : possibilities[name][value];
    }
  }

  return possibilities;
};
