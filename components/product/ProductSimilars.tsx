import type { SimilarProps } from "site/loaders/CustomSimilars.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "site/sdk/clx.ts";
import { ringClass } from "site/components/product/ProductVariantSelector.tsx";
import { useSection } from "@deco/deco/hooks";
export interface Props {
    similars: SimilarProps | null;
}
const ProductSimilars = ({ similars }: Props) => {
    const products = similars?.similars;
    const key = "productId";
    const unique = products
        ? [...new Map(products.map((item: any) => [item[key], item])).values()]
        : null;
    return products.length > 0
        ? (<div hx-target="closest section" hx-swap="outerHTML" hx-sync="this:replace">
        <div class="similar-title">
          <span class="font-poppins text-xs text-gray-0">
            Cor:
          </span>
        </div>
        <div class="similar-colors gap-2 flex flex-wrap">
          {unique?.map((item: any, index: number) => {
                return (<label key={index} class="cursor-pointer" hx-get={useSection({ href: `/${item?.linkText}/p` })}>
                <Image src={item?.items[0]?.images[0]?.imageUrl} class="w-12 h-auto rounded-sm border border-solid border-gray-11 block [.htmx-request_&]:hidden" width={48} height={65}/>
                <div class="w-[52px] h-10 justify-center items-center hidden [.htmx-request_&]:flex">
                  <span class={clx(ringClass, "loading loading-xs loading-spinner")}/>
                </div>
              </label>);
            })}
        </div>
      </div>)
        : null;
};
export default ProductSimilars;
