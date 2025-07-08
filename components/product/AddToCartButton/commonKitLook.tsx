import { useState } from "preact/hooks";
import Button from "../../ui/Button.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export interface Props {
  /** @description: sku name */
  onAddItem: () => Promise<void>;
  showMessage: boolean;
}

const useAddToCart = ({ onAddItem, showMessage }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart, displayKitLook, kitTransfer } = useUI();
  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (!showMessage) {
        setLoading(true);

        await onAddItem();

        displayKitLook.value = false;
        displayCart.value = true;
        kitTransfer.value = "";
      } else {
        alert("Selecione ao menos um tamanho");
      }
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButtonKitLook(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      class="px-0 bg-blue-1 hover:bg-blue-1 border-blue-1 hover:border-blue-1 text-sm font-poppins text-white-0 w-full font-normal transition-3s flex-shrink-[initial]"
    >
      Comprar o kit
    </Button>
  );
}
