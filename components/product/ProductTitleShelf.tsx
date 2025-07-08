export interface Props {
  /**
   * @title titulo da vitrine
   */
  title?: string;
}

const ProductTitleShelf = ({ title }: Props) => {
  return (
    <div class="w-full max-w-[1440px] mx-auto mt-14 px-8 full-phone:px-4">
      <h2 class="font-poppins font-semibold text-2xl">{title}</h2>
    </div>
  );
};

export default ProductTitleShelf;
