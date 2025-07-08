import { ProductDetailsPage } from "apps/commerce/types.ts";
import Icon from "../../../components/ui/Icon.tsx";
import Slider from "../../../components/ui/Slider.tsx";
import ProductImageZoom from "../../../islands/ProductImageZoom.tsx";
import SliderJS from "../../../islands/SliderJS.tsx";
import { useId } from "../../../sdk/useId.ts";
import ImageIcons from "site/components/product/Gallery/ImageIcons.tsx";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout?: {
    width: number;
    height: number;
  };
}
/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */

export default function GallerySlider(
  props: Props,
) {
  const id = useId();

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page,
    page: { product: { image: images = [] } },
    layout,
  } = props;

  const { width, height } = layout || { width: 300, height: 370 };

  return (
    <div id={id} class="grid full-tablet:grid-flow-row grid-flow-col relative">
      {/* Image Slider */}
      <ImageIcons page={page} />
      <div class="full-tablet:order-1 order-2 max-w-[586px]">
        <Slider class="carousel carousel-end gap-6 max-w-[586px]">
          {images.map((img, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-full max-w-[586px] relative"
            >
              <Image
                class="w-full h-full mx-auto transition-3s hover:scale-150 hover:cursor-crosshair"
                loading={"eager"}
                src={img.url!}
                alt={img.alternateName}
                width={586}
                height={785}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton
          class="no-animation absolute left-36 full-tablet:left-2 full-phone:hidden top-1/2 z-30"
          disabled
        >
          <Icon size={30} id="ArrowLeftPDP" strokeWidth={1} />
        </Slider.PrevButton>

        <Slider.NextButton
          class="no-animation absolute right-2 top-1/2 z-30 full-phone:hidden"
          disabled={images.length < 2}
        >
          <Icon size={30} id="ArrowRightPDP" strokeWidth={1} />
        </Slider.NextButton>
      </div>

      {/* Thumbnails and Dots */}
      <ul class="carousel carousel-end mr-6 gap-1 full-phone:gap-3 px-0 flex-col full-tablet:flex-row order-2 sm:order-1 full-phone:absolute full-phone:bottom-4 full-phone:left-4 full-phone:z-40">
        {images.map((img, index) => (
          <>
            <li class="carousel-item cs-min-tablet:min-w-[100px]">
              <Slider.Dot index={index}>
                <Image
                  class="group-disabled:border-primary group-disabled:border border-0 full-phone:hidden"
                  width={105}
                  height={145}
                  loading={"lazy"}
                  src={img.url!}
                  alt={img.alternateName}
                />
                <div class="w-3 h-3 rounded-full border border-transparent group-disabled:border-gray-0 flex items-center justify-center cs-min-tablet:hidden">
                  <div class="bg-gray-10 w-2 h-2 rounded-full border border-transparent group-disabled:animate-progress group-disabled:bg-gray-0 group-disabled:border-gray-0 bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]" />
                </div>
              </Slider.Dot>
            </li>
          </>
        ))}
      </ul>

      <SliderJS rootId={id} />
    </div>
  );
}
