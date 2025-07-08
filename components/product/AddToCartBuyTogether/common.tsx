import { useState } from "preact/hooks";
import Button from "../../../components/ui/Button.tsx";
import Icon from "site/components/ui/Icon.tsx";
import { useUI } from "../../../sdk/useUI.ts";

export interface Props {
  /** @description: sku name */
  onAddItem: () => Promise<void>;
  skuActual: string;
  skuSuggestion: string;
}

const useAddToCart = ({ skuActual, skuSuggestion, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (skuActual === "" || skuSuggestion === "") {
        alert("Selecione o tamanho nos dois produtos para continuar");
      } else {
        setLoading(true);
        await onAddItem();
        displayCart.value = true;
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
      class="px-0 flex items-center gap-2 full-tablet:max-w-[200px] full-phone:max-w-full bg-black-0 hover:bg-black-0 border-black-2 hover:border-black-2 text-sm font-poppins text-white-0 w-full font-normal transition-3s flex-shrink-[initial]"
    >
      Compre junto
      <Icon id="AddToCartBTG" width={17} height={20} stroke-width={1} />
    </Button>
  );
}
