import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  skuActual: string;
  skuSuggestion: string;
}

function AddToCartButton({ seller, skuActual, skuSuggestion }: Props) {
  const { addItems } = useCart();
  const orderItems = [
    {
      id: skuActual,
      seller: seller,
      quantity: 1,
    },
    {
      id: skuSuggestion,
      seller: seller,
      quantity: 1,
    },
  ];

  const onAddItem = () => {
    return addItems({
      orderItems,
    });
  };

  return (
    <Button
      onAddItem={onAddItem}
      skuActual={skuActual}
      skuSuggestion={skuSuggestion}
    />
  );
}

export default AddToCartButton;
