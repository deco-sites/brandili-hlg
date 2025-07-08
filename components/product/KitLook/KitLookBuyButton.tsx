import Button from "site/components/ui/Button.tsx";
import { useUI } from "site/sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product[];
}

const KitLookBuyButton = ({ product }: Props) => {
  const { displayKitLook, kitTransfer } = useUI();
  return (
    <Button
      class="bg-white-0 hover:bg-white-0 !shadow-blg text-gray-0 text-sm font-normal min-w-[250px] min-h-[40px] h-[40px] rounded-none"
      aria-label="open kit look"
      data-deco={displayKitLook.value && "open-kit-look"}
      onClick={() => {
        displayKitLook.value = true;
        kitTransfer.value = product;
      }}
    >
      Compre o Look
    </Button>
  );
};

export default KitLookBuyButton;
