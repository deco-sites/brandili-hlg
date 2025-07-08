import type { Product } from "apps/commerce/types.ts";
import { formatPrice } from "../../../sdk/format.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import AddToCartButtonKitLook from "../../../islands/KitLookBuyButton/vtexKitLook.tsx";
import { useSignal } from "@preact/signals";
import KitLookImage from "site/islands/KitLookImage.tsx";
import { useId } from "site/sdk/useId.ts";

interface Props {
  product: Product[];
}

const ProductKitLook = ({ product }: Props) => {
  const selectedFirstSku: any = useSignal([]);
  const selectedSecondSku: any = useSignal([]);
  const showBuy = useSignal(true);
  const total: any = useSignal([]);
  const prodPriceCurrency: any = useSignal("");

  return (
    <div class="kit-look-wrapper max-w-[600px] w-full overflow-y-auto overflow-x-hidden full-phone:h-[70vh]">
      {product.map((item: any, itemKey: any) => {
        const offers = item?.offers;
        const isVariantOf = item?.isVariantOf;
        const image = item?.image[0];

        const hasVariant = isVariantOf?.hasVariant ?? [];
        const { price = 0, listPrice } = useOffer(offers);

        prodPriceCurrency.value = offers?.priceCurrency;
        total.value.push(price);

        const variantSelector: any = hasVariant?.map(
          (item: any, index: any) => {
            const size = item?.additionalProperty?.find(
              (propertyValue: any) => propertyValue.name === "Tamanho",
            )?.value;
            const sku = item?.sku;
            const productId = item?.productID;
            const { availability } = useOffer(item?.offers);
            return (
              <div
                key={index}
                className={`size-wrapper order-${size} ${
                  availability === "https://schema.org/InStock"
                    ? "available"
                    : "hidden"
                }`}
              >
                <input
                  type="radio"
                  name={`sizeSelector-${itemKey}`}
                  id={`${productId}`}
                  className={`size-selector hidden`}
                  data-sku={sku}
                  value={size}
                  onClick={() =>
                    itemKey === 0
                      ? (selectedFirstSku.value = sku)
                      : (selectedSecondSku.value = sku)}
                />
                <label for={`${productId}`} class="cursor-pointer">
                  {size}
                </label>
              </div>
            );
          },
        );

        return (
          <>
            <div class="flex flex-row gap-2 px-5 full-phone:px-4 relative">
              <div class="kitLook-Image">
                <KitLookImage image={image} />
              </div>
              <div class="flex flex-col gap-2">
                <div class="kitLook-name product-name">
                  <span class="block font-normal text-xs capitalize text-gray-0 max-w-[235px]">
                    {isVariantOf?.name}
                  </span>
                </div>
                <div class="kitLook-price">
                  <div class="flex flex-col">
                    {(listPrice ?? 0) > price && (
                      <span class="line-through text-gray-0 text-xs font-normal mr-1">
                        {formatPrice(listPrice, prodPriceCurrency)}
                      </span>
                    )}
                    <div class="flex gap-1">
                      <span class="font-semibold text-base text-gray-0">
                        {formatPrice(price, prodPriceCurrency)}
                      </span>
                      {(listPrice ?? 0) > price && (
                        <div class="flex items-center justify-center">
                          <span class="bg-white-0 text-red-1 rounded-sm py-[2px] px-1 border border-solid border-red-1 text-[10px] font-normal">
                            {listPrice && price
                              ? `-${
                                Math.round(
                                  ((listPrice - price) / listPrice) * 100,
                                )
                              }% OFF`
                              : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-5 full-phone:px-4 mb-5 pb-5 border-b border-gray-16">
              <div class="flex gap-2 flex-wrap">
                <div class="flex flex-col gap-1">
                  <span class="text-xs text-gray-0">Tamanho</span>
                  <form
                    class="flex flex-wrap gap-2 max-w-[430px]"
                    id={`product-${itemKey}`}
                  >
                    {variantSelector}
                  </form>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <div class="text-center mt-[7vh] full-phone:mt-6">
        <h3 class="text-gray-0 text-base font-normal flex flex-col gap-3">
          Compre o look completo por:{" "}
          <span class="text-gray-0 text-4xl font-semibold">
            {formatPrice(total.value[0] + total.value[1], prodPriceCurrency)}
          </span>
        </h3>
      </div>
      <div
        class={`absolute bottom-0 bg-white-0 w-full mt-4 px-5 full-phone:px-4 pb-4 ${
          showBuy.value ? "visible" : "hidden"
        }`}
      >
        <div class="pt-3 mb-3">
          <AddToCartButtonKitLook
            firstProductID={selectedFirstSku.value}
            secondProductID={selectedSecondSku.value}
            seller="1"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductKitLook;
