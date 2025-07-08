import Button from "site/components/ui/Button.tsx";
import { useUI } from "site/sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";
import type { Product } from "apps/commerce/types.ts";

interface Props {
  product: Product;
}

const QuickBuyButton = ({ product }: Props) => {
  const { displayQuickBuy, productTransfer } = useUI();

  return (
    <Button
      class="border-none hover:border bg-blue-0 hover:bg-blue-0 outline-0 hover:outline-blue-4 hover:outline-1 rounded-bl-full rounded-tl-full rounded-tr-full h-[53px] w-[53px] full-phone:h-[36px] full-phone:w-[36px] full-phone:min-h-[36px] flex items-center justify-center pr-0 pl-3 full-phone:pl-[6px] pt-1 absolute bottom-3 right-6 full-phone:right-3 hover:shadow-blg hover:scale-105"
      aria-label="open quick buy"
      data-deco={displayQuickBuy.value && "open-quick-buy"}
      onClick={() => {
        productTransfer.value = product;
        displayQuickBuy.value = true;
      }}
    >
      <span class="block full-phone:hidden">
        <Icon width={36} height={38} id="ShelfIconBag" />
      </span>
      <span class="hidden full-phone:block">
        <Icon width={22} height={22} id="ShelfIconBagMobile" />
      </span>
    </Button>
  );
};

export default QuickBuyButton;
