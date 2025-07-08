import { SendEventOnView } from "../../components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "../../components/product/ProductCard.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
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

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  const slideDesktop = {
    1: "lg:w-full",
    2: "lg:w-1/2",
    3: "lg:w-1/3",
    4: "lg:w-1/4",
    5: "lg:w-1/5",
  };

  const slideMobile = {
    1: "w-full",
    2: "w-1/2",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };

  return products && (
    <div class="w-full container pb-8 flex flex-col gap-[16px] lg:pb-10 mb-11 mt-5">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class={clx(
          "grid",
          layout?.showArrows &&
            "grid-cols-[4px_1fr_4px] full-phone:grid-cols-[1fr]",
          "px-0 relative",
        )}
      >
        <Slider class="carousel carousel-center sm:carousel-end  sm:gap-1 row-start-2 row-end-5">
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
            <div class="block z-10 col-start-1 row-start-3 full-phone:hidden">
              <Slider.PrevButton class="slider-arrow prev-button absolute left-12 flex justify-center items-center bg-gray-17 h-7 w-7 rounded-full top-1/3">
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={2.75}
                  class="w-5"
                />
              </Slider.PrevButton>
            </div>
            <div class="block z-10 col-start-3 row-start-3 full-phone:hidden">
              <Slider.NextButton class="slider-arrow next-button absolute right-11 flex justify-center items-center bg-gray-17 h-7 w-7 rounded-full top-1/3">
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
  );
}

export default ProductShelf;
