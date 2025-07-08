import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";
import QuickBuyButton from "site/islands/QuickBuyButton/QuickBuyButton.tsx";
import { sizeMappings } from "site/components/product/SizeMappings/SizeMappings.ts";

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
    productDescription?: boolean;
    allPrices?: boolean;
    discount?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    favoriteIcon?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
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
  platform?: Platform;
}

const WIDTH = 200;
const HEIGHT = 279;

function ProductCard({ product, preload, itemListName, layout, index }: Props) {
  const { url, productID, image: images, offers, additionalProperty } = product;
  const id = `product-card-${productID}`;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);
  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  const clusterFlagValue = additionalProperty?.map(
    (item) =>
      item?.description === "highlight" && (
        <span class="block border border-solid border-gray-15 p-1 full-phone:p-[2px] font-poppins text-xs full-phone:text-[10px] text-gray-0 w-fit rounded-sm truncate">
          {item?.value
            ?.replace(" -Mundi", "")
            .replace(" - Mundi", "")
            .replace("-2024", "")}
        </span>
      )
  );

  const arrProduct = product?.isVariantOf?.hasVariant?.map((item: any) => {
    return item?.additionalProperty?.find(
      (item: any) => item.name === "Tamanho"
    )?.value;
  });

  const firstSku = sizeMappings?.find((item: any) =>
    arrProduct?.includes(item?.size)
  )?.size;
  const lastSku = sizeMappings
    ?.toReversed()
    .find((item: any) => arrProduct?.includes(item?.size))?.size;

  const newUrl: any = new URL(url);
  newUrl?.searchParams?.delete("skuId");

  return (
    <div
      id={id}
      class={`card card-compact group w-full px-2 full-phone:px-[3px] ${
        align === "center" ? "text-center" : "text-start"
      }
        ${
          l?.onMouseOver?.card === "Move up" &&
          "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
        }
      `}
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
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Product Images */}
        <a
          href={newUrl && relative(newUrl)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full rounded"
        >
          {/* <figcaption class="absolute z-10 top-1 left-0 flex flex-col justify-center items-center gap-[2px] full-phone:gap-0 p-2 full-phone:p-[2px] max-w-[68px] full-phone:max-w-[46px]">
            {firstSku && lastSku && firstSku !== lastSku && (
              <span class="text-gray-0 text-[9px] leading-none full-phone:text-[8px] text-center font-light flex flex-col justify-center items-center flag-size">
                Tamanhos {firstSku} ao {lastSku}
              </span>
            )}
            {firstSku && lastSku && firstSku === lastSku && (
              <span class="text-gray-0 text-[9px] leading-none full-phone:text-[8px] text-center font-light flex flex-col justify-center items-center flag-size">
                Tamanho {firstSku}
              </span>
            )}
          </figcaption> */}
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full max-h-[463px] ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale transition-3s scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full row-span-full transition-opacity transition-3s rounded w-full opacity-0 lg:group-hover:opacity-100 max-h-[463px]"
              loading="lazy"
              decoding="async"
            />
          )}
          <div
            class={`${
              back?.url ? "visible" : "hidden"
            } hover-image full-tablet:hidden w-[116px] absolute bottom-[3px] h-[3px] bg-gray-0/70 transition-3s left-0 lg:group-hover:translate-x-[200%] lg:group-hover:left-auto`}
          ></div>
        </a>
        <QuickBuyButton product={product} />
      </figure>
      {/* Prices & Name */}
      {clusterFlagValue && (
        <div class="bg-white-0 p-1 flex flex-wrap justify-start items-center gap-1 overflow-hidden h-max max-h-[60px] full-phone:max-h-[56px]">
          {clusterFlagValue}
        </div>
      )}
      <div class="flex-auto flex flex-col p-2 full-phone:p-1 gap-3 lg:gap-2 bg-white-0">
        {l?.hide?.productName ? (
          ""
        ) : (
          <div class="flex flex-col gap-0">
            {l?.hide?.productName ? (
              ""
            ) : (
              <h2
                class="truncate text-sm text-gray-1 font-normal mob-prod-name"
                dangerouslySetInnerHTML={{
                  __html: product?.isVariantOf?.name ?? "",
                }}
              />
            )}
          </div>
        )}

        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-0 min-h-12 justify-center">
            {listPrice !== price && (
              <div
                class={`line-through text-gray-0 text-sm font-normal ${
                  l?.basics?.oldPriceSize === "Normal" ? "lg:text-sm" : ""
                }`}
              >
                {formatPrice(listPrice, offers?.priceCurrency)}
              </div>
            )}
            <div class="flex flex-row gap-1 full-phone:justify-between items-center">
              <div class="text-lg text-gray-0 font-semibold">
                {formatPrice(price, offers?.priceCurrency)}
              </div>
              {listPrice !== price && (
                <div class="flex items-center justify-center border border-red-1 w-[56px] h-[22px]">
                  <span class="text-xs text-red-1 font-medium">
                    {listPrice && price
                      ? `${Math.round(
                          ((listPrice - price) / listPrice) * 100
                        )}% `
                      : ""}
                    OFF
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
