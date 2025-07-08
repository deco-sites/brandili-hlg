import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { openModal } from "../../islands/ClickZoomImage.tsx";
export interface Props {
  images: ImageObject[];
  width: number;
  height: number;
}

function ProductImageZoom({ images }: Props) {
  const id = useId();

  return (
    <>
      <div id={id} class="zoom-img-pdp">
        <Modal
          loading="lazy"
          open={openModal.value}
          onClose={() => openModal.value = false}
        >
          <div class="max-w-[1000px] grid grid-cols-[48px_1fr_48px] grid-rows-1 place-items-center">
            <Slider class="carousel col-span-full col-start-1 row-start-1 row-span-full h-full w-full">
              {images.map((image, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full h-full justify-center items-center"
                >
                  <Image
                    class="w-full h-full mx-auto"
                    loading={"eager"}
                    src={image.url!}
                    alt={image.alternateName}
                    width={586}
                    height={785}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <Slider.PrevButton class="no-animation fixed left-2 top-1/2 z-30">
              <Icon size={30} id="ArrowLeftPDP" strokeWidth={1} />
            </Slider.PrevButton>

            <Slider.NextButton class="no-animation fixed right-2 top-1/2 z-30">
              <Icon size={30} id="ArrowRightPDP" strokeWidth={1} />
            </Slider.NextButton>

            <SliderJS rootId={id} />
          </div>
        </Modal>
      </div>
    </>
  );
}

export default ProductImageZoom;
