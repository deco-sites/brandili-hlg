import type { Product } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";

interface Props {
  description: any;
  product: Product;
}

const ProductMobileTabs = ({ product, description }: Props) => {
  const activeDescription = useSignal("active");
  const activeSpecification = useSignal("hidden");
  const activeTabDescription = useSignal("active");
  const activeTabSpecification = useSignal("");

  const activateDescription = () => {
    activeDescription.value = "active";
    activeTabDescription.value = "active";
    activeSpecification.value = "hidden";
    activeTabSpecification.value = "";
  };
  const activateSpecification = () => {
    activeSpecification.value = "active";
    activeTabSpecification.value = "active";
    activeDescription.value = "hidden";
    activeTabDescription.value = "";
  };

  const specsArr = product?.isVariantOf?.additionalProperty;

  const specsValues = {
    genero: specsArr?.find((item) => item.name === "Gênero")?.value,
    linha: specsArr?.find((item) => item.name === "Linha")?.value,
    composicao: specsArr?.find((item) => item.name === "Composição")?.value,
    cor: specsArr?.find((item) => item.name === "Cor")?.value,
    material: specsArr?.find((item) => item.name === "Material")?.value,
    faixaEtaria: specsArr?.find((item) => item.name === "Faixa Etária")?.value,
  };

  return (
    <div class="product-mobile-tabs px-4">
      <div class="tab-buttons flex justify-start">
        <div
          class={`description-tab flex justify-center ${activeTabDescription.value} border-b w-full border-gray-3`}
        >
          <button
            onClick={activateDescription}
            class="text-gray-6 font-arial mx-auto font-normal text-sm"
          >
            Descrição
          </button>
        </div>
        <div
          class={`specifications-tab flex justify-center ${activeTabSpecification.value} border-b w-full border-gray-3`}
        >
          <button
            onClick={activateSpecification}
            class="text-gray-6 font-arial mx-auto font-normal text-sm"
          >
            Especificações
          </button>
        </div>
      </div>
      <div
        class={`tab-contents-description bg-white pt-7 border-t border-gray-9 relative z-10 ${activeDescription.value}`}
      >
        <div dangerouslySetInnerHTML={{ __html: description ?? "" }} />
      </div>
      <div
        class={`tab-contents-specification bg-white pt-7 border-t border-gray-9 z-10 ${activeSpecification.value}`}
      >
        <div class="content">
          {specsValues.genero && (
            <div class="flex w-full mt-2 justify-between border-b border-solid border-gray-14 text-gray-0 font-light">
              <span class="w-1/2 text-left">Gênero</span>
              <span class="w-1/2 text-left">{specsValues.genero}</span>
            </div>
          )}
          {specsValues.linha && (
            <div class="flex w-full mt-2 justify-between border-b border-solid border-gray-14 text-gray-0 font-light">
              <span class="w-1/2 text-left">Linha</span>
              <span class="w-1/2 text-left">{specsValues.linha}</span>
            </div>
          )}
          {specsValues.composicao && (
            <div class="flex w-full mt-2 justify-between border-b border-solid border-gray-14 text-gray-0 font-light">
              <span class="w-1/2 text-left">Composição</span>
              <span class="w-1/2 text-left">{specsValues.composicao}</span>
            </div>
          )}
          {specsValues.cor && (
            <div class="flex w-full mt-2 justify-between border-b border-solid border-gray-14 text-gray-0 font-light">
              <span class="w-1/2 text-left">Cor</span>
              <span class="w-1/2 text-left">{specsValues.cor}</span>
            </div>
          )}
          {specsValues.material && (
            <div class="flex w-full mt-2 justify-between border-b border-solid border-gray-14 text-gray-0 font-light">
              <span class="w-1/2 text-left">Material</span>
              <span class="w-1/2 text-left">{specsValues.material}</span>
            </div>
          )}
          {specsValues.faixaEtaria && (
            <div class="flex w-full mt-2 justify-between border-b border-solid border-gray-14 text-gray-0 font-light">
              <span class="w-1/2 text-left">Faixa Etária</span>
              <span class="w-1/2 text-left">{specsValues.faixaEtaria}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductMobileTabs;
