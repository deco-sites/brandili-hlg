import { useMemo } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(
      globalThis.window.location?.search,
    );
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(
    globalThis.window.location.search,
  );

  urlSearchParams.delete(PAGE_QUERY_PARAM);
  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  globalThis.window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamentos",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="full-tablet:basis-1/2 full-tablet:mr-[6px] full-tablet:after:border-r full-tablet:after:border-gray-15 full-tablet:after:h-9 full-tablet:after:pl-[6px] flex items-center lg:-mt-3">
      <label
        for="sort"
        class="font-normal text-sm text-gray-0 relative hidden full-lg-laptop:block mr-3"
      >
        Classificar por
      </label>
      <select
        id="sort"
        name="sort"
        onInput={applySort}
        class="w-min h-[36px] rounded text-sm text-gray-0 cursor-pointer outline-none border border-gray-15 full-tablet:text-center full-tablet:w-full"
      >
        {sortOptions.map(({ value, label }) => ({
          value,
          label: portugueseMappings[label as keyof typeof portugueseMappings] ??
            label,
        })).filter(({ label }) => label).map(({ value, label }) =>
          value !== "name:desc" && value !== "name:asc" && (
            <option key={value} value={value} selected={value === sort}>
              <span class="text-sm text-gray-0">{label}</span>
            </option>
          )
        )}
      </select>
    </div>
  );
}

export default Sort;
