import Button from "../../components/ui/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Filters from "../../components/search/Filters.tsx";
import Sort from "../../components/search/Sort.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import FilterResult from "../../islands/FilterResult.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "breadcrumb" | "sortOptions"
  >
  & {
    qtdProduct: number | undefined;
  }
  & {
    displayFilter?: boolean;
  };

function SearchControls({
  filters,
  breadcrumb,
  qtdProduct,
  displayFilter,
  sortOptions,
}: Props) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => (open.value = false)}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full overflow-y-hidden">
            <div class="flex justify-center items-center bg-gray-0">
              <Button
                class="!shadow-none bg-transparent hover:bg-transparent border-0 hover:border-0 absolute left-3"
                onClick={() => (open.value = false)}
              >
                <Icon id="XMark" class="text-white-0" width={13} height={13} strokeWidth={3} />
              </Button>
              <h2 class="px-4 py-3">
                <span class="font-medium text-white-0 text-xl">Filtros</span>
              </h2>
            </div>
            <div class="filter-aside flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col gap-x-2">
        <div class="block lg:hidden">
          <FilterResult filters={filters} />
        </div>
        <div class="flex flex-col justify-between mb-4 full-phone:mb-0 py-4 px-2 full-tablet:px-0 sm:mb-0 sm:p-0 sm:gap-4 full-tablet:gap-1 sm:flex-row sm:h-[53px] lg:hidden">
          <div class="hidden flex-row items-center sm:p-0 mb-2">
            <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          </div>

          <div class="flex flex-row items-center justify-between w-full full-tablet:flex-row-reverse lg:hidden py-4 full-phone:py-1">
            <Button
              class="bg-white-0 hover:bg-white-0 border border-gray-15 text-gray-0 font-normal h-9 min-h-9 full-tablet:basis-1/2 lg:hidden"
              onClick={() => {
                open.value = true;
              }}
            >
              Filtrar
              <Icon id="FilterList" width={13} height={13} />
            </Button>
            {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
          </div>
        </div>
        {qtdProduct && qtdProduct > 0 && (
          <span class="text-gray-3 text-[10px] font-normal mb-2 p-1 block lg:hidden">
            {qtdProduct} produtos
          </span>
        )}
      </div>
    </Drawer>
  );
}

export default SearchControls;
