interface Props {
  description: string | undefined;
}

const ProductDescription = ({ description }: Props) => {
  return (
    <>
      <span class="text-sm">
        {description && (
          <div class="collapse collapse-arrow border-gray-13 border-b border-t rounded-none">
            <input id="description" type="checkbox" class="min-h-0" />
            <label for="description" class="collapse-title">
              <span class="font-poppins font-normal text-base text-gray-0">
                Descrição
              </span>
            </label>
            <div class="collapse-content">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        )}
      </span>
    </>
  );
};

export default ProductDescription;
