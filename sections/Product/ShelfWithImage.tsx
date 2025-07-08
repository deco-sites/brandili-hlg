import { Picture, Source } from "apps/website/components/Picture.tsx";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Header from "../../components/ui/SectionHeader.tsx";
import { type Section } from "@deco/deco/blocks";
export interface Props {
    /** @title Cor de fundo */
    backgroundColor?: "bg-yellow-1" | "bg-pink-0" | "bg-orange-0";
    title?: string;
    titleLayout?: {
        headerAlignment?: "center" | "left";
    };
    section: Section;
    image: {
        src: ImageWidget;
        alt?: string;
        href?: string;
        hiddenMobile?: boolean;
    };
    label?: string;
    description?: string;
    /** @title Botão CTA */
    cta?: string;
    /** @title Posição do banner */
    position?: "normal" | "reverse";
}
export default function ShelfWithImage({ backgroundColor, title, titleLayout, section, image, label, description, cta, position, }: Props, { lcp }: {
    lcp?: boolean;
}) {
    return (<div class={`${backgroundColor ?? "bg-tranparent"} sm:pt-6 mb-9`}>
      <div class="container flex flex-col gap-5">
        <Header title={title || ""} alignment={titleLayout?.headerAlignment || "left"}/>
        <div class={`flex flex-row sm-tablet:flex-col items-center relative ${position === "reverse" ? " flex-row-reverse" : ""}`}>
          <div class={`image-content w-full sm-tablet:w-full full-tablet:w-1/2 ${image?.hiddenMobile ? "sm-tablet:hidden" : ""}`}>
            <a href={image?.href}>
              <Source src={image.src} class="w-full object-contain" width={395} height={214} alt={image?.alt} media="(max-width: 767px)"/>
              <Source src={image.src} class="w-full object-contain" width={369} height={300} alt={image?.alt} media="(min-width: 768px)"/>
              <img src={image.src} class="w-full object-contain max-w-[706px] sm-tablet:mx-auto" width={703} height={460} alt={image?.alt}/>
            </a>
            <div class="flex flex-col gap-2 my-6 ">
              <h3 class="text-xl text-gray-0 font-bold">{label}</h3>
              {description && (<span class="text-sm text-gray-0 font-normal">
                  {description}
                </span>)}
              {cta && (<a href={image.href} class="py-1 px-2 border border-gray-0 rounded-md text-sm text-gray-0 font-medium max-w-36">
                  {cta}
                </a>)}
            </div>
          </div>
          <div class="mx-auto sm-tablet:w-full full-tablet:w-1/2 max-w-[710px] flex items-center overflow-x-hidden">
            <section.Component {...section.props}/>
          </div>
        </div>
      </div>
    </div>);
}
