import { SendEventOnView } from "../../components/Analytics.tsx";
import { Layout as CardLayout } from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Pagination from "../../components/search/Pagination.tsx";
import Icon from "../../components/ui/Icon.tsx";
import SearchControls from "../../islands/SearchControls.tsx";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import type {
  ProductDetailsPage,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import EmptySearch from "../../components/search/EmptySearch.tsx";
import NotFound from "../../components/error/NotFound.tsx";
import Sort from "../../islands/Sort.tsx";
import FilterResult from "../../islands/FilterResult.tsx";

export type Format = "Show More" | "Pagination";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  /**
   * @description Format of the pagination
   */
  format?: Format;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;

  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
  url: _url,
}: Omit<Props, "page"> & {
  page: ProductListingPage;
  url: string;
}) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const url = new URL(_url);
  const qtdProduct: number | undefined = pageInfo.records;

  const { format = "Show More" } = layout ?? {};

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  const isPartial = url.searchParams.get("partial") === "true";
  const isFirstPage = !pageInfo.previousPage;

  console.log('Page', pageInfo)

  return (
    <>
      <div class="container py-6 sm:py-7 mb-2 mt-3">
        {(isFirstPage || !isPartial) && (
          <SearchControls
            sortOptions={sortOptions}
            filters={filters}
            breadcrumb={breadcrumb}
            qtdProduct={qtdProduct}
            displayFilter={layout?.variant === "drawer"}
          />
        )}

        <div class="flex flex-col gap-x-3 lg:gap-y-8">
          {layout?.variant === "aside" &&
            filters.length > 0 &&
            (isFirstPage || !isPartial) && (
            <>
              <div class="hidden lg:block">
                <FilterResult filters={filters} />
              </div>
              <div class="hidden full-desktop:flex flex-col">
                <div class="flex justify-between items-center relative border-b border-gray-13">
                  <aside class="hidden sm:block min-w-[235px] lg:max-w-fit relative">
                    <Filters filters={filters} />
                  </aside>
                  <div class="hidden lg:block">
                    {sortOptions.length > 0 && (
                      <Sort sortOptions={sortOptions} />
                    )}
                  </div>
                </div>
                {qtdProduct && qtdProduct > 0 && (
                  <span class="text-gray-0 text-sm font-normal mt-5 p-1 block">
                    {qtdProduct} produtos
                  </span>
                )}
              </div>
            </>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns, format }}
              pageInfo={pageInfo}
              url={url}
            />
          </div>
        </div>

        <div class="flex justify-center my-14">
          <Pagination pageInfo={pageInfo} />
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: ReturnType<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }

  if (!page?.products.length) {
    return <EmptySearch />;
  }

  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};

export default SearchResult;
