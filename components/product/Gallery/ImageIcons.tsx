import { ProductDetailsPage } from "apps/commerce/types.ts";
import Icon from "../../../components/ui/Icon.tsx";

export interface Props {
  page: ProductDetailsPage | null;
}

const ImageIcons = ({ page }: Props) => {
  const { product }: any = page;
  const composition: string = product?.isVariantOf?.additionalProperty?.find((
    item: any,
  ) => item?.name === "Composição")?.value?.toLowerCase();

  return composition
    ? (
      <div class="ico-wrapper absolute top-5 left-36 full-tablet:left-2 z-30">
        {composition?.includes("poliester") && (
          <div class="mb-4 scale-150">
            <Icon id="Poliester" width={50} height={46} stroke-width={1} />
          </div>
        )}
        {composition?.includes("elastano") && (
          <div class="mb-4 scale-150">
            <Icon id="Elastano" width={50} height={46} stroke-width={1} />
          </div>
        )}
        {composition?.includes("algodao") ||
          composition?.includes("algodão") && (
              <div class="mb-4 scale-150">
                <Icon id="Algodao" width={50} height={46} stroke-width={1} />
              </div>
            )}
        {composition?.includes("linho") && (
          <div class="mb-4 scale-150">
            <Icon id="Linho" width={50} height={46} stroke-width={1} />
          </div>
        )}
        {composition?.includes("peluciado") && (
          <div class="mb-4 scale-150">
            <Icon id="Peluciado" width={50} height={46} stroke-width={1} />
          </div>
        )}
      </div>
    )
    : null;
};

export default ImageIcons;
