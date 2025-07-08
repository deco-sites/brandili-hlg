import Modal from "../../components/ui/Modal.tsx";
import { signal } from "@preact/signals";
import { useId } from "../../sdk/useId.ts";
import Icon from "site/components/ui/Icon.tsx";

interface Props {
  product: any;
}
const openSizeModal = signal(false);

const ProductSizeList = ({ product }: Props) => {
  const sizeTableDesk = product?.isVariantOf?.additionalProperty.find((
    item: any,
  ) => item.name === "Tabela de Medidas")?.value;
  const sizeTableMob = product?.isVariantOf?.additionalProperty.find((
    item: any,
  ) => item.name === "Tabela de Medidas Mobile")?.value;
  const id = useId();

  return (
    <>
      <div id={id} class="full-tablet:hidden">
        <button
          class="flex items-center gap-2 bg-transparent hover:underline font-poppins font-light text-xs"
          onClick={() => openSizeModal.value = true}
        >
          <Icon id="SizeTable" width={18} height={16} />
          Tabela de Medidas
        </button>
        <Modal
          loading="lazy"
          open={openSizeModal.value}
          onClose={() => openSizeModal.value = false}
        >
          <div
            class="modal-content"
            dangerouslySetInnerHTML={{ __html: sizeTableDesk }}
          />
        </Modal>
      </div>
      <div id={id} class="cs-min-desktop:hidden">
        <button
          class="flex items-center gap-2 bg-transparent hover:underline font-poppins font-light text-xs"
          onClick={() => openSizeModal.value = true}
        >
          <Icon id="SizeTable" width={18} height={16} />
          Tabela de Medidas
        </button>
        <Modal
          loading="lazy"
          open={openSizeModal.value}
          onClose={() => openSizeModal.value = false}
        >
          <div
            class="modal-content"
            dangerouslySetInnerHTML={{ __html: sizeTableMob }}
          />
        </Modal>
      </div>
    </>
  );
};

export default ProductSizeList;
