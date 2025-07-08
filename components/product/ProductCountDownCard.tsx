import type { Platform } from "../../apps/site.ts";
import { SendEventOnClick } from "../../components/Analytics.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { relative } from "../../sdk/url.ts";
import { useId } from "../../sdk/useId.ts";
import { sizeMappings } from "site/components/product/SizeMappings/SizeMappings.ts";
import { scriptAsDataURI } from "apps/utils/dataURI.ts";

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
  expiresAt?: string;

  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

const WIDTH = 200;
const HEIGHT = 279;

// Campaign Timer for Product Card

const snippet = (expiresAt: string, rootId: string) => {
  const expirationDate = new Date(expiresAt).getTime();

  const getDelta = () => {
    const delta = expirationDate - new Date().getTime();

    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const setValue = (id: string, value: number) => {
    const elem = document.getElementById(id);

    if (!elem) return;

    elem.style.setProperty("--value", value.toString());
  };

  const start = () =>
    setInterval(() => {
      const { days, hours, minutes, seconds } = getDelta();
      const isExpired = days + hours + minutes + seconds < 0;

      if (!isExpired) {
        const expired = document.getElementById(`${rootId}::expired`);
        const counter = document.getElementById(`${rootId}::counter`);

        expired && expired.classList.remove("hidden");
        counter && counter.classList.remove("hidden");
        
        setValue(`${rootId}::days`, days);
        setValue(`${rootId}::hours`, hours);
        setValue(`${rootId}::minutes`, minutes);
        setValue(`${rootId}::seconds`, seconds);
      }
    }, 1_000);

  document.readyState === "complete"
    ? start()
    : addEventListener("load", start);
};

function ProductCountDownCard({
  product,
  preload,
  itemListName,
  layout,
  index,
  expiresAt = `${new Date()}`,
  labels = {
    days: "Dias",
    hours: "Horas",
    minutes: "Min",
    seconds: "Seg",
  },
}: Props) {
  const {
    url,
    productID,
    image: images,
    offers,
    additionalProperty,
  } = product;
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
      ),
  );

  const arrProduct = product?.isVariantOf?.hasVariant?.map((item: any) => {
    return item?.additionalProperty?.find(
      (item: any) => item.name === "Tamanho",
    )?.value;
  });
  const firstSku = sizeMappings?.find((item: any) =>
    arrProduct?.includes(item?.size)
  )?.size;
  const lastSku = sizeMappings
    ?.toReversed()
    .find((item: any) => arrProduct?.includes(item?.size))?.size;

  const timerId = useId();
  interface TimeComponentProps {
    timerId: string;
    label: string | undefined;
    time: string;
  }

  const TimeComponent: preact.FunctionalComponent<TimeComponentProps> = ({
    timerId,
    label,
    time,
  }) => (
    <div class="flex flex-col items-center">
      <span class="countdown text-lg text-red-1">
        <span
          class="text-2lg text-base-content font-bold text-red-1"
          id={`${timerId}::${time}`}
        />
      </span>
      <span class="text-[10px] full-phone:text-[8px] uppercase text-red-1 font-thin">
        {label || ""}
      </span>
    </div>
  );

  const newUrl: any = new URL(url);
  newUrl?.searchParams?.delete("skuId");

  return (
    <div
      id={id}
      class={`card card-compact flex-row group px-2 ${
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
        class="relative w-full max-w-[350px] full-phone:w-1/2"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Product Images */}
        <a
          href={newUrl && relative(newUrl)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full rounded"
        >
          {/* <figcaption class="absolute top-1 left-0 flex flex-col justify-center items-center gap-[2px] full-phone:gap-0 p-2 full-phone:p-[2px] max-w-[68px] full-phone:max-w-[46px]">
            {firstSku && lastSku && (
              <span class="text-gray-0 text-[9px] leading-none full-phone:text-[8px] text-center font-light flex flex-col justify-center items-center flag-size">
                Tamanhos {firstSku} ao {lastSku}
              </span>
            )}
          </figcaption> */}
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full rounded w-full ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
            }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            // preload={preload}
            loading="lazy"
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full row-span-full transition-opacity rounded w-full opacity-0 lg:group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, 20vw"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col items-start justify-center w-full max-w-max full-phone:max-w-[185px] full-tablet:max-w-[210px] p-2 full-phone:p-1 gap-1 lg:gap-2 bg-white-0">
        <div>
          {clusterFlagValue && (
            <div class="flex flex-wrap justify-start items-center gap-1 overflow-hidden h-max max-h-[26px] max-w-[185px] min-h-[26px] truncate">
              {clusterFlagValue}
            </div>
          )}
        </div>
        {l?.hide?.productName
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-0">
              {l?.hide?.productName
                ? (
                  ""
                )
                : (
                  <h2
                    class="text-sm text-gray-1 capitalize font-normal w-full max-w-[185px] full-phone:max-w-[185px] full-tablet:max-w-[210px] name-countDown"
                    dangerouslySetInnerHTML={{
                      __html: product?.isVariantOf?.name ?? "",
                    }}
                  />
                )}
            </div>
          )}

        <div class="flex flex-col gap-2">
          <div
            class={`flex flex-col gap-0 
            } ${align === "center" ? "justify-center" : "justify-end"}`}
          >
            {listPrice !== price && (
              <div
                class={`line-through text-gray-0 text-sm font-normal ${
                  l?.basics?.oldPriceSize === "Normal" ? "lg:text-sm" : ""
                }`}
              >
                {formatPrice(listPrice, offers?.priceCurrency)}
              </div>
            )}
            <div class="flex flex-row gap-1 full-phone:justify-between">
              <div class="text-lg text-gray-0 font-semibold">
                {formatPrice(price, offers?.priceCurrency)}
              </div>
              {listPrice !== price && (
                <div class="flex items-center justify-center border border-red-1 px-1">
                  <span class="text-xs text-red-1 font-medium">
                    {listPrice && price
                      ? `${
                        Math.round(
                          ((listPrice - price) / listPrice) * 100,
                        )
                      }% `
                      : ""}
                    OFF
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-normal">
          <div id={`${timerId}::counter`} class="hidden">
            <span class="text-red-1 text-sm font-medium block">Expira em:</span>
            <div class="grid grid-flow-col gap-2 full-phone:gap-1 text-center full-phone:text-xs auto-cols-max items-center justify-between text-red-1 rounded border border-red-1 p-1 w-[190px] full-phone:max-w-[120px]">
              <TimeComponent
                timerId={timerId}
                label={labels?.days}
                time="days"
              />
              <TimeComponent
                timerId={timerId}
                label={labels?.hours}
                time="hours"
              />
              <TimeComponent
                timerId={timerId}
                label={labels?.minutes}
                time="min"
              />
              <TimeComponent
                timerId={timerId}
                label={labels?.seconds}
                time="seconds"
              />
            </div>
          </div>
        </div>
        <div class="buy-countdown block w-full">
          <a
            href={newUrl && relative(newUrl)}
            aria-label="view product"
            class="bg-blue-0 rounded h-[40px] w-full xxsm-phone:w-[164px] flex items-center justify-center text-white-0 text-sm font-normal"
          >
            Compre Agora
          </a>
        </div>
      </div>
      <script defer src={scriptAsDataURI(snippet, expiresAt, timerId)} />
    </div>
  );
}

export default ProductCountDownCard;
