import { SendEventOnView } from "../../components/Analytics.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import ShippingSimulation from "../../islands/ShippingSimulation.tsx";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import type { SimilarProps } from "site/loaders/CustomSimilars.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSimilars from "site/components/product/ProductSimilars.tsx";
import ProductSpecification from "site/components/product/ProductSpecification.tsx";
import ProductDescription from "site/components/product/ProductDescription.tsx";
import ProductMobileTabs from "site/islands/ProductMobileTabs.tsx";
import CustomSkuSelector from "site/islands/CustomSkuSelector.tsx";

interface Props {
  page: ProductDetailsPage | null;
  layout?: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
  similars: SimilarProps | null;
}

function ProductInfo({ page, layout, similars }: Props) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
  } = product;

  const description = product.description || isVariantOf?.description;

  const productidentifier = isVariantOf?.model

  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });
  const productAditionalProp = product?.additionalProperty;
  const sellerName = offers?.offers[0]?.sellerName;

  return (
    <div class="flex flex-col" id={id}>
      {/* Code and name */}
      <div class="mt-4 full-phone:mt-0 full-phone:px-4">
        <div class="breadcrumbs pdp-breadcrumbs w-full cs-min-tablet:hidden">
          <Breadcrumb itemListElement={breadcrumb.itemListElement} />
        </div>
        <div class="tags-list flex flex-wrap gap-1 mb-4 full-phone:mt-1">
          {productAditionalProp?.map((item, index) => {
            return item?.description === "highlight" && (
              <span
                key={index}
                class="block border border-solid border-gray-10 py-1 px-2 font-poppins text-xs text-gray-0"
              >
                {item?.value}
              </span>
            );
          })}
        </div>
        <div>
          {gtin && (
            <span class="text-sm text-gray-1 font-poppins">Ref.: {productidentifier}</span>
          )}
        </div>
        <h1>
          <span class="font-normal text-xl font-poppins text-gray-0">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>
      </div>
      {/* Prices */}
      <div class="mt-4 full-phone:px-4">
        <div class="flex flex-row items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-gray-0 text-base font-normal font-poppins mr-2">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-semibold font-poppins text-xl text-gray-0 mr-2">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {(listPrice ?? 0) > price && (
            <div class="flex items-center justify-center">
              <span class="bg-red-0/5 text-red-0 font-poppins rounded-sm py-[2px] px-1 border border-solid border-red-0 text-sm font-normal">
                {listPrice && price
                  ? `-${
                    Math.round(((listPrice - price) / listPrice) * 100)
                  }% OFF`
                  : ""}
              </span>
            </div>
          )}
        </div>
        {availability === "https://schema.org/InStock" && (
          <span class="text-sm font-poppins text-gray-12 font-light">
            Ou em {installments?.replace ("." , ",")}
          </span>
        )}
      </div>
      {/* Seller Name */}
      <div class="sold-and-shipped full-phone:px-4">
        <span class="font-poppins text-xs font-normal text-gray-1">
          Vendido e entregue por: <span class="font-medium">{sellerName}</span>
        </span>
      </div>
      {/* Similar Products Selector */}
      <div class="mt-4 full-phone:px-4">
        <ProductSimilars similars={similars} />
      </div>
      {/* Sku Selector */}
      <CustomSkuSelector product={product} breadcrumbList={breadcrumbList} />
      {/* Shipping Simulation */}
      <div class="mt-8 full-phone:mt-10 full-phone:py-10 full-phone:border-y-[9px] full-phone:border-solid full-phone:border-gray-13/50">
        {platform === "vtex" && (
          <ShippingSimulation
            items={[
              {
                id: Number(product.sku),
                quantity: 1,
                seller: seller,
              },
            ]}
          />
        )}
      </div>
      {/* Description and specifications Desktop/Tablet */}
      <div class="mt-4 sm:mt-6 full-phone:hidden">
        <ProductDescription description={description} />
      </div>
      <div class="w-full full-phone:hidden">
        <ProductSpecification product={product} />
      </div>
      {/* Description and specifications Phone */}
      <div class="w-full cs-min-tablet:hidden py-10 border-b-[9px] border-solid border-gray-13/50">
        <ProductMobileTabs product={product} description={description} />
      </div>
      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
