import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  items: SiteNavigationElement[];
}

const handleClick = (itemName: any) => {
  const elSub: any = document.querySelectorAll(`.submenu`);
  elSub.forEach((v: any) => {
    if (v.getAttribute("data-id") === itemName) {
      v.classList.toggle("active");
      v.classList.remove("hidden");
    } else {
      v.classList.add("hidden");
    }
  });
};

function MenuItemTitle({ item }: { item: SiteNavigationElement }) {
  const { name, url, children } = item;
  return children && children?.length > 0
    ? (
      <li
        class={`item-menu group ${name === "Novidades" ? "item-active" : ""}`}
        id={name}
        onClick={() => {
          (document.querySelector(".item-menu") as HTMLElement).classList
            .remove("item-active");
          handleClick(name);
        }}
      >
        <span class="text-base text-gray-3 font-light group-hover:text-gray-0 group-hover:font-medium group-hover:underline">
          {name}
        </span>
      </li>
    )
    : (
      <a class="text-gray-1 text-base" href={url}>
        <span class="text-base text-gray-3 font-light group-hover:text-gray-0 group-hover:font-medium group-hover:underline">
          {name}
        </span>
      </a>
    );
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  const { name, url, children } = item;
  const lastImage = item?.image?.at(-1);
  const menucategories = ["Roupas", "Categorias", "Faixa etária" ]
  return children && children?.length > 0 && (
    <div
      class={`submenu bg-base-100 gap-6 w-full right-0 left-0 ${
        name !== "Novidades" ? "hidden" : ""
      }`}
      data-id={name}
    >
      {lastImage && lastImage?.url && (
        <Image
          class="w-full max-w-[350px] h-full max-h-[220px] mb-3"
          src={lastImage.url}
          alt={lastImage.alternateName}
          width={350}
          height={220}
          loading="lazy"
        />
      )}
      <ul class="flex flex-col items-start justify-center gap-y-2.5">
        {children.map((node) => (
          <li class="menu-mobile collapse collapse-plus bg-gray-4 rounded-none">
            <input type="checkbox" checked={node?.name && menucategories.includes(node?.name) ? true  : false} />
            <a class="collapse-title text-gray-0 text-base gray-4 font-normal min-h-fit py-3 px-4">
              <span>{node.name}</span>
            </a>
            <ul class={`flex flex-col collapse-content flex-wrap`}>
              {node.children?.map((leaf) => (
                <li>
                  <a class="text-gray-1 text-base" href={leaf.url}>
                    <span
                      class={`block ${
                        leaf.name === "Ver Todas" ? "hidden" : ""
                      }`}
                    >
                      {leaf.name}
                    </span>
                    <span class="block text-xs font-light">
                      {leaf.identifier}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
        <li class="bg-gray-4 py-3 px-4 w-full">
          <a href={url} class="text-gray-0 text-base font-normal">
            <span>Ver Todas</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col w-full h-full p-3">
      <ul class="flex flex-row flex-nowrap gap-5 relative overflow-x-auto overflow-y-hidden max-w-[375px] pt-1 pb-2 ">
        {items.map((item) => <MenuItemTitle item={item} />)}
      </ul>
      <div class="max-h-[88vh] overflow-y-auto">
        <ul class="flex flex-grow flex-nowrap flex-col py-3 ">
          {items.map((item) => <MenuItem item={item} />)}
        </ul>

        <ul class="flex flex-col py-2 bg-base- mb-3">
          <li class="border-b border-b-gray-15 py-3">
            <a
              class="flex items-center gap-4 py-1"
              href="/login?returnUrl=%2Faccount"
            >
              <Icon id="User" width={20} height={22} strokeWidth={1.2} />
              <span class="text-sm">Entrar ou cadastrar</span>
            </a>
          </li>
          <li class="border-b border-b-gray-15 py-3">
            <a
              class="flex items-center gap-4 py-1"
              href="/account#/orders"
            >
              <Icon id="Orders" width={17} height={19} strokeWidth={1.6} />
              <span class="text-sm">Meus pedidos</span>
            </a>
          </li>
          <li class="border-b border-b-gray-15 py-3">
            <a
              class="flex items-center gap-4 py-1"
              href="#"
            >
              <Icon id="Heart" width={19} height={17} strokeWidth={1} />
              <span class="text-sm">Favoritos</span>
            </a>
          </li>
          <li class="border-b border-b-gray-15 py-3">
            <a
              class="flex items-center gap-4 py-1"
              href="https://brandili.zendesk.com/hc/pt-br/requests/new"
            >
              <Icon id="Help" width={20} height={20} />
              <span class="text-sm">Central de ajuda</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
