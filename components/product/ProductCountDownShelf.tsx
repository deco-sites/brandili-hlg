import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCountDownCard, {
  Layout as cardLayout,
} from "../../components/product/ProductCountDownCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  products?: Product[] | null;
  title?: string;
  description?: string;
  /**
   * @title Data de Expiração
   * @format datetime
   */
  expiresAt?: string;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
    dots?: boolean;
  };
  cardLayout?: cardLayout;
}

function ProductCountDownShelf({
  products,
  title,
  layout,
  cardLayout,
  expiresAt,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  const slideDesktop = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return (
    products && (
      <div class="w-full pb-8 flex flex-col full-phone:py-3 mb-9 mt-5 full-phone:mt-0">
        <div class="relative">
          <div
            id={id}
            class={clx(
              "grid",
              layout?.showArrows && "grid-cols-[1fr]",
              "px-0 ",
            )}
          >
            <Slider class="carousel carousel-center sm:carousel-end  sm:gap-1 row-start-2 row-end-5">
              {products?.map((product, index) => (
                <Slider.Item
                  index={index}
                  class={clx(
                    "carousel-item justify-center",
                    slideDesktop[layout?.numberOfSliders?.desktop ?? 3],
                    slideMobile[layout?.numberOfSliders?.mobile ?? 1],
                  )}
                >
                  <ProductCountDownCard
                    product={product}
                    itemListName={title}
                    layout={cardLayout}
                    platform={platform}
                    index={index}
                    expiresAt={expiresAt}
                  />
                </Slider.Item>
              ))}
            </Slider>

            {layout?.showArrows && (
              <>
                <div class="relative block z-20 col-start-1 row-start-3 full-phone:hidden">
                  <Slider.PrevButton class="absolute left-9 flex justify-center items-center bg-gray-17 h-7 w-7 rounded-full">
                    <Icon
                      size={24}
                      id="ChevronLeft"
                      strokeWidth={2.75}
                      class="w-5"
                    />
                  </Slider.PrevButton>
                </div>
                <div class="relative block z-20 col-start-3 row-start-3 full-phone:hidden">
                  <Slider.NextButton class="absolute right-8 flex justify-center items-center bg-gray-17 h-7 w-7 rounded-full">
                    <Icon size={24} id="ChevronRight" strokeWidth={3} />
                  </Slider.NextButton>
                </div>
              </>
            )}

            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 z-10 block">
              <style
                dangerouslySetInnerHTML={{
                  __html: `
              @property --dot-progress {
                syntax: '<percentage>';
                inherits: false;
                initial-value: 0%;
              }
              `,
                }}
              />
              <ul class="carousel justify-center items-end gap-4 z-10">
                {products.map((_, index) => (
                  <li class="carousel-item">
                    <Slider.Dot index={index}>
                      <div class="w-3 h-3 rounded-full border border-transparent group-disabled:border-gray-0 flex items-center justify-center">
                        <div class="bg-gray-10 w-2 h-2 rounded-full border border-transparent group-disabled:animate-progress group-disabled:bg-gray-0 group-disabled:border-gray-0 bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]" />
                      </div>
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            </div>

            <SliderJS rootId={id} />
            <SendEventOnView
              id={id}
              event={{
                name: "view_item_list",
                params: {
                  item_list_name: title,
                  items: products.map((product, index) =>
                    mapProductToAnalyticsItem({
                      index,
                      product,
                      ...useOffer(product.offers),
                    })
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default ProductCountDownShelf;
