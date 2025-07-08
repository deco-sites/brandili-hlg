import Icon from "../../components/ui/Icon.tsx";

export type Props = {
  pageInfo: {
    currentPage: number;
    nextPage?: string;
    previousPage?: string;
    records?: number;
    recordPerPage?: number;
  };
};

interface PageParams {
  page: number;
  href: string;
}

export default function Pagination({ pageInfo }: Props) {
  const { nextPage, previousPage } = pageInfo;
  const totalPages: number = Math.ceil(
    Number(pageInfo?.records) / Number(pageInfo?.recordPerPage),
  );
  const firstPage = 1;
  const moreThanSixPages = totalPages > firstPage + 5;

  const pageParams = new URLSearchParams(nextPage ?? previousPage);

  const currentPage = pageInfo.currentPage;
  const nextPageNumber = currentPage + 1;
  const prevPageNumber = currentPage - 1;
  const lastPage = totalPages;
  const shouldRenderFirstPage = currentPage >= 3;
  const shouldRenderLastPage = lastPage !== -1 && currentPage <= lastPage - 2;

  const eachPageParams: PageParams[] = Array.from(
    { length: Number(totalPages) },
    (_value, i) => {
      pageParams.set("page", `${i + 1}`);
      return {
        page: i + 1,
        href: pageParams.toString(),
      };
    },
  );

  function SimplePagination() {
    return (
      <>
        {eachPageParams.map(({ page, href }) => (
          <a
            aria-label={`pagina ${page}`}
            rel="page"
            href={`?${href}`}
            class="w-8 h-8 flex items-center justify-center border-[0.5px] border-blue-0"
          >
            <span
              class={`text-lg ${
                page === pageInfo?.currentPage
                  ? "font-semibold text-white-0 bg-blue-0 w-8 h-8 flex items-center justify-center border-[0.5px] border-blue-0"
                  : "font-light text-blue-0 bg-white-0 w-8 h-8 flex items-center justify-center border border-blue-0 border-r-0"
              }`}
            >
              {page}
            </span>
          </a>
        ))}
      </>
    );
  }

  function PaginationWithSpread() {
    return (
      <>
        {shouldRenderFirstPage && (
          <a
            aria-label="primeira pagina"
            rel="first"
            href={`?${eachPageParams[0].href}`}
          >
            <span
              class={`text-lg w-8 h-8 flex items-center justify-center border-[0.5px] border-blue-0 border-r-0 ${
                currentPage === firstPage
                  ? "font-semibold text-white-0"
                  : "font-light text-blue-0"
              }`}
            >
              {firstPage}
            </span>
          </a>
        )}
        {previousPage && (
          <a aria-label="pagina anterior" rel="prev" href={previousPage}>
            <span class="font-light text-blue-0 bg-white-0 w-8 h-8 flex items-center justify-center border-[0.5px] border-blue-0 border-r-0">
              {prevPageNumber}
            </span>
          </a>
        )}
        <span class="font-semibold text-white-0 bg-blue-0 w-8 h-8 flex items-center justify-center border-[0.5px] border-blue-0">
          {currentPage}
        </span>
        {nextPage && (
          <a aria-label="proxima pagina" rel="next" href={nextPage}>
            <span class="font-light text-blue-0 bg-white-0 w-8 h-8 flex items-center justify-center border border-blue-0 border-r-0">
              {nextPageNumber}
            </span>
          </a>
        )}
        {shouldRenderLastPage && (
          <a
            aria-label="ultima pagina"
            rel="last"
            href={`?${eachPageParams.pop()?.href}`}
          >
            <span
              class={`text-lg w-8 h-8 flex items-center justify-center border-[0.5px] border-blue-0 ${
                currentPage === lastPage
                  ? "font-semibold text-white-0 bg-blue-0 w-8 h-8 flex items-center justify-center border-[0.5px] border-blue-0"
                  : "font-light text-blue-0 bg-white-0 w-8 h-8 flex items-center justify-center border border-blue-0"
              }`}
            >
              ...
            </span>
          </a>
        )}
      </>
    );
  }

  return (
    <div class="flex items-center justify-center gap-3">
      <a
        aria-label="previous page link"
        rel="prev"
        href={pageInfo?.previousPage ?? "#"}
        class="join-item text-sm font-light text-gray-1 flex items-center justify-center"
      >
        <Icon id="ChevronLeft" size={15} strokeWidth={1} class="text-gray-1" />
        Anterior
      </a>
      <div class="flex items-center justify-center">
        {!moreThanSixPages ? <SimplePagination /> : <PaginationWithSpread />}
      </div>
      <a
        aria-label="next page link"
        rel="next"
        href={pageInfo?.nextPage ?? "#"}
        class="join-item text-sm font-light text-gray-1 flex items-center justify-center"
      >
        Próximo
        <Icon
          id="ChevronLeft"
          size={15}
          strokeWidth={1}
          class="rotate-180 text-gray-1"
        />
      </a>
    </div>
  );
}
