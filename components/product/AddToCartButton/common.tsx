import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import { sendEvent } from "../../../sdk/analytics.tsx";
import { useUI } from "../../../sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  onAddItem: () => Promise<void>;
  productID: string;
}

const useAddToCart = ({ eventParams, productID, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart, displayQuickBuy, productTransfer } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (productID !== "") {
        setLoading(true);

        await onAddItem();

        sendEvent({
          name: "add_to_cart",
          params: eventParams,
        });

        displayQuickBuy.value = false;
        displayCart.value = true;
        productTransfer.value = "";
      } else {
        alert("Selecione ao menos um tamanho");
      }
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      class="px-0 bg-blue-1 hover:bg-blue-1 border-blue-1 hover:border-blue-1 text-sm font-poppins text-white-0 w-full font-normal transition-3s flex-shrink-[initial]"
    >
      Adicionar à sacola
      <Icon id="AddToCartPDP" width={17} height={18} stroke-width={1} />
    </Button>
  );
}
