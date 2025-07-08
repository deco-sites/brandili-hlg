import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: [];
}

export default function KitLookImage({ image }: Props) {
  return (
    <div class="relative">
      <ul class="thumbnails top-1/3 left-4">
        <li class="carousel-item cs-min-tablet:min-w-[100px] mb-5 cursor-pointer">
          <div class="thumb p-1 border border-gray-16 rounded-[3px] overflow-hidden">
            <Image
              width={70}
              height={70}
              loading={"lazy"}
              src={image?.url!}
              alt={image?.alternateName}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
