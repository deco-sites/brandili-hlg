import { Product } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";
import { useOffer } from "site/sdk/useOffer.ts";
import AddToCartButtonVTEX from "site/islands/AddToCartButton/vtex.tsx";
import WishlistButtonVtex from "site/islands/WishlistButton/vtex.tsx";
import ProductSizeList from "site/islands/ProductSizeList.tsx";
import OutOfStock from "site/islands/OutOfStock.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useId } from "site/sdk/useId.ts";

interface Props {
  product: Product;
  breadcrumbList?: any;
}

const CustomSkuSelector = ({ product, breadcrumbList }: Props) => {
  const { isVariantOf, offers, productID } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const { availability, price, listPrice, seller = "1" } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList?.numberOfItems - 1 || 0,
  };

  const selectedSku: any = useSignal("");
  const showBuy = useSignal(true);
  const showOutOfStock = useSignal(false);
  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb || null,
    price,
    listPrice,
  });

  const sectionId = useId();

  const variantSelector: any = hasVariant?.map((item, index) => {
    const size = item?.additionalProperty?.find((propertyValue) =>
      propertyValue.name === "Tamanho"
    )?.value;
    const sku = item?.sku;
    const productId = item?.productID;
    const { availability } = useOffer(item?.offers);

    function showBuyOrUnavailable() {
      if (availability === "https://schema.org/InStock") {
        showBuy.value = true;
        showOutOfStock.value = false;
      } else {
        showOutOfStock.value = true;
        showBuy.value = false;
      }
    }

    return (
      <div
        key={index}
        id={sectionId}
        className={`size-wrapper ${
          availability === "https://schema.org/InStock"
            ? "available"
            : "unavailable"
        } order-${size}`}
      >
        <input
          type="radio"
          name="sizeSelector"
          id={`${productId}`}
          className={`size-selector-${size} hidden`}
          data-id={productId}
          onClick={() => {
            selectedSku.value = sku;
            showBuyOrUnavailable();
          }}
          value={size}
        />
        <label for={`${productId}`} class="cursor-pointer">
          {size}
        </label>
      </div>
    );
  });

  return (
    <div class="flex flex-col">
      <div class="mt-4 sm:mt-6 full-phone:px-4">
        <span class="text-xs text-gray-0">Tamanho:</span>
        <div class="flex gap-2 flex-wrap">
          {variantSelector}
        </div>
      </div>
      {/* Size Table */}
      <div class="mt-4 full-phone:px-4">
        <ProductSizeList product={product} />
      </div>
      {/* Add to Cart and Favorites button */}
      <div
        class={`mt-4 sm:mt-10 flex gap-2 full-phone:px-4 ${
          showBuy.value ? "visible" : "hidden"
        }`}
      >
        {availability === "https://schema.org/InStock"
          ? (
            <>
              <WishlistButtonVtex
                variant="full"
                productID={productID}
                productGroupID={productGroupID}
              />
              <AddToCartButtonVTEX
                eventParams={{ items: [eventItem] }}
                productID={selectedSku.value}
                seller={seller}
              />
            </>
          )
          : <OutOfStock productID={selectedSku} />}
      </div>
      <div
        class={`mt-4 sm:mt-10 flex gap-2 full-phone:px-4 ${
          showOutOfStock.value ? "visible" : "hidden"
        }`}
      >
        <OutOfStock productID={selectedSku} />
      </div>
    </div>
  );
};

export default CustomSkuSelector;
