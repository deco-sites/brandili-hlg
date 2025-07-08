import { formatPrice } from "site/sdk/format.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import { useSignal } from "@preact/signals";
import Icon from "site/components/ui/Icon.tsx";
import AddToCartButton from "site/islands/AddToCartBuyTogether/vtex.tsx";
import ImageIconsSuggestions from "../Gallery/ImageIconsSuggestion.tsx";
import ImageIconsBTG from "site/components/product/Gallery/ImageIconsBTG.tsx";

interface Props {
  suggestions: any;
  actualProduct: any;
}

const CustomBuyTogetherContent = ({ suggestions, actualProduct }: Props) => {
  // ACTUAL PRODUCT SIZE SELECTOR

  const selectedSkuActual: any = useSignal("");
  const variantSelector = actualProduct?.hasVariant?.map((
    item: any,
    index: number,
  ) => {
    const size = item?.additionalProperty?.find((propertyValue: any) =>
      propertyValue.name === "Tamanho"
    )?.value;
    const sku = item?.sku;
    const { availability } = useOffer(item?.offers);

    return availability === "https://schema.org/InStock" && (
      <div
        key={index}
        id="actualProductSelector"
        className={`size-wrapper-btg order-${size}`}
      >
        <input
          type="radio"
          name="sizeSelectorActual"
          id={`actual-${sku}`}
          className={`size-selector-btg-${size} hidden`}
          data-id={sku}
          onClick={() => {
            selectedSkuActual.value = sku;
          }}
          value={size}
        />
        <label for={`actual-${sku}`} class="cursor-pointer">
          {size}
        </label>
      </div>
    );
  });
  const actualCompostion = actualProduct?.composition;

  // SUGGESTION PRODUCT SIZE SELECTOR

  const selectedSkuSuggestion: any = useSignal("");
  const suggestionSizeSelector = suggestions?.hasVariant?.map((
    item: any,
    index: number,
  ) => {
    const size = item?.additionalProperty?.find((propertyValue: any) =>
      propertyValue.name === "Tamanho"
    )?.value;
    const sku = item?.sku;
    const { availability } = useOffer(item?.offers);

    return availability === "https://schema.org/InStock" && (
      <div
        key={index}
        id="suggestionSelector"
        className={`size-wrapper-btg order-${size}`}
      >
        <input
          type="radio"
          name="sizeSelectorSuggestion"
          id={`suggestion-${sku}`}
          className={`size-selector-btg-${size} hidden`}
          data-id={sku}
          onClick={() => {
            selectedSkuSuggestion.value = sku;
          }}
          value={size}
        />
        <label for={`suggestion-${sku}`} class="cursor-pointer">
          {size}
        </label>
      </div>
    );
  });
  const compostion = suggestions?.composition;

  return actualProduct?.isAvailable && suggestions?.isAvailable && (
    <div class="buy-together my-14 full-tablet:px-4 full-tablet:flex full-tablet:flex-col">
      <div class="title w-full mb-2">
        <span class="font-poppins font-semibold text-xl text-black-2">
          Compre o look
        </span>
      </div>
      <div class="buy-together-wrapper flex items-start relative full-phone:gap-2">
        {/* ACTUAL PRODUCT RENDER */}
        <div class="actual-product max-w-[320px] full-tablet:max-w-[50%] full-phone:max-w-[48%] w-full flex flex-col itens-start">
          <div class="product-images relative">
            <ImageIconsBTG composition={actualCompostion?.toLowerCase()} />
            <img
              src={actualProduct?.images[0]?.url}
              class="image-first relative z-10"
            />
            {actualProduct?.imageSecond && (
              <img
                src={actualProduct?.images[1]?.url}
                class="image-second opacity-0 hover:opacity-100 absolute top-0 left-0 z-20 transition-3s"
              />
            )}
          </div>
          <div class="actual-product-data">
            <div class="size-selector bg-[#f7f7f7]">
              <div class="flex overflow-x-auto">
                {variantSelector}
              </div>
            </div>
            <div class="product-prices mb-2">
              <div class="flex-auto flex flex-col p-2 full-phone:p-1 gap-3 lg:gap-2 bg-white-0">
                <div class="flex flex-col gap-0">
                  <h2
                    class="truncate text-sm text-gray-1 capitalize font-normal mob-prod-name"
                    dangerouslySetInnerHTML={{
                      __html: actualProduct?.productName ?? "",
                    }}
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <div class="flex flex-col gap-0 min-h-12 justify-center">
                    {actualProduct?.listPrice !== actualProduct?.price && (
                      <div
                        class={`line-through text-gray-0 text-sm font-normal`}
                      >
                        {formatPrice(
                          actualProduct?.listPrice,
                          actualProduct?.currency,
                        )}
                      </div>
                    )}
                    <div class="flex flex-row gap-1 full-phone:justify-between items-center">
                      <div class="text-lg text-gray-0 font-semibold">
                        {formatPrice(
                          actualProduct?.price,
                          actualProduct?.currency,
                        )}
                      </div>
                      {actualProduct?.listPrice !== actualProduct?.price && (
                        <div class="flex items-center justify-center border border-red-1 w-[56px] h-[22px]">
                          <span class="text-xs text-red-1 font-medium">
                            {actualProduct?.listPrice && actualProduct?.price
                              ? `${
                                Math.round(
                                  ((actualProduct?.listPrice -
                                    actualProduct?.price) /
                                    actualProduct?.listPrice) * 100,
                                )
                              }% `
                              : ""}
                            OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="relative -mx-3 full-phone:absolute full-phone:bottom-0 full-phone:top-1/4 full-phone:left-[48%] z-30 -bottom-48 full-ph">
          <Icon id="PlusBuyTogether" size={42} stroke-width={1} />
        </div>
        {/* SUGGESTION PRODUCT RENDER */}
        <div class="suggestion-product max-w-[320px] full-tablet:max-w-[50%] full-phone:max-w-[48%] w-full flex flex-col itens-start">
          <div class="product-images relative">
            <ImageIconsSuggestions composition={compostion?.toLowerCase()} />
            <a href={suggestions?.link}>
              <img
                src={suggestions?.images[0]?.url}
                class="image-first relative z-10"
              />
              {suggestions?.imageSecond && (
                <img
                  src={suggestions?.images[1]?.url}
                  class="image-second opacity-0 hover:opacity-100 absolute top-0 left-0 z-20 transition-3s"
                />
              )}
            </a>
          </div>
          <div class="suggestion-product-data">
            <div class="size-selector bg-[#f7f7f7]">
              <div class="flex overflow-x-auto">
                {suggestionSizeSelector}
              </div>
            </div>
            <a href={suggestions?.link}>
              <div class="product-prices mb-2">
                <div class="flex-auto flex flex-col p-2 full-phone:p-1 gap-3 lg:gap-2 bg-white-0">
                  <div class="flex flex-col gap-0">
                    <h2
                      class="truncate text-sm text-gray-1 capitalize font-normal mob-prod-name"
                      dangerouslySetInnerHTML={{
                        __html: suggestions?.productName ?? "",
                      }}
                    />
                  </div>
                  <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-0 min-h-12 justify-center">
                      {suggestions?.listPrice !== suggestions?.price && (
                        <div
                          class={`line-through text-gray-0 text-sm font-normal`}
                        >
                          {formatPrice(
                            suggestions?.listPrice,
                            actualProduct?.currency,
                          )}
                        </div>
                      )}
                      <div class="flex flex-row gap-1 full-phone:justify-between items-center">
                        <div class="text-lg text-gray-0 font-semibold">
                          {formatPrice(
                            suggestions?.price,
                            actualProduct?.currency,
                          )}
                        </div>
                        {suggestions?.listPrice !== suggestions?.price && (
                          <div class="flex items-center justify-center border border-red-1 w-[56px] h-[22px]">
                            <span class="text-xs text-red-1 font-medium">
                              {suggestions?.listPrice && suggestions?.price
                                ? `${
                                  Math.round(
                                    ((suggestions?.listPrice -
                                      suggestions?.price) /
                                      suggestions?.listPrice) * 100,
                                  )
                                }% `
                                : ""}
                              OFF
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="relative -mx-3 z-30 -bottom-48 full-tablet:hidden">
          <Icon id="EqualsBuyTogether" size={42} stroke-width={1} />
        </div>
        <div class="desktop-sum-products cs-min-desktop:h-[443px] full-tablet:hidden min-w-[315px] px-4 border flex flex-col justify-center items-start border-solid border-gray-20">
          <span class="text-xl text-black font-poppins text-left">
            Look completo por
          </span>
          <div class="text-[26px] text-black font-semibold my-3">
            {formatPrice(
              actualProduct?.price + suggestions?.price,
              actualProduct?.currency,
            )}
          </div>
          <AddToCartButton
            seller="1"
            skuActual={selectedSkuActual.value}
            skuSuggestion={selectedSkuSuggestion.value}
          />
        </div>
      </div>
      <div class="mobile-sum-products mt-3 cs-min-desktop:hidden min-w-[234px] w-full px-4 border flex full-phone:flex-col full-phone:justify-center justify-center items-center border-solid border-gray-20 py-5">
        <div class="flex flex-col mr-8 full-phone:mr-0 justify-center">
          <span class="text-xl text-black-0 font-poppins text-left">
            Look completo por
          </span>
          <div class="text-[26px] text-black-0 font-semibold my-3">
            {formatPrice(
              actualProduct?.price + suggestions?.price,
              actualProduct?.currency,
            )}
          </div>
        </div>
        <AddToCartButton
          seller="1"
          skuActual={selectedSkuActual.value}
          skuSuggestion={selectedSkuSuggestion.value}
        />
      </div>
    </div>
  );
};

export default CustomBuyTogetherContent;
