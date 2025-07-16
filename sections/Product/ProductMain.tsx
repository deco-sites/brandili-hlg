export { default } from "../../components/product/ProductMain.tsx";

export function LoadingFallback() {
  return (
    <div class="w-[90%] sm:w-[750px] sm:h-[800px] full-phone:h-[600px] p-4 m-5 mx-auto skeleton flex justify-center items-center">
      <span class="loading loading-spinner" />
    </div>
  );
}
