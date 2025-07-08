import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "site/sdk/useOffer.ts";
import CustomBuyTogetherContent from "site/islands/CustomBuyTogetherContent.tsx";
import { useId } from "site/sdk/useId.ts";

export interface Props {
  page: ProductDetailsPage | null;
  products: Product[] | null;
}

export default function CustomBuyTogether({ products, page }: Props) {
  // SUGGESTION DATA

  const product = products && products[0];

  const id = useId();
  const suggestionListOffers = product?.offers;
  const suggestionOffers = useOffer(suggestionListOffers);
  const suggestions = {
    productName: product?.isVariantOf?.name,
    listPrice: suggestionOffers?.listPrice,
    price: suggestionOffers?.price,
    images: product?.image,
    currency: product?.offers?.priceCurrency,
    hasVariant: product?.isVariantOf?.hasVariant ?? [],
    isAvailable:
      suggestionOffers?.availability === "https://schema.org/InStock",
    composition: product?.isVariantOf?.additionalProperty?.find((item) =>
      item?.name === "Composição"
    )?.value?.toLowerCase(),
    link: product?.url,
  };

  // ACTUAL PRODUCT DATA

  const pageProducts = page?.product;
  const actualProductOffers = pageProducts?.offers;
  const { listPrice, price, availability } = useOffer(actualProductOffers);
  const actualProduct = {
    productName: pageProducts?.isVariantOf?.name,
    listPrice: listPrice,
    price: price,
    images: pageProducts?.image,
    currency: actualProductOffers?.priceCurrency,
    hasVariant: pageProducts?.isVariantOf?.hasVariant ?? [],
    isAvailable: availability === "https://schema.org/InStock",
    composition: pageProducts?.isVariantOf?.additionalProperty?.find((item) =>
      item?.name === "Composição"
    )?.value?.toLowerCase(),
  };

  return (
    <>
      <div id={id} class="w-full max-w-[990px] mx-auto">
        <CustomBuyTogetherContent
          suggestions={suggestions}
          actualProduct={actualProduct}
        />
      </div>
    </>
  );
}
