import type { Product } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import AddToCartButtonVTEX from "../../islands/AddToCartButton/vtex.tsx";
import { useSignal } from "@preact/signals";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import QuickBuyGallerySlider from "site/islands/QuickBuyImageSlider.tsx";
import { useId } from "site/sdk/useId.ts";
import QuickSizeList from "site/islands/QuickBuySizeList.tsx";
import OutOfStock from "site/islands/OutOfStock.tsx";
import WishlistButtonVtex from "site/islands/WishlistButton/vtex.tsx";

interface Props {
  product: Product;
  open?: boolean;
}

const ProductQuickBuy = ({ product, open }: Props) => {
  const { offers, isVariantOf, productID, url } = product;

  const productGroupID = isVariantOf?.productGroupID ?? "";
  const showBuy = useSignal(true);
  const showOutOfStock = useSignal(false);
  const selectedSku: any = useSignal("");
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const { price = 0, listPrice, seller = "1", installments, availability } =
    useOffer(offers);

  const productUrl: any = url?.split("?") ?? [];

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
        className={`size-wrapper order-${size} ${
          availability === "https://schema.org/InStock"
            ? "available"
            : "unavailable"
        }`}
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

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  return (
    <div class="quick-buy-wrapper max-w-[600px] w-full overflow-y-auto overflow-x-hidden relative">
      <div class="image-slider">
        <QuickBuyGallerySlider product={product} open={open} />
      </div>
      <div class="quick-buy-body pt-2 pb-4 px-5 full-phone:px-4">
        <div class="product-name mt-2">
          <span class="font-normal text-xl capitalize font-poppins text-gray-0">
            {isVariantOf?.name}
          </span>
        </div>
        <div class="mt-4">
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
              Ou em {installments}
            </span>
          )}
        </div>
        <div class="flex mt-4 sm:mt-6 gap-2 flex-wrap">{variantSelector}</div>
        <div class={`mt-4 ${showOutOfStock.value ? "pb-0" : "pb-32"}`}>
          <QuickSizeList product={product} />
        </div>
        <div
          class={`mt-4 sm:mt-10 flex flex-col gap-2 ${
            showOutOfStock.value ? "visible" : "hidden"
          }`}
        >
          <OutOfStock productID={selectedSku.value} />
          <a
            href={productUrl[0]}
            class="text-center w-full text-gray-0 text-sm block pb-3"
          >
            Veja a descrição completa
          </a>
        </div>
        <div
          class={`buy-button-wrapper fixed bg-white-0 w-full left-0 right-0 bottom-0 sm:mt-10 px-5 full-phone:px-4 pb-4 z-30 ${
            showBuy.value ? "visible" : "hidden"
          }`}
        >
          {open && (
            <div class="flex gap-2 pt-3 mb-3">
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
            </div>
          )}
          <a
            href={productUrl[0]}
            class="text-center w-full text-blue-0 text-sm block pb-3"
          >
            Veja a descrição completa
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickBuy;
