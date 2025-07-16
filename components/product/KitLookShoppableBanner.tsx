import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../ui/Icon.tsx";
import ProductCard, { Layout as cardLayout } from "./ProductCard.tsx";
import Slider from "../ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";
import KitLookBuyButton from "site/islands/KitLookBuyButton/KitLookBuyButton.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import Image from "apps/website/components/Image.tsx";

export interface Pin {
  mobile: {
    x: number;
    y: number;
  };
  desktop?: {
    x: number;
    y: number;
  };
  link: string;
  label: string;
}
export interface Props {
  /** produtos */
  products: Product[] | null;

  /** layout prateleira */
  cardLayout?: cardLayout;

  /** layout slider */
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    showArrows?: boolean;
  };

  /** imagem */
  image: {
    mobile: ImageWidget;
    desktop?: ImageWidget;
    altText: string;
  };

  title?: string;

  link?: {
    layout?: {
      position?: "justify-start" | "justify-center" | "justify-end";
    };
    text: string;
    href?: string;
  };

  pins?: Pin[];
}

export default function KitLookShoppableBanner({
  link,
  image,
  pins,
  layout,
  products,
  cardLayout,
  title,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "md:w-1/4",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="container py-6 lg:pb-10 mb-11 mt-5">
      <div class="card lg:card-side rounded grid grid-cols-2 sm-tablet:grid-cols-1">
        <div>
          <figure class="relative">
            <Picture class="w-full" preload={false}>
              <Source
                media="(max-width: 767px)"
                src={image?.mobile}
                width={300}
                height={460}
                fetchPriority="auto"
              />
              <Source
                media="(min-width: 768px)"
                src={image?.desktop ? image?.desktop : image?.mobile}
                width={600}
                height={600}
                fetchPriority="auto"
              />
              <Image
                class="w-full h-full object-contain"
                width={600}
                height={600}
                loading="lazy"
                src={image?.mobile}
                alt={image?.altText}
              />
            </Picture>
            {pins?.map(({ mobile, desktop, link, label }, index) => {
              if (!products[index]) {
                return;
              }
              const listImage: any = products[index]?.image;
              const productName = products[index]?.name;
              const productImage: any = listImage[0].url;
              const listOffers = products[index]?.offers;
              const { listPrice, price } = useOffer(listOffers);

              const miniProductCard = (
                <div class="drop-card invisible group-hover:visible absolute -left-[84px] sm:-left-12 top-5 sm:top-7 z-30 flex flex-row gap-1 w-max max-w-[215px] sm:max-w-56 h-max max-h-fit bg-white-0 !shadow-blg p-2 rounded">
                  <a
                    href={link}
                    class="rounded overflow-hidden border border-gray-16 p-1 max-w-[62px] h-fit"
                  >
                    <Image
                      src={productImage}
                      alt="compre look"
                      width={300}
                      height={300}
                      preload={false}
                      class="w-max h-max object-contain"
                    />
                  </a>
                  <div class="flex flex-col">
                    <div class="mb-1">
                      <span class="font-normal text-gray-0 text-xs sm:text-[13px] leading-[13px] sm:leading-[15px] truncate-2">
                        {productName}
                      </span>
                    </div>
                    <div class="flex flex-col">
                      <div class="flex flex-row gap-1">
                        {price && (
                          <span class="font-semibold text-sm sm:text-base">
                            {formatPrice(price, listOffers?.priceCurrency)}
                          </span>
                        )}

                        {listPrice !== price && (
                          <div class="flex items-center justify-center border border-gray-15 w-auto px-1">
                            <span class="text-xs text-gray-0 font-semibold">
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
                      <a href={link}>
                        <span class="text-black-0 underline text-xs">
                          Confira agora
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              );

              return (
                <>
                  <div
                    class="mobile pin group cursor-pointer absolute inline-flex sm:hidden"
                    style={{
                      left: `${mobile.x}%`,
                      top: `${mobile.y}%`,
                    }}
                  >
                    {miniProductCard}
                  </div>

                  <div
                    class="desktop pin group cursor-pointer absolute hidden sm:inline-flex"
                    style={{
                      left: `${desktop?.x ?? mobile.x}%`,
                      top: `${desktop?.y ?? mobile.y}%`,
                    }}
                  >
                    {miniProductCard}
                  </div>
                </>
              );
            })}
            <div class="card-body absolute bottom-7 h-auto w-auto">
              <div class="card-actions justify-center">
                <KitLookBuyButton product={products} />
              </div>
            </div>
          </figure>
        </div>
        <div
          id={id}
          class={clx(
            "grid",
            layout?.showArrows && "grid-cols-[48px_1fr_48px]",
            "px-0 md:px-5 full-tablet:mt-5 container full-phone:hidden",
          )}
        >
          <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                  slideMobile[layout?.numberOfSliders?.mobile ?? 1],
                )}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  layout={cardLayout}
                  platform={platform}
                  index={index}
                />
              </Slider.Item>
            ))}
          </Slider>
          {layout?.showArrows && (
            <>
              <div class="relative block z-10 col-start-1 row-start-3">
                <Slider.PrevButton class="absolute w-12 h-12 flex justify-center items-center">
                  <Icon
                    size={24}
                    id="ChevronLeft"
                    strokeWidth={3}
                    class="w-5"
                  />
                </Slider.PrevButton>
              </div>
              <div class="relative block z-10 col-start-3 row-start-3">
                <Slider.NextButton class="absolute w-12 h-12 flex justify-center items-center">
                  <Icon size={24} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
          )}
          <SliderJS rootId={id} />
        </div>
      </div>
    </div>
  );
}
