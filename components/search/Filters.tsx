import Avatar from "../../components/ui/Avatar.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { useSignal } from "@preact/signals";
import FilterRange from "../../islands/FilterRangePrice.tsx";
import { clx } from "../../sdk/clx.ts";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function uniq(a: any) {
  return a.sort().filter(function (item: string, pos: any, ary: any) {
    return !pos || item != ary[pos - 1];
  });
}

function ValueItem({ url, selected, label, quantity }: FilterToggleValue) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm text-gray-0 capitalize">{label}</span>
      {quantity > 0 && (
        <span class="text-sm text-base-300 hidden">({quantity})</span>
      )}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection =
    key === "tamanho" || key === "cor" ? "flex-row" : "flex-col";

  if (key === "price") {
    const val: number = values.length;
    let x: string[];
    let arr: number[] = [];
    let min: number;
    let max: number;

    for (let i = 0; i < val; i++) {
      x = values[i].value.split(":");
      for (let j = 0; j < x.length; j++) {
        arr.push(Number(x[j]));
      }
    }

    arr = uniq(arr);
    min = Math.min(...arr);
    max = Math.max(...arr);

    const url: string | undefined = values[0]?.url?.split("&filter.price")[0];
    const urlChanged: string | undefined =
      values[0]?.url?.split("&filter.price=")[1];
    const minMax: string[] | undefined = urlChanged?.split("%3A");

    return values.length > 0 ? (
      <>
        <FilterRange
          min={min}
          max={max}
          currentUrlFilterPrice={url}
          currentMinFacet={Number(minMax[0])}
          currentMaxFacet={Number(minMax[1])}
        />
      </>
    ) : null;
  }

  return (
    <>
      <ul
        class={clx(
          "hidden full-desktop:grid full-desktop:grid-cols-3 gap-2 shadow-blg-1 bg-white-0",
          "full-desktop:p-3 full-desktop:lg:rounded full-desktop:min-w-52 full-desktop:w-max"
        )}
      >
        {values.map((item) => {
          const { url, selected, value, quantity, label } = item;

          if (key === "tamanho") {
            return (
              <div class="flex gap-[2px]">
                <a href={url} rel="nofollow" class={key}>
                  <Avatar
                    content={value}
                    variant={selected ? "active" : "default"}
                  />
                </a>
              </div>
            );
          }

          if (key === "cor") {
            return (
              <div class="flex gap-[2px]">
                <a href={url} rel="nofollow" class={key} selected>
                  <Avatar
                    content={value}
                    variant={selected ? "active" : "default"}
                  />
                </a>
                <span class="text-sm text-gray-0 capitalize">{label}</span>
              </div>
            );
          }

          if (key === "price") {
            const range = parseRange(item.value);

            return (
              range && (
                <ValueItem
                  {...item}
                  label={`${formatPrice(range.from)} - ${formatPrice(
                    range.to
                  )}`}
                />
              )
            );
          }

          return <ValueItem {...item} />;
        })}
      </ul>

      <ul class={`full-desktop:hidden flex flex-wrap gap-2 ${flexDirection}`}>
        {values.map((item) => {
          const { url, selected, value, quantity } = item;

          if (key === "cor" || key === "tamanho") {
            return (
              <a href={url} rel="nofollow" class={key}>
                <Avatar
                  content={value}
                  variant={selected ? "active" : "default"}
                />
              </a>
            );
          }

          if (key === "price") {
            const range = parseRange(item.value);

            return (
              range && (
                <ValueItem
                  {...item}
                  label={`${formatPrice(range.from)} - ${formatPrice(
                    range.to
                  )}`}
                />
              )
            );
          }

          return <ValueItem {...item} />;
        })}
      </ul>
    </>
  );
}

function Filters({ filters }: Props) {
  const toggleDept = useSignal(true);
  const toggleGen = useSignal(true);
  const toggleCat = useSignal(true);
  const toggleSubCat = useSignal(true);
  const togglePrice = useSignal(true);
  const toggleCor = useSignal(true);
  const toggleFaixEt = useSignal(true);
  const toggleBrand = useSignal(true);
  const toggleTam = useSignal(true);

  return (
    <>
      <ul
        class={clx(
          "hidden full-desktop:flex flex-col full-desktop:flex-row gap-3",
          "pb-6 full-desktop:pb-1 full-desktop:overflow-auto filter-overflow"
        )}
      >
        {filters.filter(isToggle).map((filter) => {
          let visible = false;

          if (
            filter.label !== "Category 4" &&
            filter.label !== "Material" &&
            filter.key !== "category-1" &&
            filter.key !== "category-2" &&
            filter.key !== "category-3"
          ) {
            visible = true;
          }

          return (
            visible && (
              <li
                class={clx(
                  `flex flex-col gap-2 lg:max-w-[265px] ${
                    filter.key === "departamentos"
                      ? "order-first"
                      : filter.key === "genero"
                      ? "order-1"
                      : filter.key === "categorias"
                      ? "order-2"
                      : filter.key === "subcategorias"
                      ? "order-3"
                      : "order-last"
                  }
                  `
                )}
              >
                <span
                  data-label={filter.label}
                  class={`text-gray-0 text-sm capitalize cursor-pointer flex justify-between lg:justify-evenly items-center gap-2 lg:p-1 ${
                    filter.label == "Departamentos" && !toggleDept.value ||
                    filter.label == "Gênero" && !toggleGen.value ||
                    filter.label == "Categorias" && !toggleCat.value ||
                    filter.label == "Subcategorias" && !toggleSubCat.value ||
                    filter.label == "Preço" && !togglePrice.value ||
                    filter.label == "Cor" && !toggleCor.value ||
                    filter.label == "Faixa Etária" && !toggleFaixEt.value ||
                    filter.label == "Marca" && !toggleBrand.value ||
                    filter.label == "Tamanho" && !toggleTam.value
                    ? "plus bg-white-0 z-20 rounded" : "less lg:z-20"
                  }`}
                  onClick={() => {
                    if (filter.label == "Departamentos") {
                      toggleDept.value = !toggleDept.value;
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";
                    } 
                    if (filter.label == "Gênero") {
                      toggleGen.value = !toggleGen.value;
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";
                    }
                    if (filter.label == "Categorias") {
                      toggleCat.value = !toggleCat.value;
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";
                    }
                    if (filter.label == "Subcategorias") {
                      toggleSubCat.value = !toggleSubCat.value
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";
                    }
                    if (filter.label == "Preço") {
                      togglePrice.value = !togglePrice.value
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";

                    }
                    if (filter.label == "Cor") {
                      toggleCor.value = !toggleCor.value
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";
                    }
                    if (filter.label == "Faixa Etária") {
                      toggleFaixEt.value = !toggleFaixEt.value
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";
                    }
                    if (filter.label == "Marca") {
                      toggleBrand.value = !toggleBrand.value
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleTam.value ? toggleTam.value = true : "";
                    }
                    if (filter.label == "Tamanho") {
                      toggleTam.value = !toggleTam.value
                      !toggleDept.value ? toggleDept.value = true : "";
                      !toggleGen.value ? toggleGen.value = true : "";
                      !toggleCat.value ? toggleCat.value = true : "";
                      !toggleSubCat.value ? toggleSubCat.value = true : "";
                      !togglePrice.value ? togglePrice.value = true : "";
                      !toggleCor.value ? toggleCor.value = true : "";
                      !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                      !toggleBrand.value ? toggleBrand.value = true : "";
                    }
                  }}
                >
                  {filter.label}
                </span>
                <div
                  class={`${
                    filter.label == "Departamentos" && toggleDept.value ||
                    filter.label == "Gênero" && toggleGen.value ||
                    filter.label == "Categorias" && toggleCat.value ||
                    filter.label == "Subcategorias" && toggleSubCat.value ||
                    filter.label == "Preço" && togglePrice.value ||
                    filter.label == "Cor" && toggleCor.value ||
                    filter.label == "Faixa Etária" && toggleFaixEt.value ||
                    filter.label == "Marca" && toggleBrand.value ||
                    filter.label == "Tamanho" && toggleTam.value
                      ? "h-0 pt-0 overflow-hidden "
                      : "h-full pt-4 lg:pt-6 lg:filter-drop lg:z-20"
                  } transition-3s lg:absolute lg:top-4`}
                >
                  <FilterValues {...filter} />
                </div>
                <div
                  class={`opacity-70 fixed bottom-0 top-0 left-0 right-0 w-[100%] h-[100%] ${
                    filter.label == "Departamentos" && toggleDept.value ||
                    filter.label == "Gênero" && toggleGen.value ||
                    filter.label == "Categorias" && toggleCat.value ||
                    filter.label == "Subcategorias" && toggleSubCat.value ||
                    filter.label == "Preço" && togglePrice.value ||
                    filter.label == "Cor" && toggleCor.value ||
                    filter.label == "Faixa Etária" && toggleFaixEt.value ||
                    filter.label == "Marca" && toggleBrand.value ||
                    filter.label == "Tamanho" && toggleTam.value
                    ? "hidden" : "block z-10"
                  }`}
                  onClick={() => {
                    !toggleDept.value ? toggleDept.value = true : "";
                    !toggleGen.value ? toggleGen.value = true : "";
                    !toggleCat.value ? toggleCat.value = true : "";
                    !toggleSubCat.value ? toggleSubCat.value = true : "";
                    !togglePrice.value ? togglePrice.value = true : "";
                    !toggleCor.value ? toggleCor.value = true : "";
                    !toggleFaixEt.value ? toggleFaixEt.value = true : "";
                    !toggleBrand.value ? toggleBrand.value = true : "";
                    !toggleTam.value ? toggleTam.value = true : "";
                  }}
                ></div>
              </li>
            )
          );
        })}
      </ul>
      <ul class="full-desktop:hidden flex flex-col gap-6 px-4 pt-4 pb-6">
        {filters.filter(isToggle).map((filter) => {
          const toggleOpen = useSignal(false);
          let visible = false;
          //filter.key !== "category-1 -> Departamento
          //filter.key !== "category-2 -> Categoria
          //filter.key !== "category-3 -> Subcategoria
          if (
            filter.label !== "Category 4" &&
            filter.label !== "Material" &&
            filter.key !== "category-1" &&
            filter.key !== "category-2" &&
            filter.key !== "category-3"
          ) {
            visible = true;
          }

          return (
            visible && (
              <li
                class={clx(
                  `flex flex-col gap-2 max-w-[265px] ${
                    filter.key === "departamentos"
                      ? "order-first"
                      : filter.key === "genero"
                      ? "order-1"
                      : filter.key === "categorias"
                      ? "order-2"
                      : filter.key === "subcategorias"
                      ? "order-3"
                      : "order-last"
                  }
                `
                )}
              >
                <span
                  data-label={filter.label}
                  class={`text-gray-0 tex-sm uppercase cursor-pointer flex justify-between items-center gap-2 ${
                    !toggleOpen.value ? "plus" : "less"
                  }`}
                  onClick={() => {
                    toggleOpen.value = !toggleOpen.value;
                  }}
                >
                  {filter.label}
                </span>
                <div
                  class={`${
                    toggleOpen.value
                      ? "h-0 pt-0"
                      : "h-full max-h-64 overflow-y-auto pt-4 filter-drop"
                  } overflow-hidden transition-3s`}
                >
                  <FilterValues {...filter} />
                </div>
              </li>
            )
          );
        })}
      </ul>
    </>
  );
}

export default Filters;
