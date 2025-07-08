import type { Props as MenuProps } from "../../components/header/Menu.tsx";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import Cart from "../../components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Button from "../../components/ui/Button.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";
import ProductQuickBuy from "site/islands/ProductQuickBuy.tsx";
import ProductKitLook from "site/islands/ProductKitLook.tsx";
const Menu = lazy(() => import("../../components/header/Menu.tsx"));
const Searchbar = lazy(() => import("../../components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
  page: ProductDetailsPage;
}

const Aside = ({ title, onClose, children }: { title: string; onClose?: () => void; children: ComponentChildren }) => (
  <div class="bg-base-100 h-full w-full max-w-[375px]">
    <div class="flex justify-between items-center">
      <h1 class="px-4 py-3">
        <span class="font-medium text-2xl text-gray-0">{title}</span>
      </h1>
      {onClose && (
        <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" width={13} height={13} strokeWidth={1} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

const AsideMinicart = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose?: () => void;
  children: ComponentChildren;
}) => {
  const { qtdItemsMinicart } = useUI();
  return (
    <div class="bg-base-100 grid grid-rows-[auto_1fr] h-full">
      <div class="flex justify-between items-center">
        <h1 class="px-4 py-3 flex items-center gap-3">
          <span class="font-normal text-xl text-gray-0">{title}</span>
          {qtdItemsMinicart.value > 0 && (
            <span class="quantity-items text-sm text-gray-3 font-normal">
              {`(${qtdItemsMinicart.value} ${qtdItemsMinicart.value > 1 ? "itens" : "item"} )`}
            </span>
          )}
        </h1>
        {onClose && (
          <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
            <Icon id="XMark" width={13} height={13} strokeWidth={1} />
          </Button>
        )}
      </div>
      <Suspense
        fallback={
          <div class="w-screen flex items-center justify-center">
            <span class="loading loading-ring" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

const AsideQuickBuy = ({ onClose, children }: { onClose?: () => void; children: ComponentChildren }) => (
  <div class="bg-white-0 flex h-full">
    <div class="flex justify-between items-center mb-5">
      {onClose && (
        <Button aria-label="X" class="bg-transparent top-0 btn-ghost absolute right-0 z-10" onClick={onClose}>
          <Icon id="XMark" width={13} height={13} strokeWidth={1} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

const AsideKitLook = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose?: () => void;
  children: ComponentChildren;
}) => (
  <div class="bg-white-0 grid grid-rows-[auto_1fr] h-full">
    <div class="flex justify-between items-center mb-5">
      <h1 class="px-4 py-3">
        <span class="font-normal text-2xl text-gray-0">{title}</span>
      </h1>
      {onClose && (
        <Button aria-label="X" class="btn btn-ghost" onClick={onClose}>
          <Icon id="XMark" width={13} height={13} strokeWidth={1} />
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform, page }: Props) {
  const {
    displayCart,
    displayMenu,
    displaySearchDrawer,
    displayQuickBuy,
    productTransfer,
    displayKitLook,
    kitTransfer,
  } = useUI();
  return (
    <>
      <Drawer // left drawer
        open={displayMenu.value || displaySearchDrawer.value}
        onClose={() => {
          displayMenu.value = false;
          displaySearchDrawer.value = false;
        }}
        aside={
          <Aside
            onClose={() => {
              displayMenu.value = false;
              displaySearchDrawer.value = false;
            }}
            title={displayMenu.value ? "Menu" : "Busca"}
          >
            {displayMenu.value && <Menu {...menu} />}

            <div
              class={
                searchbar && displaySearchDrawer.value
                  ? "searchBar-brandili w-full full-desktop:w-screen relative"
                  : "searchBar-brandili w-full full-desktop:w-screen relative hidden"
              }
            >
              <Searchbar {...searchbar} />
            </div>
          </Aside>
        }
      >
        {children}
      </Drawer>
      <Drawer // right drawer
        class="drawer-end drawer-overcontent"
        open={displayCart.value !== false}
        onClose={() => (displayCart.value = false)}
        aside={
          <AsideMinicart title="Minha sacola" onClose={() => (displayCart.value = false)}>
            <Cart platform={platform} />
          </AsideMinicart>
        }
      >
        {children}
      </Drawer>
      {productTransfer && (
        <Drawer
          class="drawer-end drawer-overcontent"
          open={displayQuickBuy.value !== false}
          onClose={() => {
            (displayQuickBuy.value = false), (productTransfer.value = false);
          }}
          aside={
            <AsideQuickBuy onClose={() => ((displayQuickBuy.value = false), (productTransfer.value = false))}>
              <ProductQuickBuy product={productTransfer.value} open={displayQuickBuy.value} />
            </AsideQuickBuy>
          }
        >
          {children}
        </Drawer>
      )}
      {kitTransfer.value && (
        <Drawer
          class="drawer-end drawer-overcontent"
          open={displayKitLook.value !== false}
          onClose={() => ((displayKitLook.value = false), (kitTransfer.value = ""))}
          aside={
            <AsideKitLook
              title="Compre o look"
              onClose={() => ((displayKitLook.value = false), (kitTransfer.value = ""))}
            >
              <ProductKitLook product={kitTransfer.value} />
            </AsideKitLook>
          }
        >
          {children}
        </Drawer>
      )}
    </>
  );
}

export default Drawers;
