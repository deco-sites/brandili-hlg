import { BreadcrumbList, ProductDetailsPage } from "apps/commerce/types.ts";
import { useId } from "site/sdk/useId.ts";
import Breadcrumb from "site/components/ui/Breadcrumb.tsx";
import GallerySlider from "site/components/product/Gallery/ImageSlider.tsx";
import ProductInfo from "site/components/product/ProductInfo.tsx";
import type { SimilarProps } from "site/loaders/CustomSimilars.ts";

export interface Props {
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
  similars: SimilarProps | null;
}

const ProductMain = (
  { page, layout, similars }: Props,
) => {
  const breadcrumbList: BreadcrumbList | undefined = page?.breadcrumbList;
  const breadcrumb: any = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
  };

  const id = useId();

  return (
    <div
      id={id}
      class="mx-auto max-w-[1113px] full-tablet:px-8 full-phone:px-0"
    >
      <div class="breadcrumbs w-full full-phone:hidden">
        <Breadcrumb itemListElement={breadcrumb.itemListElement} />
      </div>
      <div class="image-info-wrapper w-full flex full-phone:flex-col items-start justify-between gap-6 full-phone:gap-3">
        <div class="image-wrapper sticky top-44 full-phone:relative full-phone:top-0 z-30">
          <GallerySlider page={page} />
        </div>
        <div class="product-info-wrapper max-w-[375px] sm-tablet:max-w-[320px] full-phone:max-w-full">
          <ProductInfo page={page} layout={layout} similars={similars} />
        </div>
      </div>
    </div>
  );
};

export default ProductMain;
