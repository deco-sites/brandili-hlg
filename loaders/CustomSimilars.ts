import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export interface SimilarProps {
  similars: any;
}

export default async function CustomBuyTogether(
  { page }: Props,
): Promise<SimilarProps | null> {
  const productId = page?.product?.inProductGroupWithID;
  const urlFetch =
    `https://brandili.vtexcommercestable.com.br/api/catalog_system/pub/products/crossselling/similars/${productId}`;
  const similarsReq = await fetch(urlFetch);
  const fetchedSimilars = await similarsReq.json();

  return {
    similars: fetchedSimilars,
  };
}
