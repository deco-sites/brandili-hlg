import ModalQuickBuy from "../../components/ui/ModalQuickBuy.tsx";
import { useId } from "../../sdk/useId.ts";
import { useUI } from "../../sdk/useUI.ts";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  product: any;
}

const QuickSizeList = ({ product }: Props) => {
  const sizeTableMob = product?.isVariantOf?.additionalProperty.find(
    (item: any) => item.name === "Tabela de Medidas Mobile",
  )?.value;
  const id = useId();
  const { openSizeModal } = useUI();

  return (
    <>
      <div id={id} class="quick-buy-size">
        <ModalQuickBuy
          loading="lazy"
          open={openSizeModal.value}
          onClose={() => (openSizeModal.value = false)}
        >
          <div
            class=" p-2"
            dangerouslySetInnerHTML={{ __html: sizeTableMob }}
          />
        </ModalQuickBuy>
      </div>
    </>
  );
};

export default QuickSizeList;
