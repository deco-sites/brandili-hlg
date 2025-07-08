import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";

export interface Props {
  filters: ProductListingPage["filters"];
}

const FilterResult = ({ filters }: Props) => {
  const urlSearch = globalThis.window.location?.search;
  const sliptItems = urlSearch?.split("&");
  const searchParam = sliptItems?.[0].includes("?q=");
  const filterParam = urlSearch?.includes("filter.");

  return (
    sliptItems &&
    sliptItems.length >= 2 &&
    filterParam && (
      <div class="w-full flex justify-between items-center pt-4 border-t-8 border-gray-18 gap-2 mb-3 full-phone:mb-0">
        <div class="flex items-center gap-1 overflow-auto selectedLabel-overflow">
          {filters.map((val: any) => {
            const filterVal = val?.values;
            const itemSelected = filterVal?.find(
              (item: any) => item?.selected,
            )?.label;
            const itemUrl = filterVal?.find((item: any) => item?.selected)?.url;

            return (
              itemSelected && (
                <a
                  href={itemUrl}
                  class="selectedLabel relative cursor-pointer flex items-center justify-center font-light min-w-fit w-fit text-gray-0 hover:text-blue-0 text-sm full-phone:text-xs bg-white-0 hover:bg-blue-3 border-[0.5px] border-gray-11 hover:border-blue-0 rounded py-1 px-2"
                >
                  {itemSelected}
                </a>
              )
            );
          })}
        </div>

        <button
          class="text-base text-gray-0 underline block full-tablet:hidden"
          onClick={() => (globalThis.window.location.href = searchParam
            ? "s/" + sliptItems?.[0]
            : globalThis.window.location.pathname)}
        >
          Limpar Filtro
        </button>
      </div>
    )
  );
};

export default FilterResult;
