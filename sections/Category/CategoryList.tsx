import Slider from "../../components/ui/Slider.tsx";
import SliderJS from "../../islands/SliderJS.tsx";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";

export interface Category {
  tag?: string;
  label?: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  /**
   * @title Texto SEO
   * @default
   */
  textSeo?: RichText;

  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText({
  tag,
  label,
  description,
  alignment,
}: {
  tag?: string;
  label?: string;
  description?: string;
  alignment?: "center" | "left";
}) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && <h3 class="text-lg text-base-content">{label}</h3>}
      {description && <div class="text-sm text-neutral">{description}</div>}
    </div>
  );
}

const DEFAULT_LIST = [
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
  {
    tag: "10% off",
    label: "Feminino",
    description: "Moda feminina direto de Milão",
    href: "/feminino",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2753/b2278d2d-2270-482b-98d4-f09d5f05ba97",
    buttonText: "Ver produtos",
  },
];

function CategoryList(props: Props) {
  const id = useId();
  const {
    textSeo = "",
    list = DEFAULT_LIST,
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container my-3 flex flex-col text-base-content"
    >
      {textSeo && (
        <div class="lg:mb-4">
          <input class="peer hidden" id="control-cb" type="checkbox" checked />
          <div
            class="category-seo w-full text-sm text-gray-1 font-light content-institutional mb-2 max-w-none peer-checked:line-clamp-3 full-tablet:peer-checked:line-clamp-4 transition-3s"
            dangerouslySetInnerHTML={{ __html: textSeo }}
          />
          <label
            class="after:pl-1 after:content-['menos'] peer-checked:after:content-['mais'] text-[10px] text-gray-0 text-center uppercase underline cursor-pointer font-medium py-1 mt-1 mb-5"
            for="control-cb"
          >
            Ver
          </label>
        </div>
      )}

      {list[0]?.image && (
        <>
          <Slider class="categoryList flex justify-around items-center full-tablet:justify-start overflow-x-auto gap-8 sm-desktop:gap-5 lg-laptop:gap-2">
            {list.map(
              ({ tag, label, description, href, image, buttonText }, index) => (
                <Slider.Item
                  index={index}
                  class="flex flex-col gap-4 carousel-item"
                >
                  <a
                    href={href}
                    class="flex flex-col gap-4 lg:w-[250px] lg-laptop:w-[220px] w-40 lg:h-auto"
                  >
                    {layout.categoryCard?.textPosition === "top" && (
                      <CardText
                        tag={tag}
                        label={label}
                        description={description}
                        alignment={layout?.categoryCard?.textAlignment}
                      />
                    )}
                    {image && (
                      <figure>
                        <Image
                          class="card w-full rounded-[3px]"
                          src={image}
                          alt={description || label || tag}
                          width={160}
                          height={195}
                          loading="lazy"
                        />
                      </figure>
                    )}
                    {layout.categoryCard?.textPosition === "bottom" && (
                      <CardText
                        tag={tag}
                        label={label}
                        description={description}
                        alignment={layout?.categoryCard?.textAlignment}
                      />
                    )}
                  </a>
                  {buttonText && (
                    <a href={href} class="btn">
                      {buttonText}
                    </a>
                  )}
                </Slider.Item>
              ),
            )}
          </Slider>
          <SliderJS rootId={id} />
        </>
      )}
    </div>
  );
}

export default CategoryList;
