/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displayQuickBuy = signal(false);
const productTransfer: any = signal("");
const displayKitLook = signal(false);
const kitTransfer: any = signal("");
const openSizeModal = signal(false);
const qtdItemsMinicart = signal(0);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displayQuickBuy,
  productTransfer,
  displayKitLook,
  kitTransfer,
  openSizeModal,
  qtdItemsMinicart,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
