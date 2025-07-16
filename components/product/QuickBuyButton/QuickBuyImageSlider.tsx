import type { Product } from "apps/commerce/types.ts";
import { useId } from "../../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../ui/NewSlider.tsx";
import { clx } from "../../../sdk/clx.ts";

export interface Props {
  product: Product;
  open?: boolean;
}

export default function QuickBuyGallerySlider({ product, open }: Props) {
  const id = useId();

  const { image: images } = product;

  if (!open) {
    return <></>;
  }

  return (
    open && (
      <div id={id} class="relative">
        <div class="quickbuy-slider grid grid-cols-[30px_1fr_30px] grid-rows-1 place-items-center">
          {/* Image Slider */}
          <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
            {images?.map((img, index) => (
              <Slider.Item
                index={index}
                class="carousel-item w-full h-full justify-center items-center img-wrapper"
              >
                <Image
                  class="w-full h-full mx-auto"
                  loading={"eager"}
                  src={img.url!}
                  alt={img.alternateName}
                  width={586}
                  height={785}
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        {/* Thumbnails and Dots */}
        <ul
          class={clx(
            "absolute left-6 top-5 overflow-y-scroll",
            "carousel carousel-end gap-1 px-0 flex-col z-30",
          )}
        >
          {images?.map((img, index) => (
            <li class="carousel-item cs-min-desktop:min-w-[152px]">
              <Slider.Dot index={index}>
                <Image
                  class="group-disabled:border-primary group-disabled:border border-0 full-tablet:hidden"
                  width={35}
                  height={35}
                  loading={"lazy"}
                  src={img.url!}
                  alt={img.alternateName}
                />
                <div class="w-3 h-3 rounded-full border border-transparent group-disabled:border-gray-0 flex items-center justify-center cs-min-desktop:hidden">
                  <div class="bg-gray-10 w-2 h-2 rounded-full border border-transparent group-disabled:animate-progress group-disabled:bg-gray-0 group-disabled:border-gray-0 bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]" />
                </div>
              </Slider.Dot>
            </li>
          ))}
        </ul>
        <Slider.JS rootId={id} />
      </div>
    )
  );
}
