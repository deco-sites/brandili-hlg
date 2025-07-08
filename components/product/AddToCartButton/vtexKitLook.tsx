import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./commonKitLook.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  firstProductID: string;
  secondProductID: string;
}

function AddToCartButtonKitLook(
  { seller, firstProductID, secondProductID }: Props,
) {
  const arrId = [];

  /* adiciona primeiro item SELECIONADO no array */
  const first = firstProductID && firstProductID?.length > 0;
  first ? arrId.push(firstProductID) : null;

  /* adiciona segundo item SELECIONADO no array */
  const second = secondProductID && secondProductID?.length > 0;
  second ? arrId.push(secondProductID) : null;

  /* tratativa para exibir a mensagem.
  Ambos menor que 0 não ira exibir a mensagem */
  const showMessage = !first && !second ? true : false;

  const { addItems } = useCart();
  const arrItems = arrId.map((v, i) => {
    return { id: v, seller: seller, quantity: 1 };
  });

  const onAddItem = () =>
    addItems({
      orderItems: arrItems,
    });

  return <Button onAddItem={onAddItem} showMessage={showMessage} />;
}

export default AddToCartButtonKitLook;
