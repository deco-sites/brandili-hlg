import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image1 = item?.image?.[0];
  const image2 = item?.image?.[1];
  const image3 = item?.image?.[2];

  return (
    <li class="group flex items-center">
      <a href={url} class="py-6">
        <span class="group-hover:underline text-base">{name}</span>
      </a>

      {children && children.length > 0 && (
        <div class="absolute left-0 top-0 mt-[72px] right-0 hidden hover:block group-hover:block bg-base-100 z-50 p-4 border-b-2 border-gray-15">
          <div class="flex items-start justify-start gap-4 w-full max-w-[1190px] m-auto">
            <ul class="flex items-start justify-center gap-9">
              {children.map((node) => (
                <li class="p-2">
                  <a
                    class="border-b border-gray-0 text-gray-0 text-lg pb-[2px] block"
                    href={node.url}
                  >
                    <span>{node.name}</span>
                  </a>
                  <ul
                    class={`flex flex-col flex-wrap ${
                      node.name !== "Faixa etária" ? "max-h-[210px]" : ""
                    } gap-3 mt-4`}
                  >
                    {node.children?.map((leaf) => (
                      <li class="max-w-[222px]">
                        <a
                          class="hover:underline text-gray-1 text-sm"
                          href={leaf.url}
                        >
                          <span
                            class={`block ${
                              leaf.name === "Ver Todas"
                                ? "text-gray-2 underline"
                                : ""
                            }`}
                          >
                            {leaf.name}
                          </span>
                          <span class="block text-xs font-light">
                            {leaf.identifier}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {image1?.url && (
              <div class="banner-menu w-auto h-auto mx-auto lg-laptop:hidden overflow-visible pl-9">
                <Image
                  class="rounded w-auto h-auto max-w-none max-h-none"
                  src={image1.url}
                  alt={image1.alternateName}
                  loading="lazy"
                  height={600}
                  width={740}
                />
              </div>
            )}
            {image2?.url && (
              <div class="banner-menu w-auto lg-laptop:hidden overflow-hidden">
                <Image
                  src={image2.url}
                  alt={image2.alternateName}
                  loading="lazy"
                  height={600}
                  width={740}
                />
              </div>
            )}
            {image3?.url && (
              <div class="banner-menu  w-auto lg-laptop:hidden overflow-hidden">
                <Image
                  src={image3.url}
                  alt={image3.alternateName}
                  loading="lazy"
                  height={600}
                  width={740}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

export default NavItem;
