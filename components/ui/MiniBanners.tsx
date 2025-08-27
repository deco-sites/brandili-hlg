import type { ImageWidget as LiveImage } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Image {
  /** @description optimized image */
  image: LiveImage;
  /** @description Image's width */
  imageWidth: number;
  /** @description Image's height */
  imageHeight: number;
  /** @description Image's alt text */
  alt: string;
  /** @description Image/Button link */
  href?: string;
}

export interface Slider {
  mobile?: {
    /** @description slider mobile has arrows */
    arrow?: boolean;
    /** @description slider mobile has dots */
    dots?: boolean;
  };
  desktop?: {
    /** @description slider mobile has arrows */
    arrow?: boolean;
    /** @description slider mobile has dots */
    dots?: boolean;
  };
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
    seeMore?: {
      label?: string;
      href?: string;
    };
  };
  images?: Image[];
  slider?: Slider;
}

export default function MiniBanners({ images, slider, header }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col relative container mx-auto pb-6 full-phone:pb-3 lg:pb-10 mb-9 mt-5 overflow-hidden"
    >
      <div class="flex justify-between items-start">
        <div class="flex flex-col w-full sm:mb-3">
          <h2 class="text-2xl full-phone:text-xl text-gray-0 font-semibold mb-1">
            {header?.title}
          </h2>
          {header?.description && (
            <span class="mt-3 text-secondary">{header?.description || ""}</span>
          )}
        </div>
        {header?.seeMore?.label && (
          <a
            href={header?.seeMore.href}
            class="bg-transparent border border-gray-1 rounded text-sm full-phone:text-xs text-gray-1 h-7 w-full max-w-20 px-1 flex items-center justify-center"
          >
            {header?.seeMore?.label}
          </a>
        )}
      </div>

      <Slider class="carousel carousel-end w-full justify-between gap-2 max-sm:px-4 max-lg:px-6 lg:ml-0">
        {images &&
          images.map((image, index) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-4 carousel-item transition-3s hover:opacity-50"
            >
              <a href={image.href}>
                <figure>
                  <Image
                    class="max-w-370 sm-desktop:max-w-[230px] sm:max-w-full rounded overflow-hidden"
                    src={image.image}
                    alt={image.alt}
                    width={image.imageWidth}
                    height={image.imageHeight}
                    loading="lazy"
                  />
                </figure>
              </a>
            </Slider.Item>
          ))}
      </Slider>

      {slider?.mobile?.arrow && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between lg:hidden">
          <div class="flex items-center justify-center z-10">
            <Slider.PrevButton class="btn btn-circle glass">
              <Icon
                class="text-base-100"
                size={24}
                id="ChevronLeft"
                strokeWidth={3}
              />
            </Slider.PrevButton>
          </div>
          <div class="flex items-center justify-center z-10">
            <Slider.NextButton class="btn btn-circle glass">
              <Icon
                class="text-base-100"
                size={24}
                id="ChevronRight"
                strokeWidth={3}
              />
            </Slider.NextButton>
          </div>
        </div>
      )}

      {slider?.desktop?.arrow && (
        <div className="absolute top-1/2 -translate-y-1/2 w-full justify-between hidden lg:flex">
          <div class="flex items-center justify-center z-10">
            <Slider.PrevButton class="btn btn-circle glass">
              <Icon
                class="text-base-100"
                size={24}
                id="ChevronLeft"
                strokeWidth={3}
              />
            </Slider.PrevButton>
          </div>
          <div class="flex items-center justify-center z-10">
            <Slider.NextButton class="btn btn-circle glass">
              <Icon
                class="text-base-100"
                size={24}
                id="ChevronRight"
                strokeWidth={3}
              />
            </Slider.NextButton>
          </div>
        </div>
      )}

      <div
        className={`relative flex justify-center -bottom-3 z-10 ${
          slider?.mobile?.dots ? "block" : "hidden"
        } ${slider?.desktop?.dots ? "lg:block" : "lg:hidden"}`}
      >
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
          {images &&
            images.map((_, index) => (
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

      <SliderJS rootId={id} infinite />
    </div>
  );
}
