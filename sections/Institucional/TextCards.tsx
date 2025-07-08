import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";

export interface Card {
  flag: string;
  /** @description Image/Button link */
  href: string;
  title: string;
  description: string;
  buttonLabel: string;
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
  };
  cards?: Card[];
  slider?: Slider;
}

export default function TextCards({ cards, slider, header }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col relative max-w-[800px] mx-auto pt-7 pb-9 mb-0 overflow-hidden cs-min-full-phone:hidden"
    >
      <div class="flex flex-col w-full items-center">
        {header?.title && <h3 class="text-3xl text-black">{header?.title}</h3>}
        {header?.description && (
          <span class="mt-3 text-black mb-5">{header?.description || ""}</span>
        )}
      </div>

      <Slider class="carousel carousel-center w-full gap-5 lg:gap-10 sm:ml-[8%] lg:ml-0">
        {cards &&
          cards.map((card, index) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-4 carousel-item first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-16 lg:last:mr-0"
            >
              <div className="max-w-[240px] px-5 py-7 bg-white-1 w-full rounded-[10px] flex flex-col gap-3">
                <div className="mb-2 w-fit">
                  <span className=" text-base text-black py-0.5 px-2.5 border border-black rounded-[50px]">
                    {card.flag}
                  </span>
                </div>
                <div className="flex flex-col w-full max-w-[200px]">
                  <span className="text-black text-3xl font-semibold mb-4 h-[72px]">
                    {card.title}
                  </span>
                  <span className="text-black text-lg">{card.description}</span>
                </div>

                <a
                  href={card.href}
                  className="bg-white rounded-[50px] flex items-center justify-center max-w-[157px] py-1.5 gap-3 text-lg text-black"
                >
                  {card.buttonLabel}
                  <Icon
                    id="arrowTextCard"
                    width={20}
                    height={14}
                    strokeWidth={"2"}
                    class="text-secondary"
                  />
                </a>
              </div>
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
        <div className="absolute top-1/2 -translate-y-1/2 w-full justify-between hidden sm:flex">
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

      {slider?.mobile?.dots && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
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
          <ul class="carousel justify-center items-end gap-4 z-10 sm:hidden">
            {cards &&
              cards.map((_, index) => (
                <li class="carousel-item px-[5px]">
                  <Slider.Dot index={index}>
                    <div class="pt-5 pb-3">
                      <div class="w-[9px] h-2.5 rounded-full border border-black group-disabled:bg-black group-disabled:w-[9px] bg-white" />
                    </div>
                  </Slider.Dot>
                </li>
              ))}
          </ul>
        </div>
      )}

      {slider?.desktop?.dots && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden lg:block">
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
            {cards &&
              cards.map((_, index) => (
                <li class="carousel-item px-[5px]">
                  <Slider.Dot index={index}>
                    <div class="pt-5 pb-3">
                      <div class="w-2.5 sm:w-2.5 h-2.5 rounded-full border border-black group-disabled:bg-black group-disabled:w-7 bg-white" />
                    </div>
                  </Slider.Dot>
                </li>
              ))}
          </ul>
        </div>
      )}

      <SliderJS rootId={id} infinite />
    </div>
  );
}
