interface Props {
  product: any;
}

const ProductSpecification = ({ product }: Props) => {
  const specsArr = product?.isVariantOf?.additionalProperty;

  const specsValues = {
    genero: specsArr?.find((item: any) => item.name === "Gênero")?.value,
    linha: specsArr?.find((item: any) => item.name === "Linha")?.value,
    composicao: specsArr?.find((item: any) => item.name === "Composição")
      ?.value,
    cor: specsArr?.find((item: any) => item.name === "Cor")?.value,
    material: specsArr?.find((item: any) => item.name === "Material")?.value,
    faixaEtaria: specsArr?.find((item: any) => item.name === "Faixa Etária")
      ?.value,
  };

  return (
    <div class="w-full collapse collapse-arrow border-b border-gray-13 border-solid rounded-none">
      <input id="specification" type="checkbox" class="min-h-0" />
      <label for="specification" class="collapse-title">
        <span class="font-poppins font-normal text-base text-gray-0">
          Especificações
        </span>
      </label>
      <div class="collapse-content">
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
  );
};

export default ProductSpecification;
