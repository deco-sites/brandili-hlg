import Avatar from "../../components/ui/Avatar.tsx";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import { clx } from "site/sdk/clx.ts";
import { useSection } from "@deco/deco/hooks";
interface Props {
  product: Product;
}
export const ringClass = clx(
  "h-6 w-6",
  "rounded-full text-center",
  "ring-1 ring-offset-4",
  "ring-base-300 peer-checked:ring-base-content",
);
function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  return (
    <ul
      class="flex flex-col gap-4"
      hx-target="closest section"
      hx-swap="outerHTML"
      hx-sync="this:replace"
    >
      {Object.keys(possibilities).map((name) => (
        <li class="flex flex-col gap-2">
          <span class="text-xs text-gray-0">{name}:</span>
          <ul class="flex flex-row gap-1 flex-wrap">
            {Object.entries(possibilities[name]).map(([value, link]) => {
              const relativeUrl = relative(url);
              const relativeLink = relative(link);
              return (
                <li>
                  <label
                    class="cursor-pointer"
                    hx-get={useSection({ href: relativeLink })}
                  >
                    {/* Checkbox for radio button on the frontend */}
                    <input
                      class="hidden peer"
                      type="radio"
                      name={name}
                      checked={relativeLink === relativeUrl}
                    />
                    <div class="block [.htmx-request_&]:hidden">
                      <Avatar
                        content={value}
                        variant={relativeLink === relativeUrl &&
                            !relativeLink?.includes("&isAvailable=true")
                          ? "active"
                          : relativeLink?.includes("&isAvailable=true")
                          ? "default"
                          : relativeLink?.includes("&isAvailable=false")
                          ? "disabled"
                          : "default"}
                      />
                    </div>
                    {/* Loading spinner */}
                    <div class="w-[52px] h-10 justify-center items-center hidden [.htmx-request_&]:flex">
                      <span
                        class={clx(
                          ringClass,
                          "loading loading-xs loading-spinner",
                        )}
                      />
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}
export default VariantSelector;
