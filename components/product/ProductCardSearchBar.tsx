import { SendEventOnClick } from "../../components/Analytics.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    cta?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
}

const WIDTH = 50;
const HEIGHT = 50;

function ProductCardSearchBar({
  product,
  preload,
  itemListName,
  layout,
  index,
}: Props) {
  const { url, productID, name, image: images, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const [front] = images ?? [];

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  const newUrl: any = new URL(url);
  newUrl?.searchParams?.delete("skuId");

  const relativeUrl = relative(newUrl);

  const cta = (
    <a
      href={newUrl && relative(newUrl)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );

  return (
    <div
      id={id}
      class="card card-compact group w-full"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                index,
              }),
            ],
          },
        }}
      />
      <div class="flex-auto flex flex-row p-2 gap-3 lg:gap-2">
        <figure class="relative overflow-hidden">
          {/* Product Images */}
          <a
            href={newUrl && relative(newUrl)}
            aria-label="view product"
            class="grid grid-cols-1 grid-rows-1 w-full"
          >
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class={`w-full max-w-12`}
              sizes="(max-width: 50px)"
              preload={preload}
              loading={preload ? "eager" : "lazy"}
              decoding="async"
            />
          </a>
        </figure>
        <div class="flex flex-col gap-0 justify-center">
          <a
            href={newUrl && relative(newUrl)}
            aria-label="view product"
            class="grid grid-cols-1 grid-rows-1 w-full"
          >
            {l?.hide?.productName
              ? (
                ""
              )
              : (
                <h2
                  class="truncate text-xs text-gray-1 capitalize font-normal"
                  dangerouslySetInnerHTML={{ __html: name ?? "" }}
                />
              )}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductCardSearchBar;
