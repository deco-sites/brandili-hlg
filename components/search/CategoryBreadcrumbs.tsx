import Breadcrumb from "../ui/Breadcrumb.tsx";
import type { ProductListingPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductListingPage | null;
}

const CategoryBreadcrumbs = ({ page }: Props) => {
  const { breadcrumb }: any = page === null ? "" : page;

  return page !== null
    ? (
      <div class="container w-full mx-auto my-3">
        <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
      </div>
    )
    : (
      <div class="w-full container px-16 full-tablet:px-4 mx-auto breadcrumbs my-5 full-tablet:my-3 overflow-hidden truncate">
        <ul>
          <li>
            <a class="text-sm" href="/">
              Home
            </a>
          </li>
          <li>
            <a class="text-sm" href={"#"}>
              Página não encontrada
            </a>
          </li>
        </ul>
      </div>
    );
};

export default CategoryBreadcrumbs;
