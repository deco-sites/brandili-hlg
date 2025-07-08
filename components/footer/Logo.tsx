import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  logoFooter?: boolean | null;
  logo?: {
    image: ImageWidget;
    description?: string;
    width?: number;
    height?: number;
  };
}

export default function Logo({ logo, logoFooter }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-col gap-3">
          <div
            class={`${
              logoFooter
                ? "max-h-[93px] full-desktop:max-w-fit full-desktop:max-h-fit full-desktop:mr-6"
                : "max-w-28 max-h-16"
            }`}
          >
            <Image
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={logo?.width}
              height={logo?.height}
            />
          </div>
          <div class="">{logo?.description}</div>
        </div>
      )}
    </>
  );
}
