import type { Props as SearchbarProps } from "../../components/search/Searchbar.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "../../islands/Header/Buttons.tsx";
import CartButtonVTEX from "../../islands/Header/Cart/vtex.tsx";
import Searchbar from "../../islands/Header/Searchbar.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import { Buttons, Logo } from "../../components/header/Header.tsx";

// Make it sure to render it on the server only. DO NOT render it on an island
function Navbar({
  items,
  searchbar,
  logo,
  logoLink,
  buttons,
  logoPosition = "left",
  device,
}: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: Logo;
  logoLink?: string;
  buttons?: Buttons;
  logoPosition?: "left" | "center";
  device: "mobile" | "desktop" | "tablet";
}) {
  const platform = usePlatform();
  return device !== "desktop"
    ? (
      <>
        {/* STATIC MOBILE/TABLET HEADER */}

        <div
          style={{ height: navbarHeight }}
          class="mobile-header-container navbar cs-min-desktop:hidden flex justify-between items-center border-b border-base-200 w-full px-3 py-2 gap-3 mobile"
        >
          <div class="flex justify-end gap-3">
            <MenuButton />
            <SearchButton />
          </div>

          {logo && (
            <a
              href={logoLink ?? "/"}
              class="navbar flex-grow inline-flex items-center justify-center max-w-[140px]"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}

          <div class="flex justify-end gap-3">
            <a
              class="flex items-center text-xs font-thin"
              href="/login?returnUrl=%2Faccount"
              aria-label="Account"
            >
              <div class="flex gap-1 scale-125">
                <Icon id="User" width={18} height={20} />
              </div>
            </a>
            {platform === "vtex" && <CartButtonVTEX />}
          </div>
        </div>

        {/* FLOATING MOBILE/TABLET HEADER */}

        <div
          style={{ height: navbarHeight }}
          class="floating-mobile-header-container cs-min-desktop:hidden bg-white-0 navbar flex justify-between items-center border-b border-base-200 w-full px-3 py-2 gap-3 mobile transition-3s opacity-0 -z-10 fixed top-[34px] left-0 shadow-blg-4 rounded-b-2xl"
        >
          <div class="flex justify-end gap-3">
            <MenuButton />
            <SearchButton />
          </div>

          {logo && (
            <a
              href={logoLink ?? "/"}
              class="navbar flex-grow inline-flex items-center justify-center max-w-[140px]"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width || 100}
                height={logo.height || 13}
              />
            </a>
          )}

          <div class="flex justify-end gap-3">
            <a
              class="flex items-center text-xs font-thin"
              href="/login?returnUrl=%2Faccount"
              aria-label="Account"
            >
              <div class="flex gap-1 scale-125">
                <Icon id="User" width={18} height={20} />
              </div>
            </a>
            {platform === "vtex" && <CartButtonVTEX />}
          </div>
        </div>
      </>
    )
    : (
      <>
        {/* STATIC DESKTOP HEADER */}

        <div class="w-full relative">
          <div class="desktop-header-container full-tablet:hidden sm:flex justify-between items-center w-full max-w-screen-xl px-1 mx-auto">
            <div
              class={`flex ${
                logoPosition === "left"
                  ? "justify-start -order-1"
                  : "justify-center"
              }`}
            >
              {logo && (
                <a
                  href={logoLink ?? "/"}
                  aria-label="Store logo"
                  class="block max-w-[140px]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width || 100}
                    height={logo.height || 13}
                  />
                </a>
              )}
            </div>
            <ul
              class={`flex gap-6 col-span-1 ${
                logoPosition === "left" ? "justify-center" : "justify-start"
              }`}
            >
              {items.map((item) => <NavItem item={item} />)}
            </ul>
            <div class="flex-none flex items-center justify-end gap-6 col-span-1 relative">
              {!buttons?.hideSearchButton && (
                <div class="flex items-center text-xs font-thin gap-1">
                  <SearchButton />
                  SEARCH
                </div>
              )}

              <Searchbar searchbar={searchbar} />
              {!buttons?.hideAccountButton && (
                <a
                  class="flex items-center text-xs font-thin"
                  href="/login?returnUrl=%2Faccount"
                  aria-label="Account"
                >
                  <div class="flex gap-1">
                    <Icon
                      id="AccountHeaderV2"
                      width={20}
                      height={22}
                      strokeWidth={1.0}
                    />
                  </div>
                </a>
              )}
              {!buttons?.hideWishlistButton && (
                <a
                  class="flex items-center text-xs font-thin"
                  href="/wishlist"
                  aria-label="Wishlist"
                >
                  <button
                    class="flex btn  btn-sm btn-ghost gap-1"
                    aria-label="Wishlist"
                  >
                    <Icon id="Heart" size={18} strokeWidth={0.4} />
                  </button>
                  WISHLIST
                </a>
              )}
              {!buttons?.hideCartButton && (
                <div class="flex items-center text-xs font-thin">
                  {platform === "vtex" && <CartButtonVTEX />}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FLOATING DESKTOP HEADER */}

        <div class="floating-desktop-header-container bg-white-0 full-tablet:hidden w-full max-w-full mx-auto transition-3s opacity-0 -z-10 fixed top-[34px] left-0 shadow-blg-4 rounded-b-2xl">
          <div class="w-full max-w-screen-xl px-1 mx-auto sm:flex justify-between items-center">
            <div
              class={`flex ${
                logoPosition === "left"
                  ? "justify-start -order-1"
                  : "justify-center"
              }`}
            >
              {logo && (
                <a
                  href={logoLink ?? "/"}
                  aria-label="Store logo"
                  class="block max-w-[140px]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width || 100}
                    height={logo.height || 13}
                  />
                </a>
              )}
            </div>
            <ul
              class={`flex gap-6 col-span-1 ${
                logoPosition === "left" ? "justify-center" : "justify-start"
              }`}
            >
              {items.map((item) => <NavItem item={item} />)}
            </ul>
            <div class="flex-none flex items-center justify-end gap-6 col-span-1 relative">
              {!buttons?.hideSearchButton && (
                <div class="flex items-center text-xs font-thin gap-1">
                  <SearchButton />
                  SEARCH
                </div>
              )}

              <Searchbar searchbar={searchbar} />
              {!buttons?.hideAccountButton && (
                <a
                  class="flex items-center text-xs font-thin"
                  href="/login?returnUrl=%2Faccount"
                  aria-label="Account"
                >
                  <div class="flex gap-1">
                    <Icon
                      id="AccountHeaderV2"
                      width={20}
                      height={22}
                      strokeWidth={1.0}
                    />
                  </div>
                </a>
              )}
              {!buttons?.hideWishlistButton && (
                <a
                  class="flex items-center text-xs font-thin"
                  href="/wishlist"
                  aria-label="Wishlist"
                >
                  <button
                    class="flex btn  btn-sm btn-ghost gap-1"
                    aria-label="Wishlist"
                  >
                    <Icon id="Heart" size={18} strokeWidth={0.4} />
                  </button>
                  WISHLIST
                </a>
              )}
              {!buttons?.hideCartButton && (
                <div class="flex items-center text-xs font-thin">
                  {platform === "vtex" && <CartButtonVTEX />}
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
}

export default Navbar;
